// app/profile/page.tsx

"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import { User, Mail } from "lucide-react"
import { T } from "@/lib/i18n"

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
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-[#2B0510]"><T k="auth.loading" /></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-[#F1E2D9] p-6 sm:p-8 space-y-8">
          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2B0510] mb-2">
              <T k="profile.title" />
            </h1>
            <p className="text-[#2B0510]/70">
              <T k="profile.description" />
            </p>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            {/* Name */}
            <div className="border-b border-[#F1E2D9] pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#F9EFE6] rounded-lg">
                  <User className="w-5 h-5 text-[#7B1B38]" />
                </div>
                <label className="text-sm font-medium text-[#2B0510]/70">
                  <T k="auth.fullName" />
                </label>
              </div>
              <p className="text-lg text-[#2B0510] ml-11">
                {session.user?.name || "—"}
              </p>
            </div>

            {/* Email */}
            <div className="border-b border-[#F1E2D9] pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#F9EFE6] rounded-lg">
                  <Mail className="w-5 h-5 text-[#7B1B38]" />
                </div>
                <label className="text-sm font-medium text-[#2B0510]/70">
                  <T k="auth.email" />
                </label>
              </div>
              <p className="text-lg text-[#2B0510] ml-11">
                {session.user?.email || "—"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 pt-4">
            <button
              onClick={() => router.push("/admin")}
              className="flex-1 px-6 py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-medium rounded-lg transition-colors cursor-pointer"
            >
              <T k="profile.editActivity" />
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 px-6 py-3 bg-white text-[#7B1B38] font-medium rounded-lg border-2 border-[#F1E2D9] hover:border-[#7B1B38] hover:bg-[#FFE5B4]/30 transition-colors cursor-pointer"
            >
              <T k="nav.signOut" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
