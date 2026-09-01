// app/profile/page.tsx

"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { User, Mail, GraduationCap, CalendarDays, Save, Compass } from "lucide-react"
import { T, useLanguage } from "@/lib/i18n"

type ProfileData = {
  age: number | null
  gradeLevel: number | null
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession()
  const { t } = useLanguage()
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData>({ age: null, gradeLevel: null })
  const [ageInput, setAgeInput] = useState("")
  const [gradeInput, setGradeInput] = useState("")
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/sign-in")
    }
  }, [session, isPending, router])

  useEffect(() => {
    if (!session) return

    let cancelled = false
    const loadProfile = async () => {
      try {
        const response = await fetch("/api/profile")
        if (!response.ok) throw new Error("Profil alınamadı")
        const data = await response.json() as ProfileData
        if (cancelled) return
        setProfile(data)
        setAgeInput(data.age == null ? "" : String(data.age))
        setGradeInput(data.gradeLevel == null ? "" : String(data.gradeLevel))
      } catch (error) {
        if (!cancelled) toast.error(error instanceof Error ? error.message : "Profil alınamadı")
      } finally {
        if (!cancelled) setIsLoadingProfile(false)
      }
    }

    void loadProfile()
    return () => {
      cancelled = true
    }
  }, [session])

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSavingProfile(true)

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: ageInput || null,
          gradeLevel: gradeInput || null,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Profil güncellenemedi")

      setProfile(data)
      setAgeInput(data.age == null ? "" : String(data.age))
      setGradeInput(data.gradeLevel == null ? "" : String(data.gradeLevel))
      toast.success(t("profile.updated"))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Profil güncellenemedi")
    } finally {
      setIsSavingProfile(false)
    }
  }

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

          {/* Eligibility profile */}
          <form onSubmit={handleSaveProfile} className="border-t border-[#F1E2D9] pt-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[#2B0510]"><T k="profile.eligibilityTitle" /></h2>
              <p className="text-sm text-[#2B0510]/70 mt-1">
                <T k="profile.eligibilityDescription" />
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="flex items-center gap-2 text-sm font-medium text-[#2B0510] mb-1.5">
                  <CalendarDays className="w-4 h-4 text-[#7B1B38]" /> <T k="profile.age" />
                </span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={ageInput}
                  onChange={(event) => setAgeInput(event.target.value)}
                  disabled={isLoadingProfile || isSavingProfile}
                  placeholder={t("profile.agePlaceholder")}
                  className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] text-[#2B0510] disabled:opacity-60"
                />
              </label>

              <label className="block">
                <span className="flex items-center gap-2 text-sm font-medium text-[#2B0510] mb-1.5">
                  <GraduationCap className="w-4 h-4 text-[#7B1B38]" /> <T k="profile.grade" />
                </span>
                <select
                  value={gradeInput}
                  onChange={(event) => setGradeInput(event.target.value)}
                  disabled={isLoadingProfile || isSavingProfile}
                  className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] text-[#2B0510] disabled:opacity-60"
                >
                  <option value=""><T k="profile.notSpecified" /></option>
                  {Array.from({ length: 16 }, (_, index) => index + 1).map((level) => (
                    <option key={level} value={level}>{level}. sınıf</option>
                  ))}
                </select>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoadingProfile || isSavingProfile}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-medium rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSavingProfile ? <T k="profile.saving" /> : <T k="profile.save" />}
            </button>
          </form>

          {/* Actions */}
          <div className="flex flex-col gap-4 pt-4">
            {(profile.age !== null || profile.gradeLevel !== null) && (
              <button
                onClick={() => {
                  const params = new URLSearchParams({ fit: "me" })
                  router.push(`/activities?${params.toString()}`)
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFE5B4] hover:bg-[#FFD98A] text-[#7B1B38] font-bold rounded-lg transition-colors cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                <T k="profile.findMatches" />
              </button>
            )}
            {session.user?.role === "ADMIN" && (
              <button
                onClick={() => router.push("/admin")}
                className="flex-1 px-6 py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-medium rounded-lg transition-colors cursor-pointer"
              >
                <T k="profile.editActivity" />
              </button>
            )}
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
