// app/auth/forgot-password/page.tsx

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ArrowLeft, KeyRound, Mail, CheckCircle2 } from "lucide-react"
import { T, useLanguage } from "@/lib/i18n"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { t } = useLanguage()

  const [step, setStep] = useState<"request" | "reset">("request")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Kod gönderilemedi")
      }

      toast.success("Sıfırlama kodu e-posta adresinize gönderildi!")
      setStep("reset")
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Kod gönderilemedi"
      setErrorMessage(msg)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (newPassword.length < 8) {
      const msg = "Şifre en az 8 karakter olmalıdır"
      setErrorMessage(msg)
      toast.error(msg)
      return
    }

    if (newPassword !== confirmNewPassword) {
      const msg = "Şifreler eşleşmiyor"
      setErrorMessage(msg)
      toast.error(msg)
      return
    }

    if (code.trim().length !== 6) {
      const msg = "Lütfen 6 haneli doğrulama kodunu girin"
      setErrorMessage(msg)
      toast.error(msg)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: code.trim(),
          newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Şifre sıfırlanamadı")
      }

      toast.success(t("auth.resetSuccess"))
      router.push("/auth/sign-in")
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Şifre sıfırlanamadı"
      setErrorMessage(msg)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-[#F1E2D9] p-8 space-y-6">
          <Link
            href="/auth/sign-in"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B1B38] hover:text-[#5A1127] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <T k="auth.backToSignIn" />
          </Link>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FFE5B4]/40 flex items-center justify-center text-[#7B1B38]">
              {step === "request" ? (
                <Mail className="w-6 h-6" />
              ) : (
                <KeyRound className="w-6 h-6" />
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2B0510]">
              <T k={step === "request" ? "auth.forgotPasswordTitle" : "auth.resetPasswordTitle"} />
            </h1>
            <p className="mt-2 text-sm text-[#2B0510]/70">
              <T k={step === "request" ? "auth.forgotPasswordDescription" : "auth.resetPasswordDescription"} />
            </p>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </div>
          )}

          {step === "request" ? (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2B0510] mb-1.5">
                  <T k="auth.email" />
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] placeholder:text-[#2B0510]/40"
                  placeholder="ornek@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
              >
                {isLoading ? <T k="auth.sendingCode" /> : <T k="auth.sendResetCode" />}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-[#2B0510] mb-1.5">
                  <T k="auth.resetCode" />
                </label>
                <input
                  id="code"
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  required
                  autoFocus
                  className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] text-center text-2xl tracking-[0.4em] font-mono placeholder:tracking-normal placeholder:font-sans placeholder:text-sm placeholder:text-[#2B0510]/40"
                  placeholder="123456"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-[#2B0510] mb-1.5">
                  <T k="auth.newPassword" />
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] placeholder:text-[#2B0510]/40"
                  placeholder={t("auth.newPasswordPlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-[#2B0510] mb-1.5">
                  <T k="auth.confirmNewPassword" />
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] placeholder:text-[#2B0510]/40"
                  placeholder={t("auth.confirmNewPasswordPlaceholder")}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
              >
                {isLoading ? <T k="auth.resetting" /> : <T k="auth.updatePassword" />}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep("request")}
                  className="text-xs text-[#7B1B38] hover:underline font-semibold cursor-pointer"
                >
                  Tekrar kod gönder
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
