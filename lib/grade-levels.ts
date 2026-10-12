// lib/grade-levels.ts

export interface GradeLevelOption {
  value: number
  key: string
  tr: string
  en: string
  shortTr: string
  shortEn: string
}

export const GRADE_LEVEL_OPTIONS: GradeLevelOption[] = [
  { value: 8, key: "8", tr: "8. Sınıf", en: "8th Grade", shortTr: "8.", shortEn: "8th" },
  { value: 0, key: "prep", tr: "Hazırlık", en: "Prep", shortTr: "Hazırlık", shortEn: "Prep" },
  { value: 9, key: "9", tr: "9. Sınıf", en: "9th Grade", shortTr: "9.", shortEn: "9th" },
  { value: 10, key: "10", tr: "10. Sınıf", en: "10th Grade", shortTr: "10.", shortEn: "10th" },
  { value: 11, key: "11", tr: "11. Sınıf", en: "11th Grade", shortTr: "11.", shortEn: "11th" },
  { value: 12, key: "12", tr: "12. Sınıf", en: "12th Grade", shortTr: "12.", shortEn: "12th" },
  { value: 14, key: "lisans", tr: "Lisans", en: "Undergraduate", shortTr: "Lisans", shortEn: "Undergrad" },
  { value: 13, key: "on-lisans", tr: "Ön Lisans", en: "Associate Degree", shortTr: "Ön Lisans", shortEn: "Associate" },
]

export const VALID_GRADE_VALUES = GRADE_LEVEL_OPTIONS.map((opt) => opt.value)

const GRADE_ORDER_MAP: Record<number, number> = {
  8: 1,
  0: 2,
  9: 3,
  10: 4,
  11: 5,
  12: 6,
  14: 7,
  15: 7,
  16: 7,
  13: 8,
}

export function sortGradeLevels(levels: number[]): number[] {
  return [...levels].sort((a, b) => {
    const orderA = GRADE_ORDER_MAP[a] ?? (a + 100)
    const orderB = GRADE_ORDER_MAP[b] ?? (b + 100)
    return orderA - orderB
  })
}

export function parseGradeLevelFilter(filter?: string | null): number[] | null {
  if (!filter || filter === "ALL") return null

  const trimmed = filter.trim().toLowerCase()
  if (trimmed === "hazirlik" || trimmed === "hazırlık" || trimmed === "prep" || trimmed === "0") {
    return [0]
  }
  if (trimmed === "lisans" || trimmed === "undergraduate" || trimmed === "14") {
    return [14, 15, 16]
  }
  if (
    trimmed === "on-lisans" ||
    trimmed === "ön-lisans" ||
    trimmed === "onlisans" ||
    trimmed === "önlisans" ||
    trimmed === "associate" ||
    trimmed === "13"
  ) {
    return [13]
  }

  const num = parseInt(trimmed, 10)
  if (!isNaN(num)) {
    if (num === 0) return [0]
    if (num === 14 || num === 15 || num === 16) return [14, 15, 16]
    if (num === 13) return [13]
    return [num]
  }

  return null
}

export function normalizeGradeLevelValue(filter?: string | null): string {
  if (!filter || filter === "ALL") return "ALL"
  const trimmed = filter.trim().toLowerCase()
  if (trimmed === "hazirlik" || trimmed === "hazırlık" || trimmed === "prep" || trimmed === "0") {
    return "0"
  }
  if (trimmed === "lisans" || trimmed === "undergraduate" || trimmed === "14") {
    return "14"
  }
  if (
    trimmed === "on-lisans" ||
    trimmed === "ön-lisans" ||
    trimmed === "onlisans" ||
    trimmed === "önlisans" ||
    trimmed === "associate" ||
    trimmed === "13"
  ) {
    return "13"
  }
  const num = parseInt(trimmed, 10)
  if (!isNaN(num)) {
    if (num === 15 || num === 16) return "14"
    return String(num)
  }
  return "ALL"
}

export function formatGradeLevel(level: number | null | undefined, locale: "tr" | "en" = "tr"): string | null {
  if (level === null || level === undefined) return null
  if (level === 0) return locale === "en" ? "Prep" : "Hazırlık"
  if (level === 13) return locale === "en" ? "Associate Degree" : "Ön Lisans"
  if (level === 14 || level === 15 || level === 16) return locale === "en" ? "Undergraduate" : "Lisans"
  if (level >= 1 && level <= 12) {
    return locale === "en" ? `${level}th Grade` : `${level}. Sınıf`
  }
  return `${level}.`
}

export function formatGradeLevels(levels: number[], locale: "tr" | "en" = "tr"): string {
  if (!levels || levels.length === 0) {
    return locale === "en" ? "All Levels" : "Tüm Seviyeler"
  }

  // Deduplicate and normalize 15/16 to 14
  const normalizedSet = new Set<number>()
  for (const l of levels) {
    if (l === 15 || l === 16) normalizedSet.add(14)
    else if (l >= 8 && l <= 12 || l === 0 || l === 13 || l === 14) normalizedSet.add(l)
    else normalizedSet.add(l)
  }

  const sorted = sortGradeLevels(Array.from(normalizedSet))
  const parts: string[] = []

  const schoolGrades = sorted.filter((l) => l >= 8 && l <= 12)
  const hasPrep = sorted.includes(0)
  const hasUndergrad = sorted.includes(14)
  const hasAssociate = sorted.includes(13)

  // Prior middle school grades below 8 if any legacy exists
  const earlyGrades = sorted.filter((l) => l >= 1 && l < 8)
  if (earlyGrades.length > 0) {
    parts.push(locale === "en" ? `${earlyGrades.join(", ")}th` : `${earlyGrades.map((g) => `${g}.`).join(", ")}`)
  }

  if (sorted.includes(8)) {
    parts.push(locale === "en" ? "8th Grade" : "8. Sınıf")
  }

  if (hasPrep) {
    parts.push(locale === "en" ? "Prep" : "Hazırlık")
  }

  const highSchoolGrades = schoolGrades.filter((g) => g >= 9)
  if (highSchoolGrades.length > 0) {
    if (locale === "en") {
      parts.push(`Grades ${highSchoolGrades.join(", ")}`)
    } else {
      parts.push(`${highSchoolGrades.map((g) => `${g}.`).join(", ")} Sınıf`)
    }
  }

  if (hasUndergrad) {
    parts.push(locale === "en" ? "Undergraduate" : "Lisans")
  }

  if (hasAssociate) {
    parts.push(locale === "en" ? "Associate Degree" : "Ön Lisans")
  }

  return parts.length > 0 ? parts.join(", ") : levels.map((l) => `${l}.`).join(", ")
}
