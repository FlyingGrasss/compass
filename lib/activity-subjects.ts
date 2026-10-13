// lib/activity-subjects.ts

export const SUBJECT_OPTIONS = [
  { value: "biology",        tr: "Biyoloji",                   en: "Biology" },
  { value: "chemistry",      tr: "Kimya",                      en: "Chemistry" },
  { value: "physics",        tr: "Fizik",                      en: "Physics" },
  { value: "math",           tr: "Matematik",                  en: "Mathematics" },
  { value: "cs",             tr: "Bilgisayar Bilimi",          en: "Computer Science" },
  { value: "engineering",    tr: "Mühendislik",                en: "Engineering" },
  { value: "medicine",       tr: "Sağlık / Tıp",               en: "Healthcare / Medicine" },
  { value: "social",        tr: "Sosyal Bilimler",            en: "Social Sciences" },
  { value: "business",      tr: "İşletme & Ekonomi",         en: "Business & Economics" },
  { value: "humanities",    tr: "Beşeri Bilimler & Sanat",   en: "Humanities & Art" },
  { value: "environment",   tr: "Çevre Bilimleri",           en: "Environmental Sciences" },
  { value: "law",           tr: "Hukuk & Kamu Politikası",   en: "Law & Public Policy" },
] as const

export type SubjectValue = (typeof SUBJECT_OPTIONS)[number]["value"]

/**
 * Predefined subject tag categorizations for all seeded activities.
 */
export const KNOWN_ACTIVITY_SUBJECTS: Record<string, string[]> = {
  // Competitions & Platforms
  "teknofest-yarismalar": ["engineering", "cs", "physics", "environment"],
  "coderspace-etkinlikler": ["cs", "engineering"],
  "appcent-platform": ["cs", "business"],
  "techcareer-hackathon": ["cs"],
  "meb-ortaogretim-yarismalar": ["humanities", "social", "math", "physics"],
  "tubitak-bilim-yarismalari": ["biology", "chemistry", "physics", "math", "cs", "engineering"],
  "genclik-hizmetleri-duyurular": ["social", "humanities"],
  "tfsf-fotograf-yarismalari": ["humanities"],
  "ab-baskanligi-platform": ["social", "law"],
  "science-comes-to-town": ["biology", "chemistry", "physics", "environment"],
  "e-genc-platform": ["social", "humanities"],
  "anadolu-hackathon-2026": ["cs", "engineering"],
  "tua-astro-hackathon-2026": ["physics", "cs", "engineering"],
  "first-robotics-competition": ["engineering", "cs", "physics"],
  "international-mathematical-olympiad": ["math"],
  "international-physics-olympiad": ["physics", "math"],
  "trust-sustainable-living-competition": ["environment", "humanities", "social"],
  "genc-cevirmenler-yarismasi": ["humanities"],
  "regeneron-isef": ["biology", "chemistry", "physics", "engineering", "cs", "medicine", "environment"],
  "genclerden-gelecege": ["environment", "engineering", "social"],
  "yapay-zeka-yildizlari-hackathon": ["cs", "engineering"],
  "digieduhack-2025": ["cs", "social"],
  "education-for-innovation-hackathon": ["social", "business", "cs"],
  "datamedx-hackathon": ["medicine", "cs", "biology"],
  "btk-akademi-hackathon-2025": ["cs", "engineering"],
  "doodle-for-google": ["humanities"],
  "lancerhacks-ix": ["cs"],
  "national-history-bowl": ["social", "humanities"],
  "canadian-chemistry-contest": ["chemistry"],
  "odyssey-of-the-mind": ["humanities", "engineering"],

  // Scholarships
  "vectra-ai-scholars-program": ["cs", "engineering"],
  "writers-of-the-future-contest": ["humanities"],
  "clarendon-fund-scholarships": ["humanities", "social", "biology", "physics"],
  "ayn-rand-essay-contests": ["humanities", "social", "law"],
  "optimist-international-essay-contest": ["humanities", "social"],
  "swe-scholarships": ["engineering", "cs"],
  "skechers-athletic-performance-scholarship": ["social"],
  "too-cool-to-pay-for-school-scholarship": ["social"],
  "abbott-and-fenner-scholarship": ["business", "social"],
  "around-the-corner-from-college-scholarship": ["social"],
  "cooke-college-scholarship-program": ["social", "humanities", "math", "physics"],
  "cameron-impact-scholarship": ["social", "law", "humanities"],
  "letters-to-strangers-scholarships": ["medicine", "social", "humanities"],
  "sallie-mae-no-essay-scholarship": ["social"],
  "be-bold-no-essay-scholarship": ["social", "business"],
  "encourage-for-students-sweepstakes": ["social"],
  "collegevine-monthly-scholarship": ["social"],
  "edvisors-monthly-scholarship": ["social"],
  "scholarshippoints-monthly-scholarship": ["social"],
  "bezos-scholars-program": ["social", "humanities", "law"],
  "mensa-foundation-scholarship": ["social", "humanities", "math"],
  "dell-scholars-program": ["cs", "social"],
  "horatio-alger-scholarship": ["social", "business"],
}

export function getActivitySubjectTags(slug: string): string[] {
  return KNOWN_ACTIVITY_SUBJECTS[slug] || []
}
