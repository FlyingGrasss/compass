export const LOCATION_TAGS = [
  "TURKEY",
  "ONLINE",
  "USA",
  "EUROPE",
  "GLOBAL",
  "CANADA",
  "UK",
  "AUSTRALIA",
  "OTHER",
  "UNSPECIFIED",
] as const

export type LocationTag = (typeof LOCATION_TAGS)[number]

export const LOCATION_OPTIONS: Array<{
  value: LocationTag
  tr: string
  en: string
}> = [
  { value: "TURKEY", tr: "Türkiye", en: "Turkey" },
  { value: "ONLINE", tr: "Çevrimiçi", en: "Online" },
  { value: "USA", tr: "ABD", en: "United States" },
  { value: "EUROPE", tr: "Avrupa", en: "Europe" },
  { value: "GLOBAL", tr: "Küresel / Uluslararası", en: "Global / International" },
  { value: "CANADA", tr: "Kanada", en: "Canada" },
  { value: "UK", tr: "Birleşik Krallık", en: "United Kingdom" },
  { value: "AUSTRALIA", tr: "Avustralya", en: "Australia" },
  { value: "OTHER", tr: "Diğer", en: "Other" },
  { value: "UNSPECIFIED", tr: "Belirtilmemiş", en: "Not specified" },
]

const EUROPE_MARKERS = [
  "avrupa",
  "avrupa birliği",
  "italya",
  "fransa",
  "almanya",
  "ispanya",
  "belçika",
  "avusturya",
  "isviçre",
  "irlanda",
  "hollanda",
  "portekiz",
  "norveç",
  "isveç",
  "danimarka",
  "finlandiya",
  "polonya",
  "çekya",
  "çek cumhuriyeti",
  "romanya",
  "yunanistan",
  "ingiltere",
  "birleşik krallık",
  "oxford",
  "roma",
]

function includesAny(value: string, markers: string[]) {
  return markers.some((marker) => value.includes(marker))
}

export function normalizeLocation(location: string | null | undefined) {
  if (!location?.trim()) return "Belirtilmemiş"

  let value = location
    .replace(/Amerika Birleşik Devletleri/giu, "ABD")
    .replace(/U\.S\./giu, "ABD")
    .replace(/\bUSA\b/giu, "ABD")
    .replace(/\bAbd\b/giu, "ABD")
    .replace(/\bGlobal\b/giu, "Küresel")
    .replace(/\bOnline\b/giu, "Çevrimiçi")
    .replace(/\binternational\b/giu, "Uluslararası")
    .replace(/\s+/g, " ")
    .trim()

  value = value
    .replace(/Küresel\s*\(\s*Küresel\s*\)/giu, "Küresel")
    .replace(/Çevrimiçi\s*\(\s*Çevrimiçi\s*\)/giu, "Çevrimiçi")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim()

  return value || "Belirtilmemiş"
}

export function getLocationTags(location: string | null | undefined): LocationTag[] {
  if (!location?.trim()) return ["UNSPECIFIED"]

  const value = normalizeLocation(location).toLocaleLowerCase("tr-TR")
  const tags: LocationTag[] = []

  if (includesAny(value, ["türkiye", "turkey", "istanbul", "ankara", "eskişehir"])) tags.push("TURKEY")
  if (includesAny(value, ["çevrimiçi", "çevrim içi", "online"])) tags.push("ONLINE")
  if (
    includesAny(value, [
      "abd",
      "amerika birleşik devletleri",
      "usa",
      "new york",
      "california",
      "massachusetts",
      "texas",
      "washington, dc",
      "arizona",
      "illinois",
      "pennsylvania",
      "new jersey",
      "connecticut",
      "maryland",
      "colorado",
      "maine",
      "michigan",
      "north carolina",
      "hawaii",
      "indiana",
      "ohio",
      "oklahoma",
      "rhode island",
      "louisiana",
      "utah",
      "batı abd",
      "cornell",
      "maryland",
      "u.s.",
    ])
  ) {
    tags.push("USA")
  }
  if (includesAny(value, ["kanada", "canada", "montreal", "mcgill"])) tags.push("CANADA")
  if (includesAny(value, ["avustralya", "australia"])) tags.push("AUSTRALIA")
  if (includesAny(value, ["birleşik krallık", "ingiltere", "oxford", "londra", "uk"])) {
    tags.push("UK")
  }
  if (includesAny(value, EUROPE_MARKERS)) tags.push("EUROPE")
  if (includesAny(value, ["küresel", "global", "uluslararası", "international"])) {
    tags.push("GLOBAL")
  }

  return tags.length > 0 ? [...new Set(tags)] : ["OTHER"]
}
