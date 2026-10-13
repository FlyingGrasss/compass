// components/SubjectFilter.tsx
"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n"
import { SUBJECT_OPTIONS } from "@/lib/activity-subjects"
import { Check, X } from "lucide-react"

interface SubjectFilterProps {
  selectedSubjects: string[]
}

/**
 * Interactive subject-tag filter chips.
 * Toggling chips updates UI state immediately, renders hidden inputs for form serialization,
 * and shows visual indicators (check icon, count badge, clear button).
 */
export default function SubjectFilter({ selectedSubjects }: SubjectFilterProps) {
  const { locale, t } = useLanguage()
  const [selected, setSelected] = useState<string[]>(selectedSubjects)

  // Sync state when URL searchParams update
  useEffect(() => {
    setSelected(selectedSubjects)
  }, [selectedSubjects])

  const toggleSubject = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val]
    )
  }

  const clearAll = () => {
    setSelected([])
  }

  return (
    <div className="space-y-2 pt-1">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#7B1B38] dark:text-[#e8a0b0] uppercase tracking-wide flex items-center gap-2">
          <span>{t("activities.subjects")}</span>
          {selected.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7B1B38] text-white dark:bg-[#e8637f] dark:text-[#1a0a10]">
              {selected.length} {locale === "en" ? "selected" : "seçili"}
            </span>
          )}
        </label>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-[11px] font-semibold text-[#7B1B38]/70 hover:text-[#7B1B38] dark:text-[#e8a0b0]/70 dark:hover:text-[#e8a0b0] underline cursor-pointer flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            {locale === "en" ? "Clear" : "Temizle"}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {SUBJECT_OPTIONS.map((opt) => {
          const isSelected = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleSubject(opt.value)}
              aria-pressed={isSelected}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all select-none border ${
                isSelected
                  ? "bg-[#7B1B38] text-white border-[#7B1B38] dark:bg-[#e8637f] dark:border-[#e8637f] dark:text-[#1a0a10] shadow-sm ring-2 ring-[#7B1B38]/20 dark:ring-[#e8637f]/30"
                  : "bg-[#FFF9F0] text-[#7B1B38] border-[#F1E2D9] hover:bg-[#FFE5B4]/60 hover:border-[#7B1B38]/40 dark:bg-[#2b1118] dark:text-[#e8a0b0] dark:border-[#4a2030] dark:hover:bg-[#4a2030]/60"
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />}
              {locale === "en" ? opt.en : opt.tr}
            </button>
          )
        })}
      </div>

      {/* Hidden inputs participate in the parent <form> submission */}
      {selected.map((val) => (
        <input key={val} type="hidden" name="subjects" value={val} />
      ))}
    </div>
  )
}
