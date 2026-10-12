"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { T, useLanguage } from "@/lib/i18n"

export default function HomeSearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const { t } = useLanguage()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim())
    }
    if (selectedCategory && selectedCategory !== "ALL") {
      params.set("category", selectedCategory)
    }
    const queryString = params.toString()
    router.push(`/activities${queryString ? `?${queryString}` : ""}`)
  }

  return (
    <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2 bg-white dark:bg-[#2b1118] rounded-2xl shadow-xl border border-[#F1E2D9] dark:border-[#4a2030] p-2 hover:shadow-2xl transition-all">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label={t("home.allCategories")}
          className="px-4 py-3 bg-[#FFF9F0] dark:bg-[#1f0b13] border-b sm:border-b-0 sm:border-r border-[#F1E2D9] dark:border-[#4a2030] rounded-xl text-[#7B1B38] dark:text-[#f8d7df] font-bold text-sm outline-none cursor-pointer"
        >
          <option value="ALL">{t("home.allCategories")}</option>
          <option value="COMPETITION">{t("home.competitions")}</option>
          <option value="VOLUNTEER">{t("home.volunteering")}</option>
          <option value="SUMMER_PROGRAM">{t("home.summerPrograms")}</option>
          <option value="SCHOOL_PROGRAM">{t("home.schoolPrograms")}</option>
          <option value="SCHOLARSHIP">{t("nav.scholarships")}</option>
          <option value="PLATFORM">{t("home.platforms")}</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("home.searchPlaceholder")}
          className="flex-1 px-4 py-3 bg-transparent text-[#2B0510] dark:text-[#f5e8d0] placeholder-[#7A696C]/60 dark:placeholder-[#c4a08a]/60 outline-none font-medium"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          <span>{t("home.search")}</span>
        </button>
      </div>
    </form>
  )
}
