// app/auth/sign-in/page.tsx

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn, useSession } from "@/lib/auth-client"
import { toast } from "sonner"
import { T, useLanguage } from "@/lib/i18n"
import GoogleIcon from "@/components/GoogleIcon"
import { Eye, EyeOff } from "lucide-react"

export default function SignInPage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [signInError, setSignInError] = useState<string | null>(null)
  const { t } = useLanguage()

  const handleGoogleSignIn = async () => {
    setSignInError(null)
    setIsGoogleLoading(true)

    try {
      const res = await signIn.social({
        provider: "google",
        callbackURL: "/profile",
        errorCallbackURL: "/auth/sign-in",
      })

      if (res?.error) {
        toast.error(res.error.message || t("auth.googleSignInError"))
        setIsGoogleLoading(false)
      }
    } catch {
      toast.error(t("auth.googleSignInError"))
      setIsGoogleLoading(false)
    }
  }

  // Redirect to profile if already logged in and reset BFCache
  useEffect(() => {
    setIsGoogleLoading(false)
    setIsLoading(false)

    const handlePageShow = () => {
      setIsGoogleLoading(false)
      setIsLoading(false)
    }

    window.addEventListener("pageshow", handlePageShow)

    const params = new URLSearchParams(window.location.search)
    const err = params.get("error")
    if (err === "account_not_linked") {
      setSignInError("auth.accountNotLinked")
    }

    if (!isPending && session) {
      router.push("/profile")
    }

    return () => {
      window.removeEventListener("pageshow", handlePageShow)
    }
  }, [session, isPending, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignInError(null)
    setIsLoading(true)

    try {
      await signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.success(t("auth.signedIn"))
            router.push("/profile")
          },
          onError: () => {
            setSignInError("auth.invalidCredentials")
            toast.error(t("auth.invalidCredentials"))
          },
        }
      )
    } catch {
      const message = t("auth.signInError")
      setSignInError("auth.signInError")
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while checking session
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-[#2B0510]"><T k="auth.loading" /></div>
      </div>
    )
  }

  // Redirect happens in useEffect, show nothing while redirecting
  if (session) {
    return null
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-[#F1E2D9] p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#2B0510]"><T k="auth.signIn" /></h1>
            <p className="mt-2 text-[#2B0510]/70">
              <T k="auth.signInDescription" />
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-[#FDF9F6] text-[#2B0510] font-medium rounded-lg border-2 border-[#F1E2D9] hover:border-[#7B1B38]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <GoogleIcon className="w-5 h-5 shrink-0" />
            <span>{isGoogleLoading ? <T k="auth.loading" /> : <T k="auth.continueWithGoogle" />}</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#F1E2D9] w-full" />
            <span className="bg-white px-3 text-xs uppercase tracking-wider text-[#2B0510]/50 absolute font-medium">
              <T k="auth.or" />
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-describedby={signInError ? "sign-in-error" : undefined}
            className="space-y-4"
          >
            {signInError && (
              <div
                id="sign-in-error"
                role="alert"
                aria-live="assertive"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <T k={signInError} />
              </div>
            )}

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
                className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] placeholder:text-[#2B0510]/40"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-[#2B0510]">
                  <T k="auth.password" />
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-semibold text-[#7B1B38] hover:text-[#5A1127] hover:underline transition-colors"
                >
                  <T k="auth.forgotPassword" />
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-11 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] placeholder:text-[#2B0510]/40"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2B0510]/40 hover:text-[#7B1B38] transition-colors cursor-pointer"
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-6"
            >
              {isLoading ? <T k="auth.signingIn" /> : <T k="auth.signIn" />}
            </button>
          </form>

          <div className="text-center text-sm">
            <span className="text-[#2B0510]/70"><T k="auth.noAccount" /> </span>
            <Link
              href="/auth/sign-up"
              className="text-[#7B1B38] hover:text-[#5A1127] font-medium"
            >
              <T k="auth.register" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
