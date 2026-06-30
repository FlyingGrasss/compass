// app/api/admin/activities/route.ts

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { parseAmount } from "@/lib/format-amount"

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const data = await req.json()

    const activity = await prisma.activity.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        category: data.category,
        gradeLevels: data.gradeLevels,
        financialSupport: data.financialSupport,
        entryPrice: parseAmount(data.entryPrice),
        scholarshipAmount:
          data.scholarshipAmount === "" || data.scholarshipAmount == null
            ? null
            : String(data.scholarshipAmount),
        amountCurrency: data.amountCurrency || "TRY",
        isPrestigious: data.isPrestigious,
        season: data.season,
        duration: data.duration,
        deadline: data.deadline ? new Date(data.deadline) : null,
        location: data.location || null,
        requirements: data.requirements || null,
        website: data.website || null,
        imageUrl: data.imageUrl || null,
      },
    })

    return NextResponse.json(activity)
  } catch (error) {
    console.error("Activity creation error:", error)
    return NextResponse.json(
      { error: "Etkinlik oluşturulamadı" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(activities)
  } catch (error) {
    console.error("Failed to fetch activities:", error)
    return NextResponse.json(
      { error: "Etkinlikler alınamadı" },
      { status: 500 }
    )
  }
}
