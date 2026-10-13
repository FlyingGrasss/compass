// app/api/auth/reset-password/route.ts

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "better-auth/crypto"

export async function POST(request: NextRequest) {
  try {
    const { email, code, newPassword } = await request.json()

    if (!email || !code || !newPassword) {
      return NextResponse.json(
        { error: "Tüm alanları doldurunuz" },
        { status: 400 }
      )
    }

    if (typeof newPassword !== "string" || newPassword.length < 8) {
      return NextResponse.json(
        { error: "Şifre en az 8 karakter olmalıdır" },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Verify code
    const verification = await prisma.verification.findFirst({
      where: {
        identifier: `reset:${normalizedEmail}`,
        value: code.trim(),
        expiresAt: { gt: new Date() },
      },
    })

    if (!verification) {
      return NextResponse.json(
        { error: "Geçersiz veya süresi dolmuş kod" },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { accounts: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      )
    }

    // Hash the new password with Better Auth's standard algorithm (scrypt)
    const hashedPassword = await hashPassword(newPassword)

    // Check if credential account exists for this user
    const credentialAccount = user.accounts.find(
      (acc) => acc.providerId === "credential"
    )

    if (credentialAccount) {
      await prisma.account.update({
        where: { id: credentialAccount.id },
        data: { password: hashedPassword },
      })
    } else {
      // User registered with Google or didn't have credential account yet; create one so they can log in with password
      await prisma.account.create({
        data: {
          userId: user.id,
          providerId: "credential",
          accountId: user.id,
          password: hashedPassword,
        },
      })
    }

    // Invalidate the used verification code
    await prisma.verification.delete({
      where: { id: verification.id },
    })

    // Invalidate existing sessions so the user logs in fresh with new password
    await prisma.session.deleteMany({
      where: { userId: user.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      { error: "Şifre sıfırlanırken bir hata oluştu" },
      { status: 500 }
    )
  }
}
