// app/profile/page.tsx

"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { redirect, useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import { User, Mail } from "lucide-react"

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
    router.push("/")
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
    <div className="min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-8">
          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#242F50] mb-2">
              Profil
            </h1>
            <p className="text-[#242F50]/70">
              Hesap bilgilerinizi görüntüleyin ve yönetin
            </p>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            {/* Name */}
            <div className="border-b border-[#AAD0F2] pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#E6F1FB] rounded-lg">
                  <User className="w-5 h-5 text-[#2458B4]" />
                </div>
                <label className="text-sm font-medium text-[#242F50]/70">
                  Ad Soyad
                </label>
              </div>
              <p className="text-lg text-[#242F50] ml-11">
                {session.user?.name || "—"}
              </p>
            </div>

            {/* Email */}
            <div className="border-b border-[#AAD0F2] pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#E6F1FB] rounded-lg">
                  <Mail className="w-5 h-5 text-[#2458B4]" />
                </div>
                <label className="text-sm font-medium text-[#242F50]/70">
                  E-posta
                </label>
              </div>
              <p className="text-lg text-[#242F50] ml-11">
                {session.user?.email || "—"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 pt-4">
            <button
              onClick={() => redirect("/admin")}
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
            >
              Etkinlik Düzenle
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}