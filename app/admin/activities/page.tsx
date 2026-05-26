// app/admin/activities/page.tsx

"use client"

import Link from "next/link"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { Activity } from "@prisma/client"
import { formatAmount } from "@/lib/format-amount"

export default function AdminActivitiesPage() {
  const router = useRouter()
  const [activities, setActivities] = useState<Activity[]>([])
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL")
  const [isLoading, setIsLoading] = useState(true)

  const categoryLabels = {
    COMPETITION: "Yarışma",
    VOLUNTEER: "Gönüllülük",
    SUMMER_PROGRAM: "Yaz Programı",
    SCHOOL_PROGRAM: "Okul Programı",
    SCHOLARSHIP: "Burs",
    PLATFORM: "Platform",
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  useEffect(() => {
    let filtered = activities

    if (categoryFilter !== "ALL") {
      filtered = filtered.filter((a) => a.category === categoryFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.slug.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredActivities(filtered)
  }, [searchQuery, categoryFilter, activities])

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/admin/activities")
      const data = await response.json()
      setActivities(data)
      setFilteredActivities(data)
    } catch (error) {
      toast.error("Etkinlikler yüklenemedi")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm("Bu etkinliği silmek istediğinize emin misiniz?")) return

    try {
      const response = await fetch(`/api/admin/activities/${slug}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error()

      toast.success("Etkinlik silindi")
      fetchActivities()
    } catch (error) {
      toast.error("Etkinlik silinemedi")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-[#2B0510]/70">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#2B0510]">
          Etkinlikleri Yönet
        </h1>
        <Link
          href="/admin/activities/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#7B1B38] text-white rounded-lg hover:bg-[#5A1127] transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Yeni Etkinlik Ekle
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2B0510]/40" />
            <input
              type="text"
              placeholder="Etkinlik ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510]"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] cursor-pointer"
          >
            <option value="ALL">Tüm Kategoriler</option>
            <option value="COMPETITION">Yarışmalar</option>
            <option value="VOLUNTEER">Gönüllülük</option>
            <option value="SUMMER_PROGRAM">Yaz Programları</option>
            <option value="SCHOOL_PROGRAM">Okul Programları</option>
            <option value="SCHOLARSHIP">Burslar</option>
            <option value="PLATFORM">Platformlar</option>
          </select>
        </div>
      </div>

      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-[#2B0510]/70">
            {searchQuery || categoryFilter !== "ALL"
              ? "Sonuç bulunamadı"
              : "Henüz etkinlik yok. İlk etkinliğinizi oluşturun!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => {
            const categoryColors: Record<string, string> = {
              COMPETITION: "bg-[#FFF9E6] text-[#D4AF37] border border-[#D4AF37]/30",
              VOLUNTEER: "bg-[#EAF5F0] text-[#4E8D70] border border-[#4E8D70]/30",
              SUMMER_PROGRAM: "bg-[#FDF2F0] text-[#E07A5F] border border-[#E07A5F]/30",
              SCHOOL_PROGRAM: "bg-[#F0F3FD] text-[#5F7CE0] border border-[#5F7CE0]/30",
              SCHOLARSHIP: "bg-[#FDF0F3] text-[#D16C82] border border-[#D16C82]/30",
              PLATFORM: "bg-[#EBF7F8] text-[#3C9199] border border-[#3C9199]/30",
            }

            return (
              <div
                key={activity.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {activity.imageUrl && (
                    <img
                      src={activity.imageUrl}
                      alt={activity.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  {!activity.imageUrl && (
                    <div className="w-full h-48 bg-[#FFE5B4]/30 flex items-center justify-center border-b border-[#FFE5B4]/20">
                      <span className="text-[#2B0510]/40 text-sm font-semibold">
                        Görsel yok
                      </span>
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#2B0510] mb-1 line-clamp-1">
                        {activity.name}
                      </h3>
                      <p className="text-xs text-[#2B0510]/60">/{activity.slug}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${categoryColors[activity.category] || "bg-[#FFE5B4] text-[#2B0510]"}`}>
                        {categoryLabels[activity.category]}
                      </span>
                      {activity.isPrestigious && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#7B1B38] text-white">
                          Prestijli
                        </span>
                      )}
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#F9EFE6] text-[#2B0510]">
                        {activity.scholarshipAmount != null
                          ? formatAmount(
                              activity.scholarshipAmount,
                              activity.amountCurrency
                            )
                          : activity.financialSupport}
                        {activity.entryPrice != null &&
                          ` · Ücret: ${
                            Number(activity.entryPrice) === 0
                              ? "Ücretsiz"
                              : formatAmount(
                                  activity.entryPrice,
                                  activity.amountCurrency
                                )
                          }`}
                      </span>
                    </div>

                    <p className="text-sm text-[#2B0510]/70 line-clamp-2">
                      {activity.description}
                    </p>

                    <div className="flex gap-2 pt-2">
                      <Link
                        href={`/admin/activities/${activity.slug}/edit`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#7B1B38] text-white rounded-lg hover:bg-[#5A1127] transition-colors cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                        Düzenle
                      </Link>
                      <button
                        onClick={() => handleDelete(activity.slug)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}