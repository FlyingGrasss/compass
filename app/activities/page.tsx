// app/activities/page.tsx

import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Calendar, MapPin, Award, Search, Filter, RefreshCw, Sparkles } from "lucide-react"
import { ActivityCategory, ActivitySeason } from "@prisma/client"

export const metadata = {
  title: "Tüm Fırsatlar & Etkinlikler | Compass",
  description: "Liseli ve üniversiteli gençler için yarışmalar, yaz programları, staj ve gönüllülük fırsatları.",
}

interface PageProps {
  searchParams: Promise<{
    search?: string
    category?: string
    season?: string
    grade?: string
    prestigious?: string
    status?: string
  }>
}

export default async function ActivitiesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const searchQuery = resolvedSearchParams.search || ""
  const categoryFilter = resolvedSearchParams.category || "ALL"
  const seasonFilter = resolvedSearchParams.season || "ALL"
  const gradeFilter = resolvedSearchParams.grade || "ALL"
  const prestigiousFilter = resolvedSearchParams.prestigious || "ALL"
  const statusFilter = resolvedSearchParams.status || "ALL"

  // Build Prisma query
  const whereClause: any = {}

  if (searchQuery) {
    whereClause.OR = [
      { name: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
      { requirements: { contains: searchQuery, mode: "insensitive" } },
      { location: { contains: searchQuery, mode: "insensitive" } },
    ]
  }

  if (categoryFilter !== "ALL") {
    whereClause.category = categoryFilter as ActivityCategory
  }

  if (seasonFilter !== "ALL") {
    whereClause.season = seasonFilter as ActivitySeason
  }

  if (prestigiousFilter === "yes") {
    whereClause.isPrestigious = true
  } else if (prestigiousFilter === "no") {
    whereClause.isPrestigious = false
  }

  if (statusFilter === "open") {
    whereClause.isClosed = false
  } else if (statusFilter === "closed") {
    whereClause.isClosed = true
  }

  if (gradeFilter !== "ALL") {
    const gradeNum = parseInt(gradeFilter, 10)
    if (!isNaN(gradeNum)) {
      whereClause.gradeLevels = {
        has: gradeNum,
      }
    }
  }

  let activities: any[] = []
  try {
    activities = await prisma.activity.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Database fetch error in ActivitiesPage:", error)
  }

  const categoryLabels: Record<string, string> = {
    COMPETITION: "Yarışma",
    VOLUNTEER: "Gönüllülük",
    SUMMER_PROGRAM: "Yaz Programı",
    SCHOOL_PROGRAM: "Okul Programı",
    SCHOLARSHIP: "Burs",
    PLATFORM: "Platform",
  }

  const seasonLabels: Record<string, string> = {
    SUMMER: "Yaz",
    WINTER: "Kış",
    FALL: "Sonbahar",
    SPRING: "İlkbahar",
    YEAR_ROUND: "Yıl Boyu",
  }

  const hasActiveFilters =
    searchQuery !== "" ||
    categoryFilter !== "ALL" ||
    seasonFilter !== "ALL" ||
    gradeFilter !== "ALL" ||
    prestigiousFilter !== "ALL" ||
    statusFilter !== "ALL"

  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFFDF9] via-[#FFF9F0] to-[#FFFDF9] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE5B4]/50 border border-[#FFE5B4] text-[#7B1B38] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Fırsat Kataloğu
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#7B1B38] tracking-tight">
            Tüm Fırsatlar & Etkinlikler
          </h1>
          <p className="text-base sm:text-lg text-[#2B0510]/75 max-w-2xl mx-auto font-medium">
            İlgi alanlarınıza, sınıf seviyenize ve hedeflerinize uygun en güncel fırsatları filtreleyin.
          </p>
        </div>

        {/* Filter Toolbar Component */}
        <div className="bg-white rounded-2xl border border-[#F1E2D9] p-4 sm:p-6 shadow-md space-y-4">
          <form action="/activities" method="GET" className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A696C]" />
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Başlık, açıklama, gereksinim veya konum ara..."
                className="w-full pl-12 pr-4 py-3 bg-[#FFFDF9] border border-[#F1E2D9] rounded-xl text-[#2B0510] placeholder:text-[#7A696C]/60 font-medium outline-none focus:border-[#7B1B38] focus:ring-1 focus:ring-[#7B1B38] transition-all"
              />
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-[#7B1B38] uppercase mb-1">
                  Kategori
                </label>
                <select
                  name="category"
                  defaultValue={categoryFilter}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-[#F1E2D9] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] outline-none cursor-pointer"
                >
                  <option value="ALL">Tüm Kategoriler</option>
                  <option value="COMPETITION">Yarışma</option>
                  <option value="VOLUNTEER">Gönüllülük</option>
                  <option value="SUMMER_PROGRAM">Yaz Programı</option>
                  <option value="SCHOOL_PROGRAM">Okul Programı</option>
                  <option value="SCHOLARSHIP">Burs</option>
                  <option value="PLATFORM">Platform</option>
                </select>
              </div>

              {/* Season */}
              <div>
                <label className="block text-xs font-bold text-[#7B1B38] uppercase mb-1">
                  Sezon / Dönem
                </label>
                <select
                  name="season"
                  defaultValue={seasonFilter}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-[#F1E2D9] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] outline-none cursor-pointer"
                >
                  <option value="ALL">Tüm Sezonlar</option>
                  <option value="SUMMER">Yaz</option>
                  <option value="WINTER">Kış</option>
                  <option value="FALL">Sonbahar</option>
                  <option value="SPRING">İlkbahar</option>
                  <option value="YEAR_ROUND">Yıl Boyu</option>
                </select>
              </div>

              {/* Grade Level */}
              <div>
                <label className="block text-xs font-bold text-[#7B1B38] uppercase mb-1">
                  Sınıf Seviyesi
                </label>
                <select
                  name="grade"
                  defaultValue={gradeFilter}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-[#F1E2D9] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] outline-none cursor-pointer"
                >
                  <option value="ALL">Tüm Sınıflar</option>
                  <option value="9">9. Sınıf</option>
                  <option value="10">10. Sınıf</option>
                  <option value="11">11. Sınıf</option>
                  <option value="12">12. Sınıf</option>
                </select>
              </div>

              {/* Prestigious */}
              <div>
                <label className="block text-xs font-bold text-[#7B1B38] uppercase mb-1">
                  Prestij Seviyesi
                </label>
                <select
                  name="prestigious"
                  defaultValue={prestigiousFilter}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-[#F1E2D9] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] outline-none cursor-pointer"
                >
                  <option value="ALL">Tümü</option>
                  <option value="yes">Sadece Prestijli</option>
                  <option value="no">Standart Fırsatlar</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-[#7B1B38] uppercase mb-1">
                  Başvuru Durumu
                </label>
                <select
                  name="status"
                  defaultValue={statusFilter}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-[#F1E2D9] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] outline-none cursor-pointer"
                >
                  <option value="ALL">Tümü</option>
                  <option value="open">Başvurusu Açık</option>
                  <option value="closed">Tamamlandı / Kapalı</option>
                </select>
              </div>
            </div>

            {/* Submit & Reset Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F1E2D9]">
              <div className="text-xs font-bold text-[#2B0510]/70 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-[#7B1B38]" />
                <span>Toplam <strong className="text-[#7B1B38]">{activities.length}</strong> fırsat listeleniyor</span>
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <Link
                    href="/activities"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#2B0510] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Filtereleri Temizle
                  </Link>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#7B1B38] hover:bg-[#5A1127] text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Filtreleri Uygula
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results List Grid */}
        {activities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#F1E2D9] shadow-sm p-12 text-center space-y-4">
            <p className="text-lg text-[#2B0510]/80 font-semibold">
              Aradığınız kriterlere uygun sonuç bulunamadı.
            </p>
            <p className="text-sm text-[#2B0510]/60 max-w-md mx-auto">
              Filtrelerinizi esneterek veya farklı arama kelimeleri deneyerek diğer fırsatlara göz atabilirsiniz.
            </p>
            <Link
              href="/activities"
              className="inline-block px-6 py-2.5 bg-[#7B1B38] text-white text-sm font-bold rounded-xl shadow-xs hover:bg-[#5A1127] transition-all"
            >
              Tüm Fırsatları Göster
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Link
                key={activity.id}
                href={`/activities/${activity.slug}`}
                className="bg-white rounded-2xl border border-[#F1E2D9] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col hover:-translate-y-1.5"
              >
                {activity.imageUrl ? (
                  <img
                    src={activity.imageUrl}
                    alt={activity.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 sm:h-48 bg-[#FFE5B4]/30 flex items-center justify-center">
                    <Award className="w-12 h-12 text-[#7B1B38]" />
                  </div>
                )}

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-[#2B0510] line-clamp-2">
                        {activity.name}
                      </h3>
                      {activity.isPrestigious && (
                        <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-[#7B1B38] text-[#FFFDF9] whitespace-nowrap shrink-0 uppercase tracking-wider">
                          Prestijli
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#FFE5B4]/50 text-[#7B1B38]">
                        {categoryLabels[activity.category] || activity.category}
                      </span>
                      {activity.season && (
                        <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#F1E2D9]/60 text-[#2B0510]/80">
                          {seasonLabels[activity.season] || activity.season}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-[#2B0510]/85 line-clamp-3 leading-relaxed font-medium pt-1">
                      {activity.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-[#2B0510]/75 pt-4 border-t border-[#F1E2D9]">
                    {activity.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 shrink-0 text-[#7B1B38]" />
                        <span className="truncate">{activity.location}</span>
                      </div>
                    )}
                    {activity.deadline && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 shrink-0 text-[#7B1B38]" />
                        <span className="font-semibold">
                          Son Başvuru: {new Date(activity.deadline).toLocaleDateString("tr-TR")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex justify-between items-center border-t border-[#F1E2D9]/40 mt-auto">
                    <span className="text-[#7B1B38] font-bold text-sm">
                      Detayları Gör →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}