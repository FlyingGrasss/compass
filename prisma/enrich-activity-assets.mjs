import "dotenv/config"
import { readFileSync } from "node:fs"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) })

const fallbackImages = {
  COMPETITION: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
  VOLUNTEER: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop&q=80",
  SUMMER_PROGRAM: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80",
  SCHOOL_PROGRAM: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80",
  SCHOLARSHIP: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80",
  PLATFORM: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
}

const requestHeaders = {
  "User-Agent": "YouthCompass asset checker/1.0 (+https://youthcompass.org)",
  Accept: "text/html,image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
}

const getRequestOptions = (options = {}) => ({
  ...options,
  headers: { ...requestHeaders, ...(options.headers || {}) },
  redirect: "follow",
  signal: AbortSignal.timeout(12000),
})

function readSeedImageMap() {
  const imageConstants = new Map()
  const sources = ["prisma/seed.ts", "prisma/data/competitions.ts"]
  const map = new Map()

  for (const sourcePath of sources) {
    const source = readFileSync(sourcePath, "utf8")
    for (const match of source.matchAll(/const\s+(\w+)\s*=\s*["']([^"']+)["']/g)) {
      imageConstants.set(match[1], match[2])
    }
    for (const match of source.matchAll(/slug:\s*["']([^"']+)["'](?:(?!slug:\s*["']).)*?imageUrl:\s*([^,\n]+)/gs)) {
      const value = match[2].trim().replace(/["']/g, "")
      const imageUrl = imageConstants.get(value) || value
      if (/^https?:\/\//i.test(imageUrl)) map.set(match[1], imageUrl)
    }
  }

  return map
}

async function isUsableImage(url) {
  if (!url || typeof url !== "string" || !/^https?:\/\//i.test(url.trim())) return false

  try {
    const response = await fetch(url.trim(), getRequestOptions({ method: "HEAD" }))
    const contentType = response.headers.get("content-type") || ""
    if (response.ok && contentType.toLowerCase().startsWith("image/")) return true
  } catch {
    // A second request below handles hosts that reject HEAD.
  }

  try {
    const response = await fetch(url.trim(), getRequestOptions({
      headers: { Range: "bytes=0-2048" },
    }))
    const contentType = response.headers.get("content-type") || ""
    return response.ok && contentType.toLowerCase().startsWith("image/")
  } catch {
    return false
  }
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
}

function getMetaContent(tag, key) {
  const keyPattern = new RegExp(`(?:property|name)=["']${key}["']`, "i")
  if (!keyPattern.test(tag)) return null

  const content = tag.match(/content=["']([^"']+)["']/i)
  return content ? decodeHtml(content[1]) : null
}

async function findOfficialImage(website) {
  if (!website) return null

  try {
    const response = await fetch(website, getRequestOptions())
    if (!response.ok) return null
    const html = (await response.text()).slice(0, 2_000_000)
    const tags = html.match(/<meta\b[^>]*>/gi) || []
    const keys = ["og:image", "twitter:image"]

    for (const key of keys) {
      for (const tag of tags) {
        const rawImage = getMetaContent(tag, key)
        if (!rawImage) continue
        let imageUrl
        try {
          imageUrl = new URL(rawImage, response.url || website).toString()
        } catch {
          continue
        }
        if (await isUsableImage(imageUrl)) return imageUrl
      }
    }
  } catch {
    return null
  }

  return null
}

async function enrichActivity(activity, sourceImageMap) {
  const seededImage = sourceImageMap.get(activity.slug)
  const currentImageIsFallback = Object.values(fallbackImages).includes(activity.imageUrl)
  const startingImage = seededImage || activity.imageUrl

  if (seededImage && await isUsableImage(seededImage)) {
    if (activity.imageUrl !== seededImage) {
      await prisma.activity.update({ where: { id: activity.id }, data: { imageUrl: seededImage } })
    }
    return { status: "kept" }
  }

  if (!currentImageIsFallback && await isUsableImage(startingImage)) return { status: "kept" }

  const officialImage = await findOfficialImage(activity.website)
  const imageUrl = officialImage || fallbackImages[activity.category] || "/activity-placeholder.svg"

  await prisma.activity.update({
    where: { id: activity.id },
    data: { imageUrl },
  })

  return { status: officialImage ? "official" : "fallback", imageUrl }
}

try {
  const activities = await prisma.activity.findMany({
    select: { id: true, slug: true, category: true, imageUrl: true, website: true },
    orderBy: { name: "asc" },
  })
  const sourceImageMap = readSeedImageMap()
  const summary = { kept: 0, official: 0, fallback: 0, failed: 0 }

  for (let index = 0; index < activities.length; index += 6) {
    const batch = activities.slice(index, index + 6)
    const results = await Promise.allSettled(batch.map((activity) => enrichActivity(activity, sourceImageMap)))
    for (const result of results) {
      if (result.status === "rejected") {
        summary.failed += 1
        console.error("Asset update failed:", result.reason)
      } else {
        summary[result.value.status] += 1
      }
    }
    console.log(`Processed ${Math.min(index + batch.length, activities.length)}/${activities.length}`)
  }

  console.log(JSON.stringify(summary, null, 2))
} finally {
  await prisma.$disconnect()
  await pool.end()
}
