// app/api/admin/activities/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const activity = await prisma.activity.findUnique({
      where: { slug },
    })

    if (!activity) {
      return NextResponse.json(
        { error: "Etkinlik bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json(activity)
  } catch (error) {
    console.error("Failed to fetch activity:", error)
    return NextResponse.json(
      { error: "Etkinlik alınamadı" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const data = await req.json()

    const activity = await prisma.activity.update({
      where: { slug },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        category: data.category,
        gradeLevels: data.gradeLevels,
        financialSupport: data.financialSupport,
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
    console.error("Activity update error:", error)
    return NextResponse.json(
      { error: "Etkinlik güncellenemedi" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    await prisma.activity.delete({
      where: { slug },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Activity deletion error:", error)
    return NextResponse.json(
      { error: "Etkinlik silinemedi" },
      { status: 500 }
    )
  }
}