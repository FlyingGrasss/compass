// app/activities/page.tsx

import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { MapPin, Award, Search, Filter, RefreshCw, Sparkles, Clock, ArrowUpDown } from "lucide-react"
import { ActivityCategory, ActivitySeason, Prisma } from "@prisma/client"
import { LocalizedDescription, LocalizedInput, LocaleText, T } from "@/lib/i18n"

export const metadata = {
  title: "Tüm Fırsatlar & Etkinlikler | YouthCompass",
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
    sort?: string
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
  const sortOption = resolvedSearchParams.sort || "deadline_asc"

  // Build Prisma query
  const whereClause: Prisma.ActivityWhereInput = {}

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

  let activities: Awaited<ReturnType<typeof prisma.activity.findMany>> = []
  try {
    activities = await prisma.activity.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Database fetch error in ActivitiesPage:", error)
  }

  // Smart Sorting: prioritizing active upcoming deadlines
  const now = new Date()

  activities.sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }

    const aClosed = a.isClosed || (a.deadline && new Date(a.deadline) < now)
    const bClosed = b.isClosed || (b.deadline && new Date(b.deadline) < now)

    if (aClosed !== bClosed) {
      return aClosed ? 1 : -1 // Active/open ones first
    }

    if (a.deadline && b.deadline) {
      const timeA = new Date(a.deadline).getTime()
      const timeB = new Date(b.deadline).getTime()
      return sortOption === "deadline_desc" ? timeB - timeA : timeA - timeB
    }

    if (a.deadline) return -1
    if (b.deadline) return 1

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const categoryLabels: Record<string, { tr: string; en: string }> = {
    COMPETITION: { tr: "Yarışma", en: "Competition" },
    VOLUNTEER: { tr: "Gönüllülük", en: "Volunteering" },
    SUMMER_PROGRAM: { tr: "Yaz Programı", en: "Summer Program" },
    SCHOOL_PROGRAM: { tr: "Okul Programı", en: "School Program" },
    SCHOLARSHIP: { tr: "Burs", en: "Scholarship" },
    PLATFORM: { tr: "Platform", en: "Platform" },
  }

  const seasonLabels: Record<string, { tr: string; en: string }> = {
    SUMMER: { tr: "Yaz", en: "Summer" },
    WINTER: { tr: "Kış", en: "Winter" },
    FALL: { tr: "Sonbahar", en: "Fall" },
    SPRING: { tr: "İlkbahar", en: "Spring" },
    YEAR_ROUND: { tr: "Yıl Boyu", en: "Year-round" },
  }

  const hasActiveFilters =
    searchQuery !== "" ||
    categoryFilter !== "ALL" ||
    seasonFilter !== "ALL" ||
    gradeFilter !== "ALL" ||
    prestigiousFilter !== "ALL" ||
    statusFilter !== "ALL" ||
    sortOption !== "deadline_asc"

  const getDeadlineInfo = (deadlineStr?: string | Date | null, isClosed?: boolean) => {
    if (isClosed) {
      return { tr: "Başvurular Kapandı", en: "Applications closed", color: "bg-gray-200 text-gray-700", isExpired: true }
    }
    if (!deadlineStr) {
      return { tr: "Sürekli / Açık", en: "Ongoing / Open", color: "bg-emerald-100 text-emerald-800", isExpired: false }
    }
    const deadline = new Date(deadlineStr)
    const diffTime = deadline.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { tr: "Süresi Doldu", en: "Expired", color: "bg-gray-200 text-gray-700", isExpired: true }
    } else if (diffDays === 0) {
      return { tr: "🔥 Bugüne Özel!", en: "🔥 Today only!", color: "bg-red-600 text-white animate-pulse font-extrabold", isExpired: false }
    } else if (diffDays <= 7) {
      return { tr: `⚡ Son ${diffDays} Gün!`, en: `⚡ ${diffDays} days left!`, color: "bg-rose-500 text-white font-black animate-pulse", isExpired: false }
    } else if (diffDays <= 30) {
      return { tr: `⏳ Son ${diffDays} Gün`, en: `⏳ ${diffDays} days left`, color: "bg-amber-500 text-white font-bold", isExpired: false }
    } else {
      return { tr: `📅 ${deadline.toLocaleDateString("tr-TR")}`, en: `📅 ${deadline.toLocaleDateString("en-US")}`, color: "bg-sky-100 text-sky-900 font-bold", isExpired: false }
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFFDF9] via-[#FFF9F0] to-[#FFFDF9] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE5B4]/50 border border-[#FFE5B4] text-[#7B1B38] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> <T k="activities.badge" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#7B1B38] tracking-tight">
            <T k="activities.title" />
          </h1>
          <p className="text-base sm:text-lg text-[#2B0510]/75 max-w-2xl mx-auto font-medium">
            <T k="activities.description" />
          </p>
        </div>

        {/* Filter Toolbar Component */}
        <div className="bg-white rounded-2xl border border-[#F1E2D9] p-4 sm:p-6 shadow-md space-y-4">
          <form action="/activities" method="GET" className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A696C]" />
              <LocalizedInput
                type="text"
                name="search"
                defaultValue={searchQuery}
                trPlaceholder="Başlık, açıklama, gereksinim veya konum ara..."
                enPlaceholder="Search by title, description, requirement, or location..."
                className="w-full pl-12 pr-4 py-3 bg-[#FFFDF9] border border-[#F1E2D9] rounded-xl text-[#2B0510] placeholder:text-[#7A696C]/60 font-medium outline-none focus:border-[#7B1B38] focus:ring-1 focus:ring-[#7B1B38] transition-all"
              />
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {/* Sort Option */}
              <div>
                <label className="block text-xs font-bold text-[#7B1B38] uppercase mb-1 flex items-center gap-1">
                  <ArrowUpDown className="w-3 h-3" /> <T k="activities.sort" />
                </label>
                <select
                  name="sort"
                  defaultValue={sortOption}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-[#7B1B38]/30 rounded-xl text-xs sm:text-sm font-bold text-[#7B1B38] outline-none cursor-pointer"
                >
                  <option value="deadline_asc"><T k="activities.sortUpcoming" /></option>
                  <option value="newest"><T k="activities.sortNewest" /></option>
                  <option value="deadline_desc"><T k="activities.sortLatest" /></option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-[#7B1B38] uppercase mb-1">
                  <T k="activities.category" />
                </label>
                <select
                  name="category"
                  defaultValue={categoryFilter}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-[#F1E2D9] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] outline-none cursor-pointer"
                >
                  <option value="ALL"><T k="activities.allCategories" /></option>
                  <option value="COMPETITION"><T k="activities.competition" /></option>
                  <option value="VOLUNTEER"><T k="home.volunteering" /></option>
                  <option value="SUMMER_PROGRAM"><T k="activities.summerProgram" /></option>
                  <option value="SCHOOL_PROGRAM"><T k="activities.schoolProgram" /></option>
                  <option value="SCHOLARSHIP"><T k="nav.scholarships" /></option>
                  <option value="PLATFORM"><T k="home.platforms" /></option>
                </select>
              </div>

              {/* Season */}
              <div>
                <label className="block text-xs font-bold text-[#7B1B38] uppercase mb-1">
                  <T k="activities.season" />
                </label>
                <select
                  name="season"
                  defaultValue={seasonFilter}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-[#F1E2D9] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] outline-none cursor-pointer"
                >
                  <option value="ALL"><T k="activities.allSeasons" /></option>
                  <option value="SUMMER"><T k="season.summer" /></option>
                  <option value="WINTER"><T k="season.winter" /></option>
                  <option value="FALL"><T k="season.fall" /></option>
                  <option value="SPRING"><T k="season.spring" /></option>
                  <option value="YEAR_ROUND"><T k="season.yearRound" /></option>
                </select>
              </div>

              {/* Grade Level */}
              <div>
                <label className="block text-xs font-bold text-[#7B1B38] uppercase mb-1">
                  <T k="activities.grade" />
                </label>
                <select
                  name="grade"
                  defaultValue={gradeFilter}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-[#F1E2D9] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] outline-none cursor-pointer"
                >
                  <option value="ALL"><T k="activities.allGrades" /></option>
                  <option value="9">9. <T k="activities.gradeWord" /></option>
                  <option value="10">10. <T k="activities.gradeWord" /></option>
                  <option value="11">11. <T k="activities.gradeWord" /></option>
                  <option value="12">12. <T k="activities.gradeWord" /></option>
                </select>
              </div>

              {/* Prestigious */}
              <div>
                <label className="block text-xs font-bold text-[#7B1B38] uppercase mb-1">
                  <T k="activities.prestige" />
                </label>
                <select
                  name="prestigious"
                  defaultValue={prestigiousFilter}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-[#F1E2D9] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] outline-none cursor-pointer"
                >
                  <option value="ALL"><T k="activities.all" /></option>
                  <option value="yes"><T k="activities.prestigiousOnly" /></option>
                  <option value="no"><T k="activities.standard" /></option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-[#7B1B38] uppercase mb-1">
                  <T k="activities.status" />
                </label>
                <select
                  name="status"
                  defaultValue={statusFilter}
                  className="w-full px-3 py-2.5 bg-[#FFF9F0] border border-[#F1E2D9] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] outline-none cursor-pointer"
                >
                  <option value="ALL"><T k="activities.all" /></option>
                  <option value="open"><T k="activities.open" /></option>
                  <option value="closed"><T k="activities.closed" /></option>
                </select>
              </div>
            </div>

            {/* Submit & Reset Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F1E2D9]">
              <div className="text-xs font-bold text-[#2B0510]/70 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-[#7B1B38]" />
                <T k="activities.count" values={{ count: activities.length }} />
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <Link
                    href="/activities"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#2B0510] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> <T k="activities.clearFilters" />
                  </Link>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#7B1B38] hover:bg-[#5A1127] text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  <T k="activities.applyFilters" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results List Grid */}
        {activities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#F1E2D9] shadow-sm p-12 text-center space-y-4">
            <p className="text-lg text-[#2B0510]/80 font-semibold">
              <T k="activities.noResults" />
            </p>
            <p className="text-sm text-[#2B0510]/60 max-w-md mx-auto">
              <T k="activities.noResultsDescription" />
            </p>
            <Link
              href="/activities"
              className="inline-block px-6 py-2.5 bg-[#7B1B38] text-white text-sm font-bold rounded-xl shadow-xs hover:bg-[#5A1127] transition-all"
            >
              <T k="activities.showAll" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => {
              const deadlineInfo = getDeadlineInfo(activity.deadline, activity.isClosed)
              return (
                <Link
                  key={activity.id}
                  href={`/activities/${activity.slug}`}
                  className={`bg-white rounded-2xl border shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col hover:-translate-y-1.5 relative ${
                    deadlineInfo.isExpired ? "opacity-75 border-gray-200" : "border-[#F1E2D9]"
                  }`}
                >
                  {/* Image & Badges Overlay */}
                  <div className="relative">
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

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center gap-2">
                      <span className={`px-3 py-1.5 text-xs rounded-full shadow-md backdrop-blur-md ${deadlineInfo.color}`}>
                        <LocaleText tr={deadlineInfo.tr} en={deadlineInfo.en} />
                      </span>
                      {activity.isPrestigious && (
                        <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-[#7B1B38] text-[#FFFDF9] whitespace-nowrap shrink-0 uppercase tracking-wider shadow-sm">
                          <T k="activities.prestigious" />
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-bold text-[#2B0510] line-clamp-2">
                        {activity.name}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#FFE5B4]/50 text-[#7B1B38]">
                          {categoryLabels[activity.category] ? <LocaleText {...categoryLabels[activity.category]} /> : activity.category}
                        </span>
                        {activity.season && (
                          <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#F1E2D9]/60 text-[#2B0510]/80">
                            {seasonLabels[activity.season] ? <LocaleText {...seasonLabels[activity.season]} /> : activity.season}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-[#2B0510]/85 line-clamp-3 leading-relaxed font-medium pt-1">
                        <LocalizedDescription text={activity.description} />
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-[#2B0510]/75 pt-4 border-t border-[#F1E2D9]">
                      {activity.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 shrink-0 text-[#7B1B38]" />
                          <span className="truncate">{activity.location}</span>
                        </div>
                      )}
                      <div className={`flex items-center gap-2 p-2 rounded-lg ${deadlineInfo.isExpired ? "bg-gray-100 text-gray-600" : "bg-[#FFF9F0] text-[#7B1B38]"}`}>
                        <Clock className="w-4 h-4 shrink-0" />
                        <span className="font-bold">
                          <T k="activities.deadline" />: {activity.deadline ? <LocaleText tr={new Date(activity.deadline).toLocaleDateString("tr-TR")} en={new Date(activity.deadline).toLocaleDateString("en-US")} /> : <T k="activities.notSpecified" />}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center border-t border-[#F1E2D9]/40 mt-auto">
                      <span className="text-[#7B1B38] font-bold text-sm">
                        <T k="activities.details" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
