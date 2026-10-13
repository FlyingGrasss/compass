// app/api/auth/forgot-password/route.ts

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import { randomInt } from "node:crypto"

const resend = new Resend(process.env.RESEND_API_KEY)

function generateVerificationCode(): string {
  return randomInt(100000, 1000000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (
      typeof email !== "string" ||
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Geçerli bir e-posta adresi giriniz" },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Find user
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    // To prevent account enumeration, return success even if user not found,
    // but only send email if user exists and has a password account
    if (!existingUser) {
      return NextResponse.json({ success: true })
    }

    // Rate limiting: max 5 requests per 10 minutes
    const recentCodeCount = await prisma.verification.count({
      where: {
        identifier: `reset:${normalizedEmail}`,
        createdAt: { gt: new Date(Date.now() - 10 * 60 * 1000) },
      },
    })

    if (recentCodeCount >= 5) {
      return NextResponse.json(
        { error: "Çok fazla kod istendi. Lütfen 10 dakika sonra tekrar deneyin." },
        { status: 429 }
      )
    }

    const verificationCode = generateVerificationCode()

    // Clean up expired reset codes and store new one
    await prisma.verification.deleteMany({
      where: {
        identifier: `reset:${normalizedEmail}`,
        expiresAt: { lte: new Date() },
      },
    })

    await prisma.verification.create({
      data: {
        identifier: `reset:${normalizedEmail}`,
        value: verificationCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    })

    // Send reset code email via Resend
    try {
      const displayName = existingUser.name || "Kullanıcı"
      const { error: emailError } = await resend.emails.send({
        from: "snowday@balogrenci.org",
        to: normalizedEmail,
        subject: "YouthCompass - Şifre Sıfırlama Kodu",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #2B0510;">
            <h2 style="color: #7B1B38;">Merhaba, ${displayName}!</h2>
            <p>YouthCompass hesabınız için bir şifre sıfırlama talebinde bulunuldu. Şifrenizi yenilemek için aşağıdaki 6 haneli kodu kullanın:</p>
            <div style="background: #FFE5B4; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0; border: 1px solid #F1E2D9;">
              <span style="font-size: 32px; font-weight: bold; color: #7B1B38; letter-spacing: 8px;">${verificationCode}</span>
            </div>
            <p style="font-size: 14px; color: #7A696C;">Bu kod 10 dakika süreyle geçerlidir. Eğer bu talebi siz yapmadıysanız bu e-postayı görmezden gelebilirsiniz.</p>
          </div>
        `,
      })

      if (emailError) throw emailError
    } catch (error) {
      console.error("❌ Failed to send reset email:", error)
      await prisma.verification.deleteMany({
        where: { identifier: `reset:${normalizedEmail}`, value: verificationCode },
      })
      return NextResponse.json(
        { error: "Sıfırlama e-postası gönderilemedi. Lütfen tekrar deneyin." },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "Şifre sıfırlama kodu gönderilemedi" },
      { status: 500 }
    )
  }
}
