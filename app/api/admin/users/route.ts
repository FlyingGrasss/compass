import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { UserRole } from "@prisma/client"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

async function getAdminSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { session: null, response: NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 }) }
  }

  if (session.user.role !== "ADMIN") {
    return { session: null, response: NextResponse.json({ error: "Yönetici yetkisi gerekli" }, { status: 403 }) }
  }

  return { session, response: null }
}

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  school: true,
  gradeLevel: true,
  createdAt: true,
} as const

export async function GET() {
  try {
    const { response } = await getAdminSession()
    if (response) return response

    const users = await prisma.user.findMany({
      select: userSelect,
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Failed to fetch users:", error)
    return NextResponse.json({ error: "Kullanıcılar alınamadı" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { session, response } = await getAdminSession()
    if (response) return response
    if (!session) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const body = await request.json()
    const userId = typeof body?.userId === "string" ? body.userId : ""
    const role = body?.role === UserRole.ADMIN
      ? UserRole.ADMIN
      : body?.role === UserRole.USER
        ? UserRole.USER
        : null

    if (!userId || !role) {
      return NextResponse.json({ error: "Geçerli bir kullanıcı ve rol seçin" }, { status: 400 })
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    })

    if (!targetUser) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 })
    }

    if (userId === session.user.id && role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: "Kendi admin yetkinizi kaldıramazsınız" },
        { status: 400 }
      )
    }

    if (targetUser.role === UserRole.ADMIN && role === UserRole.USER) {
      const adminCount = await prisma.user.count({
        where: { role: UserRole.ADMIN },
      })

      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Sistemde en az bir admin kalmalıdır" },
          { status: 400 }
        )
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: userSelect,
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Failed to update user role:", error)
    return NextResponse.json({ error: "Kullanıcı rolü güncellenemedi" }, { status: 500 })
  }
}
