// components/ActivitiesClient.tsx
"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { MapPin, Search, Filter, RefreshCw, Sparkles, Clock } from "lucide-react"
import { ActivityCategory, ActivitySeason } from "@prisma/client"
import { LocalizedDescription, LocalizedInput, LocaleText, T } from "@/lib/i18n"
import { LOCATION_OPTIONS } from "@/lib/activity-location"
import ActivityImage from "@/components/ActivityImage"
import SubjectFilter from "@/components/SubjectFilter"
import ActivityFilterForm from "@/components/ActivityFilterForm"
import { SUBJECT_OPTIONS, KNOWN_ACTIVITY_SUBJECTS } from "@/lib/activity-subjects"
import { GRADE_LEVEL_OPTIONS, parseGradeLevelFilter, normalizeGradeLevelValue } from "@/lib/grade-levels"
import { useSession } from "@/lib/auth-client"

export interface SerializedActivity {
  id: string
  name: string
  slug: string
  description: string
  category: ActivityCategory
  gradeLevels: number[]
  minAge: number | null
  maxAge: number | null
  financialSupport: string
  entryPrice: number | null
  scholarshipAmount: string | null
  amountCurrency: string
  isPrestigious: boolean
  isClosed: boolean
  season: ActivitySeason
  duration: string
  deadline: string | null
  location: string | null
  locationTags: string[]
  subjectTags: string[]
  requirements: string | null
  website: string | null
  imageUrl: string | null
  createdAt: string
}

interface ActivitiesClientProps {
  initialActivities: SerializedActivity[]
}

interface UserProfile {
  age: number | null
  gradeLevel: number | null
  preferredLocations: string[]
}

export default function ActivitiesClient({ initialActivities }: ActivitiesClientProps) {
  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (session?.user) {
      fetch("/api/profile")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) {
            setProfile({
              age: data.age ?? null,
              gradeLevel: data.gradeLevel ?? null,
              preferredLocations: data.preferredLocations ?? [],
            })
          }
        })
        .catch(() => {})
    }
  }, [session])

  const searchQuery = searchParams.get("search") || ""
  const categoryFilter = searchParams.get("category") || "ALL"
  const seasonFilter = searchParams.get("season") || "ALL"
  const gradeFilter = searchParams.get("grade") || "ALL"
  const ageFilter = searchParams.get("age") || "ALL"
  const locationFilter = searchParams.get("location") || "ALL"
  const fitFilter = searchParams.get("fit") === "me"
  const prestigiousFilter = searchParams.get("prestigious") || "ALL"
  const statusFilter = searchParams.get("status") || "ALL"
  const sortOption = searchParams.get("sort") || "deadline_asc"
  const subjectsFilter = searchParams.getAll("subjects")

  const effectiveGradeFilter = fitFilter && profile?.gradeLevel != null
    ? normalizeGradeLevelValue(String(profile.gradeLevel))
    : gradeFilter
  const effectiveAgeFilter = fitFilter && profile?.age != null
    ? String(profile.age)
    : ageFilter

  const now = useMemo(() => new Date(), [])

  const filteredAndSortedActivities = useMemo(() => {
    const list = initialActivities.filter((act) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const nameMatch = act.name.toLowerCase().includes(q)
        const descMatch = act.description.toLowerCase().includes(q)
        const reqMatch = act.requirements ? act.requirements.toLowerCase().includes(q) : false
        const locMatch = act.location ? act.location.toLowerCase().includes(q) : false
        if (!nameMatch && !descMatch && !reqMatch && !locMatch) return false
      }

      // Category
      if (categoryFilter !== "ALL" && act.category !== categoryFilter) return false

      // Season
      if (seasonFilter !== "ALL" && act.season !== seasonFilter) return false

      // Prestigious
      if (prestigiousFilter === "yes" && !act.isPrestigious) return false
      if (prestigiousFilter === "no" && act.isPrestigious) return false

      // Status
      const isActClosed = act.isClosed || Boolean(act.deadline && new Date(act.deadline).getTime() < now.getTime())
      if (statusFilter === "open" && isActClosed) return false
      if (statusFilter === "closed" && !isActClosed) return false

      // Grade
      if (effectiveGradeFilter !== "ALL") {
        const gradeValues = parseGradeLevelFilter(effectiveGradeFilter)
        if (gradeValues && gradeValues.length > 0) {
          const hasGrade = act.gradeLevels.some((g) => gradeValues.includes(g))
          if (!hasGrade) return false
        }
      }

      // Age
      if (effectiveAgeFilter !== "ALL") {
        const ageNum = parseInt(effectiveAgeFilter, 10)
        if (!isNaN(ageNum)) {
          if (act.minAge !== null && act.minAge > ageNum) return false
          if (act.maxAge !== null && act.maxAge < ageNum) return false
        }
      }

      // Location
      if (locationFilter !== "ALL") {
        if (!act.locationTags.includes(locationFilter)) return false
      } else if (fitFilter && profile?.preferredLocations?.length) {
        const hasPref = act.locationTags.some((tag) => profile.preferredLocations.includes(tag))
        if (!hasPref) return false
      }

      // Subjects
      if (subjectsFilter.length > 0) {
        const matchingSlugs = Object.entries(KNOWN_ACTIVITY_SUBJECTS)
          .filter(([, tags]) => tags.some((t) => subjectsFilter.includes(t)))
          .map(([slug]) => slug)

        const hasSubject = act.subjectTags?.some((t) => subjectsFilter.includes(t)) || matchingSlugs.includes(act.slug)
        if (!hasSubject) return false
      }

      return true
    })

    // Sort
    return [...list].sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }

      const aClosed = a.isClosed || Boolean(a.deadline && new Date(a.deadline).getTime() < now.getTime())
      const bClosed = b.isClosed || Boolean(b.deadline && new Date(b.deadline).getTime() < now.getTime())

      if (aClosed !== bClosed) {
        return aClosed ? 1 : -1
      }

      if (sortOption === "deadline_desc") {
        if (!a.deadline && !b.deadline) return 0
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
      }

      // Default: deadline_asc
      if (!a.deadline && !b.deadline) return 0
      if (!a.deadline) return 1
      if (!b.deadline) return -1
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    })
  }, [
    initialActivities,
    searchQuery,
    categoryFilter,
    seasonFilter,
    prestigiousFilter,
    statusFilter,
    effectiveGradeFilter,
    effectiveAgeFilter,
    locationFilter,
    fitFilter,
    profile,
    subjectsFilter,
    sortOption,
    now,
  ])

  const categoryLabels: Record<ActivityCategory, { tr: string; en: string }> = {
    COMPETITION: { tr: "Yarışma", en: "Competition" },
    VOLUNTEER: { tr: "Gönüllülük", en: "Volunteering" },
    SUMMER_PROGRAM: { tr: "Yaz Programı", en: "Summer Program" },
    SCHOOL_PROGRAM: { tr: "Okul Programı", en: "School Program" },
    SCHOLARSHIP: { tr: "Burs", en: "Scholarship" },
    PLATFORM: { tr: "Platform", en: "Platform" },
  }

  const seasonLabels: Record<ActivitySeason, { tr: string; en: string }> = {
    SUMMER: { tr: "Yaz", en: "Summer" },
    WINTER: { tr: "Kış", en: "Winter" },
    FALL: { tr: "Sonbahar", en: "Fall" },
    SPRING: { tr: "İlkbahar", en: "Spring" },
    YEAR_ROUND: { tr: "Yıl Boyunca", en: "Year-round" },
  }

  const getDeadlineInfo = (deadlineStr: string | null, isExplicitlyClosed: boolean) => {
    if (isExplicitlyClosed) {
      return { tr: "Başvurular Kapandı", en: "Applications Closed", color: "bg-red-100 text-red-800", isExpired: true }
    }
    if (!deadlineStr) {
      return { tr: "Sürekli / Açık", en: "Rolling / Open", color: "bg-emerald-100 text-emerald-800 font-bold", isExpired: false }
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

  const hasActiveFilters = Boolean(
    searchQuery ||
    categoryFilter !== "ALL" ||
    seasonFilter !== "ALL" ||
    gradeFilter !== "ALL" ||
    ageFilter !== "ALL" ||
    locationFilter !== "ALL" ||
    fitFilter ||
    prestigiousFilter !== "ALL" ||
    statusFilter !== "ALL" ||
    sortOption !== "deadline_asc" ||
    subjectsFilter.length > 0
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        {/* Pill Badge with Dark Mode Fix */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE5B4]/50 dark:bg-[#FFE5B4] border border-[#FFE5B4] dark:border-[#FFD98A] text-[#7B1B38] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> <T k="activities.badge" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#7B1B38] dark:text-[#f8d7df] tracking-tight">
          <T k="activities.title" />
        </h1>
        <p className="text-base sm:text-lg text-[#2B0510]/75 dark:text-[#f5e8d0]/75 max-w-2xl mx-auto font-medium">
          <T k="activities.description" />
        </p>
        {session && (profile?.age != null || profile?.gradeLevel != null || (profile?.preferredLocations?.length ?? 0) > 0) && (
          <Link
            href="/activities?fit=me"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFE5B4] hover:bg-[#FFD98A] text-[#7B1B38] rounded-full text-sm font-bold transition-colors"
          >
            <T k="activities.forMe" />
          </Link>
        )}
        {fitFilter && session && profile?.age === null && profile?.gradeLevel === null && (profile?.preferredLocations?.length ?? 0) === 0 && (
          <p className="text-sm text-[#7B1B38] font-semibold">
            <T k="activities.completeProfile" />
          </p>
        )}
      </div>

      {/* Filter Toolbar Component */}
      <div className="bg-white dark:bg-[#2b1118] rounded-2xl border border-[#F1E2D9] dark:border-[#4a2030] p-4 sm:p-6 shadow-md space-y-4">
        <ActivityFilterForm fitFilter={fitFilter}>
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A696C]" />
            <LocalizedInput
              type="text"
              name="search"
              defaultValue={searchQuery}
              key={searchQuery}
              trPlaceholder="Etkinlik, yarışma, burs veya anahtar kelime ara..."
              enPlaceholder="Search activities, competitions, scholarships..."
              className="w-full pl-12 pr-4 py-3 bg-[#FFF9F0] dark:bg-[#1a0a10] border border-[#F1E2D9] dark:border-[#4a2030] rounded-xl text-sm font-medium text-[#2B0510] dark:text-[#f5e8d0] placeholder-[#7A696C]/60 dark:placeholder-[#c4a08a]/60 focus:outline-none focus:ring-2 focus:ring-[#7B1B38] transition-all"
            />
          </div>

          {/* Grid Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {/* Sort */}
            <div>
              <label className="block text-xs font-bold text-[#7B1B38] dark:text-[#e8637f] uppercase mb-1">
                <T k="activities.sort" />
              </label>
              <select
                name="sort"
                defaultValue={sortOption}
                key={`sort-${sortOption}`}
                className="w-full px-3 py-2.5 bg-[#FFF9F0] dark:bg-[#1a0a10] border border-[#7B1B38]/30 dark:border-[#e8637f]/40 rounded-xl text-xs sm:text-sm font-bold text-[#7B1B38] dark:text-[#f8d7df] outline-none cursor-pointer"
              >
                <option value="deadline_asc"><T k="activities.sortUpcoming" /></option>
                <option value="newest"><T k="activities.sortNewest" /></option>
                <option value="deadline_desc"><T k="activities.sortLatest" /></option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-[#7B1B38] dark:text-[#e8637f] uppercase mb-1">
                <T k="activities.category" />
              </label>
              <select
                name="category"
                defaultValue={categoryFilter}
                key={`category-${categoryFilter}`}
                className="w-full px-3 py-2.5 bg-[#FFF9F0] dark:bg-[#1a0a10] border border-[#F1E2D9] dark:border-[#4a2030] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] dark:text-[#f5e8d0] outline-none cursor-pointer"
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
              <label className="block text-xs font-bold text-[#7B1B38] dark:text-[#e8637f] uppercase mb-1">
                <T k="activities.season" />
              </label>
              <select
                name="season"
                defaultValue={seasonFilter}
                key={`season-${seasonFilter}`}
                className="w-full px-3 py-2.5 bg-[#FFF9F0] dark:bg-[#1a0a10] border border-[#F1E2D9] dark:border-[#4a2030] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] dark:text-[#f5e8d0] outline-none cursor-pointer"
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
              <label className="block text-xs font-bold text-[#7B1B38] dark:text-[#e8637f] uppercase mb-1">
                <T k="activities.grade" />
              </label>
              <select
                name="grade"
                defaultValue={effectiveGradeFilter}
                key={`grade-${effectiveGradeFilter}`}
                className="w-full px-3 py-2.5 bg-[#FFF9F0] dark:bg-[#1a0a10] border border-[#F1E2D9] dark:border-[#4a2030] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] dark:text-[#f5e8d0] outline-none cursor-pointer"
              >
                <option value="ALL"><T k="activities.allGrades" /></option>
                {GRADE_LEVEL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    <T k={`grades.${opt.key}`} />
                  </option>
                ))}
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-[#7B1B38] dark:text-[#e8637f] uppercase mb-1">
                <T k="activities.age" />
              </label>
              <select
                name="age"
                defaultValue={effectiveAgeFilter}
                key={`age-${effectiveAgeFilter}`}
                className="w-full px-3 py-2.5 bg-[#FFF9F0] dark:bg-[#1a0a10] border border-[#F1E2D9] dark:border-[#4a2030] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] dark:text-[#f5e8d0] outline-none cursor-pointer"
              >
                <option value="ALL"><T k="activities.allAges" /></option>
                {Array.from({ length: 8 }, (_, index) => index + 13).map((age) => (
                  <option key={age} value={age}>{age} <T k="activities.ageWord" /></option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-[#7B1B38] dark:text-[#e8637f] uppercase mb-1">
                <T k="activities.location" />
              </label>
              <select
                name="location"
                defaultValue={locationFilter}
                key={`location-${locationFilter}`}
                className="w-full px-3 py-2.5 bg-[#FFF9F0] dark:bg-[#1a0a10] border border-[#F1E2D9] dark:border-[#4a2030] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] dark:text-[#f5e8d0] outline-none cursor-pointer"
              >
                <option value="ALL"><T k="activities.allLocations" /></option>
                {LOCATION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    <LocaleText tr={option.tr} en={option.en} />
                  </option>
                ))}
              </select>
            </div>

            {/* Prestigious */}
            <div>
              <label className="block text-xs font-bold text-[#7B1B38] dark:text-[#e8637f] uppercase mb-1">
                <T k="activities.prestige" />
              </label>
              <select
                name="prestigious"
                defaultValue={prestigiousFilter}
                key={`prestigious-${prestigiousFilter}`}
                className="w-full px-3 py-2.5 bg-[#FFF9F0] dark:bg-[#1a0a10] border border-[#F1E2D9] dark:border-[#4a2030] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] dark:text-[#f5e8d0] outline-none cursor-pointer"
              >
                <option value="ALL"><T k="activities.all" /></option>
                <option value="yes"><T k="activities.prestigiousOnly" /></option>
                <option value="no"><T k="activities.standard" /></option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-[#7B1B38] dark:text-[#e8637f] uppercase mb-1">
                <T k="activities.status" />
              </label>
              <select
                name="status"
                defaultValue={statusFilter}
                key={`status-${statusFilter}`}
                className="w-full px-3 py-2.5 bg-[#FFF9F0] dark:bg-[#1a0a10] border border-[#F1E2D9] dark:border-[#4a2030] rounded-xl text-xs sm:text-sm font-bold text-[#2B0510] dark:text-[#f5e8d0] outline-none cursor-pointer"
              >
                <option value="ALL"><T k="activities.all" /></option>
                <option value="open"><T k="activities.open" /></option>
                <option value="closed"><T k="activities.closed" /></option>
              </select>
            </div>
          </div>

          {/* Subject / Field Filter */}
          <SubjectFilter selectedSubjects={subjectsFilter} />

          {/* Submit & Reset Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F1E2D9] dark:border-[#4a2030]">
            <div className="text-xs font-bold text-[#2B0510]/70 dark:text-[#f5e8d0]/75 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-[#7B1B38] dark:text-[#e8637f]" />
              <T k="activities.count" values={{ count: filteredAndSortedActivities.length }} />
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Link
                  href="/activities"
                  className="px-4 py-2 bg-gray-100 dark:bg-[#1a0a10] hover:bg-gray-200 dark:hover:bg-[#25101a] text-[#2B0510] dark:text-[#f5e8d0] border border-transparent dark:border-[#4a2030] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
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
        </ActivityFilterForm>
      </div>

      {/* Results List Grid */}
      {filteredAndSortedActivities.length === 0 ? (
        <div className="bg-white dark:bg-[#2b1118] rounded-2xl border border-[#F1E2D9] dark:border-[#4a2030] shadow-sm p-12 text-center space-y-4">
          <p className="text-lg text-[#2B0510]/80 dark:text-[#f5e8d0] font-semibold">
            <T k="activities.noResults" />
          </p>
          <p className="text-sm text-[#2B0510]/60 dark:text-[#f5e8d0]/70 max-w-md mx-auto">
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
          {filteredAndSortedActivities.map((activity) => {
            const deadlineInfo = getDeadlineInfo(activity.deadline, activity.isClosed)
            return (
              <Link
                key={activity.id}
                href={`/activities/${activity.slug}`}
                className={`bg-white dark:bg-[#2b1118] rounded-2xl border shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col hover:-translate-y-1.5 relative ${
                  deadlineInfo.isExpired ? "opacity-75 border-gray-200 dark:border-gray-800" : "border-[#F1E2D9] dark:border-[#4a2030]"
                }`}
              >
                {/* Image & Badges Overlay */}
                <div className="relative">
                  <ActivityImage
                    src={activity.imageUrl}
                    alt={activity.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />

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
                    <h3 className="text-lg font-bold text-[#2B0510] dark:text-[#f5e8d0] line-clamp-2">
                      {activity.name}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#FFE5B4]/50 dark:bg-[#4a2030] text-[#7B1B38] dark:text-[#f8d7df]">
                        {categoryLabels[activity.category] ? <LocaleText {...categoryLabels[activity.category]} /> : activity.category}
                      </span>
                      {activity.season && (
                        <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#F1E2D9]/60 dark:bg-[#3d1a24] text-[#2B0510]/80 dark:text-[#f5e8d0]/80">
                          {seasonLabels[activity.season] ? <LocaleText {...seasonLabels[activity.season]} /> : activity.season}
                        </span>
                      )}
                      {activity.subjectTags?.slice(0, 3).map((tag) => {
                        const subjectOpt = SUBJECT_OPTIONS.find((s) => s.value === tag)
                        if (!subjectOpt) return null
                        return (
                          <span key={tag} className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#FFF9F0] dark:bg-[#341620] border border-[#F1E2D9] dark:border-[#4a2030] text-[#7B1B38] dark:text-[#f8d7df]">
                            <LocaleText tr={subjectOpt.tr} en={subjectOpt.en} />
                          </span>
                        )
                      })}
                    </div>

                    <p className="text-sm text-[#2B0510]/85 dark:text-[#f5e8d0]/80 line-clamp-3 leading-relaxed font-medium pt-1">
                      <LocalizedDescription text={activity.description} />
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-[#2B0510]/75 dark:text-[#f5e8d0]/80 pt-4 border-t border-[#F1E2D9] dark:border-[#4a2030]">
                    {activity.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 shrink-0 text-[#7B1B38] dark:text-[#e8637f]" />
                        <span className="truncate text-[#7A696C] dark:text-[#f5e8d0] font-medium">{activity.location}</span>
                      </div>
                    )}
                    <div className={`flex items-center gap-2 p-2 rounded-lg ${deadlineInfo.isExpired ? "bg-gray-100 dark:bg-[#1a0a10] text-gray-600 dark:text-gray-300 border border-transparent dark:border-[#4a2030]" : "bg-[#FFF9F0] dark:bg-[#1a0a10] text-[#7B1B38] dark:text-[#f8d7df] border border-transparent dark:border-[#4a2030]"}`}>
                      <Clock className="w-4 h-4 shrink-0 text-[#7B1B38] dark:text-[#e8637f]" />
                      <span className="font-bold">
                        <T k="activities.deadline" />: {activity.deadline ? <LocaleText tr={new Date(activity.deadline).toLocaleDateString("tr-TR")} en={new Date(activity.deadline).toLocaleDateString("en-US")} /> : <T k="activities.notSpecified" />}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center border-t border-[#F1E2D9]/40 dark:border-[#4a2030] mt-auto">
                    <span className="text-[#7B1B38] dark:text-[#e8637f] font-bold text-sm">
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
  )
}
