import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

const parseOptionalInteger = (value: unknown, min: number, max: number) => {
  if (value === null || value === undefined || value === "") return null

  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) return undefined
  return parsed
}

async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return null

  return prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      school: true,
      age: true,
      gradeLevel: true,
    },
  })
}

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    return NextResponse.json(user)
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Profil alınamadı" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })

    const body = await req.json()
    const age = parseOptionalInteger(body?.age, 1, 100)
    const gradeLevel = parseOptionalInteger(body?.gradeLevel, 1, 16)

    if (age === undefined || gradeLevel === undefined) {
      return NextResponse.json(
        { error: "Yaş 1-100, sınıf seviyesi 1-16 arasında olmalıdır." },
        { status: 400 },
      )
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { age, gradeLevel },
      select: {
        id: true,
        name: true,
        email: true,
        school: true,
        age: true,
        gradeLevel: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Profil güncellenemedi" }, { status: 500 })
  }
}
