// components/SubjectFilter.tsx
"use client"

import { useLanguage } from "@/lib/i18n"
import { SUBJECT_OPTIONS } from "@/lib/activity-subjects"

interface SubjectFilterProps {
  selectedSubjects: string[]
}

/**
 * Renders a row of subject-tag chips.
 * Each chip is a hidden checkbox + label so they participate in the
 * parent <form> submission as subjects query params.
 */
export default function SubjectFilter({ selectedSubjects }: SubjectFilterProps) {
  const { locale, t } = useLanguage()

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-[#7B1B38] dark:text-[#e8a0b0] uppercase">
        {t("activities.subjects")}
      </label>
      <div className="flex flex-wrap gap-2">
        {SUBJECT_OPTIONS.map((opt) => {
          const isSelected = selectedSubjects.includes(opt.value)
          return (
            <label
              key={opt.value}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all select-none border ${
                isSelected
                  ? "bg-[#7B1B38] text-white border-[#7B1B38] dark:bg-[#e8637f] dark:border-[#e8637f] dark:text-[#1a0a10]"
                  : "bg-[#FFF9F0] text-[#7B1B38] border-[#F1E2D9] hover:bg-[#FFE5B4]/50 dark:bg-[#2b1118] dark:text-[#e8a0b0] dark:border-[#4a2030] dark:hover:bg-[#4a2030]/60"
              }`}
            >
              <input
                type="checkbox"
                name="subjects"
                value={opt.value}
                defaultChecked={isSelected}
                className="sr-only"
              />
              {locale === "en" ? opt.en : opt.tr}
            </label>
          )
        })}
      </div>
    </div>
  )
}
