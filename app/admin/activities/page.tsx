// app/admin/activities/page.tsx

"use client"

import Link from "next/link"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { Activity } from "@prisma/client"

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
        <div className="text-[#242F50]/70">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#242F50]">
          Etkinlikleri Yönet
        </h1>
        <Link
          href="/admin/activities/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#2458B4] text-white rounded-lg hover:bg-[#1d4a95] transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Yeni Etkinlik Ekle
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#242F50]/40" />
            <input
              type="text"
              placeholder="Etkinlik ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50]"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50] cursor-pointer"
          >
            <option value="ALL">Tüm Kategoriler</option>
            <option value="COMPETITION">Yarışmalar</option>
            <option value="VOLUNTEER">Gönüllülük</option>
            <option value="SUMMER_PROGRAM">Yaz Programları</option>
            <option value="SCHOOL_PROGRAM">Okul Programları</option>
          </select>
        </div>
      </div>

      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-[#242F50]/70">
            {searchQuery || categoryFilter !== "ALL"
              ? "Sonuç bulunamadı"
              : "Henüz etkinlik yok. İlk etkinliğinizi oluşturun!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
            >
              {activity.imageUrl && (
                <img
                  src={activity.imageUrl}
                  alt={activity.name}
                  className="w-full h-48 object-cover"
                />
              )}
              {!activity.imageUrl && (
                <div className="w-full h-48 bg-[#AAD0F2] flex items-center justify-center">
                  <span className="text-[#242F50]/40 text-sm">
                    Görsel yok
                  </span>
                </div>
              )}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#242F50] mb-1">
                    {activity.name}
                  </h3>
                  <p className="text-sm text-[#242F50]/70">/{activity.slug}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#AAD0F2] text-[#242F50]">
                    {categoryLabels[activity.category]}
                  </span>
                  {activity.isPrestigious && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#2458B4] text-white">
                      Prestijli
                    </span>
                  )}
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#E6F1FB] text-[#242F50]">
                    {activity.financialSupport}
                  </span>
                </div>

                <p className="text-sm text-[#242F50]/70 line-clamp-2">
                  {activity.description}
                </p>

                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/admin/activities/${activity.slug}/edit`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#2458B4] text-white rounded-lg hover:bg-[#1d4a95] transition-colors cursor-pointer"
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
          ))}
        </div>
      )}
    </div>
  )
}