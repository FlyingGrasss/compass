// app/auth/sign-up/page.tsx

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signUp, useSession } from "@/lib/auth-client"
import { toast } from "sonner"
import { Mail, X } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  // Redirect to profile if already logged in
  useEffect(() => {
    if (!isPending && session) {
      router.push("/profile")
    }
  }, [session, isPending, router])

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor")
      return
    }

    if (password.length < 8) {
      toast.error("Şifre en az 8 karakter olmalı")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      toast.success("Doğrulama kodu e-postanıza gönderildi!")
      setShowVerificationModal(true)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Kod gönderilemedi"
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (verificationCode.length !== 6) {
      toast.error("Geçerli bir 6 haneli kod girin")
      return
    }

    setIsVerifying(true)

    try {
      // First, verify the code
      const verifyResponse = await fetch("/api/auth/verify-and-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
        }),
      })

      if (!verifyResponse.ok) {
        const error = await verifyResponse.json()
        throw new Error(error.error)
      }

      // Then, sign up through Better Auth (creates account with proper password hashing)
      await signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onSuccess: () => {
            toast.success("Hesap oluşturuldu ve giriş yapıldı!")
            router.push("/profile")
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Kayıt başarısız")
          },
        }
      )
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Doğrulama başarısız"
      )
    } finally {
      setIsVerifying(false)
    }
  }

  // Show loading state while checking session
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#242F50]">Yükleniyor...</div>
      </div>
    )
  }

  // Redirect happens in useEffect, show nothing while redirecting
  if (session) {
    return null
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#242F50]">Kayıt Ol</h1>
            <p className="mt-2 text-[#242F50]/70">Yeni hesap oluşturun</p>
          </div>

          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#242F50] mb-1.5"
              >
                Ad Soyad
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50] placeholder:text-[#242F50]/40"
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#242F50] mb-1.5"
              >
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50] placeholder:text-[#242F50]/40"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#242F50] mb-1.5"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50] placeholder:text-[#242F50]/40"
                placeholder="En az 8 karakter"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#242F50] mb-1.5"
              >
                Şifre Tekrar
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50] placeholder:text-[#242F50]/40"
                placeholder="Şifrenizi tekrar girin"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#2458B4] hover:bg-[#1d4a95] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-6"
            >
              {isLoading ? "Kod gönderiliyor..." : "Devam Et"}
            </button>
          </form>

          <div className="text-center text-sm">
            <span className="text-[#242F50]/70">Zaten hesabınız var mı? </span>
            <Link
              href="/auth/sign-in"
              className="text-[#2458B4] hover:text-[#1d4a95] font-medium"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-background flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowVerificationModal(false)}
              disabled={isVerifying}
              className="absolute top-4 right-4 text-[#242F50]/40 hover:text-[#242F50] cursor-pointer disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-[#AAD0F2] rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-[#2458B4]" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#242F50]">
                  Kodu Girin
                </h2>
                <p className="mt-2 text-[#242F50]/70">
                  <strong>{email}</strong> adresine gönderilen 6 haneli kodu
                  girin
                </p>
              </div>

              <form onSubmit={handleVerifyAndRegister} className="space-y-4">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                    setVerificationCode(value)
                  }}
                  maxLength={6}
                  placeholder="000000"
                  className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50] text-center text-2xl font-mono tracking-widest placeholder:text-[#242F50]/40"
                  required
                  autoFocus
                  disabled={isVerifying}
                />

                <button
                  type="submit"
                  disabled={isVerifying || verificationCode.length !== 6}
                  className="w-full py-3 bg-[#2458B4] hover:bg-[#1d4a95] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isVerifying ? "Doğrulanıyor..." : "Hesabı Oluştur"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}