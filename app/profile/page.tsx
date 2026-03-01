// app/profile/page.tsx

"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/sign-in")
    }
  }, [session, isPending, router])

  const handleSignOut = async () => {
    await signOut()
    toast.success("Çıkış yapıldı")
    router.push("/auth/sign-in")
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#242F50]">Yükleniyor...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen p-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h1 className="text-3xl font-bold text-[#242F50]">Profil</h1>

          <div className="space-y-4 pt-4">
            <div className="border-b border-[#AAD0F2] pb-4">
              <label className="block text-sm font-medium text-[#242F50]/70">
                Ad Soyad
              </label>
              <p className="mt-1 text-lg text-[#242F50]">
                {session.user?.name || "—"}
              </p>
            </div>

            <div className="border-b border-[#AAD0F2] pb-4">
              <label className="block text-sm font-medium text-[#242F50]/70">
                E-posta
              </label>
              <p className="mt-1 text-lg text-[#242F50]">
                {session.user?.email || "—"}
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSignOut}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}