"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft, Loader2, ShieldCheck, UserCog, Users } from "lucide-react"
import { toast } from "sonner"
import { useSession } from "@/lib/auth-client"

type UserRole = "USER" | "ADMIN"

interface AdminUser {
  id: string
  name: string | null
  email: string
  role: UserRole
  school: string | null
  gradeLevel: number | null
  createdAt: string
}

export default function AdminUsersPage() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch("/api/admin/users")
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || "Kullanıcılar alınamadı")
        }
        if (!cancelled) setUsers(data)
      })
      .catch((error) => {
        if (!cancelled) {
          toast.error(error instanceof Error ? error.message : "Kullanıcılar alınamadı")
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const handleRoleChange = async (userId: string, role: UserRole) => {
    setIsSaving(userId)

    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Kullanıcı rolü güncellenemedi")
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) => (user.id === userId ? data : user))
      )
      toast.success("Kullanıcı rolü güncellendi")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Kullanıcı rolü güncellenemedi")
    } finally {
      setIsSaving(null)
    }
  }

  const adminCount = users.filter((user) => user.role === "ADMIN").length

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center text-[#2B0510]/70">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Kullanıcılar yükleniyor...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-[#FFE5B4]/30 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin"
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#7B1B38] hover:text-[#5A1127]"
          >
            <ArrowLeft className="h-4 w-4" />
            Yönetim paneline dön
          </Link>
          <h1 className="text-3xl font-bold text-[#2B0510]">Kullanıcı Yönetimi</h1>
          <p className="mt-2 text-[#2B0510]/70">
            Kullanıcıları görüntüleyin ve yönetici rollerini düzenleyin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-[#F1E2D9] bg-white px-4 py-3 text-sm font-bold text-[#2B0510]">
            <Users className="h-4 w-4 text-[#7B1B38]" />
            {users.length} kullanıcı
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[#F1E2D9] bg-white px-4 py-3 text-sm font-bold text-[#2B0510]">
            <ShieldCheck className="h-4 w-4 text-[#4E8D70]" />
            {adminCount} admin
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#F1E2D9] bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#F1E2D9] bg-[#F9EFE6] px-6 py-4">
          <UserCog className="h-5 w-5 text-[#7B1B38]" />
          <h2 className="font-bold text-[#2B0510]">Tüm kullanıcılar</h2>
        </div>

        {users.length === 0 ? (
          <p className="p-8 text-center text-[#2B0510]/70">Henüz kayıtlı kullanıcı yok.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-180">
              <thead className="border-b border-[#F1E2D9] text-left text-xs uppercase tracking-wide text-[#2B0510]/60">
                <tr>
                  <th className="px-6 py-4">Kullanıcı</th>
                  <th className="px-6 py-4">Okul / Sınıf</th>
                  <th className="px-6 py-4">Kayıt tarihi</th>
                  <th className="px-6 py-4">Rol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1E2D9]">
                {users.map((user) => {
                  const isCurrentUser = user.id === session?.user?.id
                  const savingUser = isSaving === user.id

                  return (
                    <tr key={user.id} className="hover:bg-[#FFF9F0]">
                      <td className="px-6 py-4">
                        <p className="font-bold text-[#2B0510]">
                          {user.name || "İsimsiz kullanıcı"}
                          {isCurrentUser && (
                            <span className="ml-2 rounded-full bg-[#FFE5B4] px-2 py-0.5 text-[10px] font-black uppercase text-[#7B1B38]">
                              Siz
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-sm text-[#2B0510]/65">{user.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2B0510]/75">
                        {user.school || "—"}
                        {user.gradeLevel ? ` · ${user.gradeLevel}. sınıf` : ""}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2B0510]/75">
                        {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          disabled={savingUser || isCurrentUser}
                          onChange={(event) =>
                            void handleRoleChange(user.id, event.target.value as UserRole)
                          }
                          aria-label={`${user.email} rolü`}
                          className="rounded-lg border border-[#F1E2D9] bg-[#FFF9F0] px-3 py-2 text-sm font-bold text-[#7B1B38] outline-none focus:border-[#7B1B38] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <option value="USER">Kullanıcı</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                        {savingUser && <Loader2 className="ml-2 inline h-4 w-4 animate-spin text-[#7B1B38]" />}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-sm text-[#2B0510]/60">
        Güvenlik için mevcut hesabınızın rolü bu ekrandan düşürülemez; sistemde her zaman en az bir admin tutulur.
      </p>
    </div>
  )
}
