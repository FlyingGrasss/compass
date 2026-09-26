import type { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "")

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const activities = await prisma.activity.findMany({
    select: { slug: true, updatedAt: true },
  })

  const staticPages = [
    "",
    "about",
    "activities",
    "scholarships",
  ]

  return staticPages.map((path) => ({
    url: path ? `${appUrl}/${path}` : `${appUrl}/`,
    lastModified: new Date(),
  })).concat(
    activities.map((activity) => ({
      url: `${appUrl}/activities/${activity.slug}`,
      lastModified: activity.updatedAt,
    })),
  )
}
