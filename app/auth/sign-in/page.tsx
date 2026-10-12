// app/auth/sign-in/page.tsx

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn, useSession } from "@/lib/auth-client"
import { toast } from "sonner"
import { T, useLanguage } from "@/lib/i18n"

export default function SignInPage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

  // Redirect to profile if already logged in
  useEffect(() => {
    if (!isPending && session) {
      router.push("/profile")
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
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
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
              <label htmlFor="password" className="block text-sm font-medium text-[#2B0510] mb-1.5">
                <T k="auth.password" />
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] placeholder:text-[#2B0510]/40"
                placeholder="••••••••"
              />
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
