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
