// app/api/auth/send-code/route.ts

import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import { Resend } from "resend"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })
const resend = new Resend(process.env.RESEND_API_KEY)

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kullanılıyor" },
        { status: 400 }
      )
    }

    const verificationCode = generateVerificationCode()

    // Store verification code
    await prisma.verification.upsert({
      where: {
        identifier_value: {
          identifier: email,
          value: verificationCode,
        },
      },
      create: {
        identifier: email,
        value: verificationCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
      update: {
        value: verificationCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    })

    console.log("==========================================")
    console.log("📧 Verification code for", email)
    console.log("🔢 Code:", verificationCode)
    console.log("==========================================")

    try {
      await resend.emails.send({
        from: "snowday@balogrenci.org",
        to: email,
        subject: "E-posta Doğrulama Kodu",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7B1B38;">Hoş geldiniz, ${name}!</h2>
            <p style="color: #2B0510;">E-posta adresinizi doğrulamak için aşağıdaki kodu kullanın:</p>
            <div style="background: #FFE5B4; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px solid #F1E2D9;">
              <span style="font-size: 32px; font-weight: bold; color: #7B1B38; letter-spacing: 8px;">${verificationCode}</span>
            </div>
            <p style="color: #2B0510; font-size: 14px;">Bu kod 10 dakika geçerlidir.</p>
          </div>
        `,
      })
      console.log("✅ Email sent successfully")
    } catch (error) {
      console.error("❌ Failed to send email:", error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Send code error:", error)
    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 }
    )
  }
}
