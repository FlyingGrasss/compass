// app/auth/sign-in/page.tsx

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn, useSession } from "@/lib/auth-client"
import { toast } from "sonner"

export default function SignInPage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Redirect to profile if already logged in
  useEffect(() => {
    if (!isPending && session) {
      router.push("/profile")
    }
  }, [session, isPending, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.success("Başarıyla giriş yapıldı!")
            router.push("/profile")
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Giriş yapılamadı")
          },
        }
      )
    } finally {
      setIsLoading(false)
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
            <h1 className="text-3xl font-bold text-[#242F50]">Giriş Yap</h1>
            <p className="mt-2 text-[#242F50]/70">
              Hesabınıza giriş yapın
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#242F50] mb-1.5">
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
              <label htmlFor="password" className="block text-sm font-medium text-[#242F50] mb-1.5">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50] placeholder:text-[#242F50]/40"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#2458B4] hover:bg-[#1d4a95] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-6"
            >
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="text-center text-sm">
            <span className="text-[#242F50]/70">Hesabınız yok mu? </span>
            <Link
              href="/auth/sign-up"
              className="text-[#2458B4] hover:text-[#1d4a95] font-medium"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}