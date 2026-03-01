// app/api/auth/verify-and-register/route.ts

import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required" },
        { status: 400 }
      )
    }

    // Just verify the code exists and is valid
    const verification = await prisma.verification.findFirst({
      where: {
        identifier: email,
        value: code,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!verification) {
      return NextResponse.json(
        { error: "Geçersiz veya süresi dolmuş kod" },
        { status: 400 }
      )
    }

    // Delete verification code
    await prisma.verification.delete({
      where: { id: verification.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Verify code error:", error)
    return NextResponse.json(
      { error: "Doğrulama başarısız" },
      { status: 500 }
    )
  }
}