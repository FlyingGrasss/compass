// app/api/admin/bulk-import/route.ts

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { ActivityCategory, ActivitySeason } from "@prisma/client"

const generateSlug = (name: string): string => {
  return name
    .replace(/İ/g, "i")
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const mapCategory = (cat: string): ActivityCategory => {
  const norm = String(cat).toUpperCase().trim()
  if (norm === "COMPETITION" || norm === "YARIŞMA") return ActivityCategory.COMPETITION
  if (norm === "SCHOLARSHIP" || norm === "BURS") return ActivityCategory.SCHOLARSHIP
  if (norm === "VOLUNTEER" || norm === "GÖNÜLLÜLÜK") return ActivityCategory.VOLUNTEER
  if (norm === "SUMMER_PROGRAM" || norm === "YAZ PROGRAMI") return ActivityCategory.SUMMER_PROGRAM
  if (norm === "SCHOOL_PROGRAM" || norm === "OKUL PROGRAMI") return ActivityCategory.SCHOOL_PROGRAM
  if (norm === "PLATFORM") return ActivityCategory.PLATFORM
  
  // Custom mapping for EXTRACURRICULAR -> VOLUNTEER
  if (norm === "EXTRACURRICULAR") return ActivityCategory.VOLUNTEER

  return ActivityCategory.COMPETITION
}

const mapSeason = (seasonStr: string): ActivitySeason => {
  const norm = String(seasonStr).toUpperCase().trim()
  if (norm === "SUMMER" || norm === "YAZ") return ActivitySeason.SUMMER
  if (norm === "WINTER" || norm === "KIŞ") return ActivitySeason.WINTER
  if (norm === "FALL" || norm === "SONBAHAR") return ActivitySeason.FALL
  if (norm === "SPRING" || norm === "İLKBAHAR") return ActivitySeason.SPRING
  if (norm === "YEAR_ROUND" || norm === "YIL BOYUNCA") return ActivitySeason.YEAR_ROUND
  return ActivitySeason.YEAR_ROUND
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate Admin User
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Yetkisiz erişim. Lütfen giriş yapın." }, { status: 401 })
    }

    // 2. Parse Body and retrieve activities array
    const body = await req.json()
    const rawActivities = Array.isArray(body) ? body : body?.activities

    if (!rawActivities || !Array.isArray(rawActivities)) {
      return NextResponse.json(
        { error: "Geçersiz veri formatı. Bir dizi (array) bekleniyor." },
        { status: 400 }
      )
    }

    if (rawActivities.length === 0) {
      return NextResponse.json({ success: true, count: 0, message: "İçe aktarılacak etkinlik yok." })
    }

    // 3. Normalize activities and prepare bulk transaction operations
    const operations = rawActivities.map((act: any) => {
      const name = (act.name || act.title || "").trim()
      if (!name) {
        throw new Error("Etkinlik adı ('title' veya 'name') boş olamaz.")
      }

      const slug = (act.slug || generateSlug(name)).trim()
      const description = (act.description || "").trim()
      const category = mapCategory(act.category || "COMPETITION")
      
      // Parse grade levels
      let gradeLevels: number[] = [9, 10, 11, 12]
      if (Array.isArray(act.gradeLevels)) {
        gradeLevels = act.gradeLevels.map(Number).filter((n: number) => !isNaN(n))
      } else if (typeof act.gradeLevels === "number") {
        gradeLevels = [act.gradeLevels]
      } else if (typeof act.gradeLevels === "string") {
        // e.g. "9,10,11" or "9-12"
        if (act.gradeLevels.includes("-")) {
          const [start, end] = act.gradeLevels.split("-").map(Number)
          if (!isNaN(start) && !isNaN(end)) {
            gradeLevels = []
            for (let i = start; i <= end; i++) gradeLevels.push(i)
          }
        } else {
          gradeLevels = act.gradeLevels.split(",").map(Number).filter((n: number) => !isNaN(n))
        }
      }

      // Requirements
      let requirements: string | null = null
      if (Array.isArray(act.requirements)) {
        requirements = act.requirements
          .map((r: string) => {
            const trimmed = String(r).trim()
            return trimmed.startsWith("•") ? trimmed : `• ${trimmed}`
          })
          .join("\n")
      } else if (act.requirements) {
        requirements = String(act.requirements).trim()
      }

      // Numerical prices/amounts
      const entryPrice = act.entryPrice !== undefined && act.entryPrice !== null ? Number(act.entryPrice) : null
      const scholarshipAmount = act.scholarshipAmount !== undefined && act.scholarshipAmount !== null ? Number(act.scholarshipAmount) : null

      const deadline = act.deadline ? new Date(act.deadline) : null

      const dataToSave = {
        name,
        description,
        category,
        gradeLevels,
        financialSupport: String(act.financialSupport || "B").toUpperCase().trim(),
        entryPrice: isNaN(entryPrice as number) ? null : entryPrice,
        scholarshipAmount: isNaN(scholarshipAmount as number) ? null : scholarshipAmount,
        amountCurrency: String(act.amountCurrency || "TRY").toUpperCase().trim(),
        isPrestigious: !!act.isPrestigious,
        isClosed: !!act.isClosed,
        season: mapSeason(act.season || "YEAR_ROUND"),
        duration: String(act.duration || "Belirtilmedi").trim(),
        deadline: deadline && !isNaN(deadline.getTime()) ? deadline : null,
        location: act.location ? String(act.location).trim() : null,
        requirements,
        website: act.website || act.link || null,
        imageUrl: act.imageUrl || null,
      }

      return prisma.activity.upsert({
        where: { slug },
        update: dataToSave,
        create: {
          ...dataToSave,
          slug,
        },
      })
    })

    // 4. Execute transaction
    const results = await prisma.$transaction(operations)

    return NextResponse.json({
      success: true,
      count: results.length,
      message: `Başarıyla ${results.length} etkinlik veritabanı ile senkronize edildi.`,
    })
  } catch (error: any) {
    console.error("Bulk Import Error:", error)
    return NextResponse.json(
      { error: error.message || "İçe aktarma işlemi sırasında bir hata oluştu." },
      { status: 500 }
    )
  }
}
