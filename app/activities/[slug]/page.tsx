// app/activities/[slug]/page.tsx

import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Award,
  ExternalLink,
  Users,
} from "lucide-react"
import { ActivityCategory } from "@prisma/client"
import Link from "next/link"

export default async function ActivityDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const activity = await prisma.activity.findUnique({
    where: { slug: (await params).slug },
  })

  if (!activity) {
    notFound()
  }

  const categoryLabels: Record<ActivityCategory, string> = {
    COMPETITION: "Yarışma",
    VOLUNTEER: "Gönüllülük",
    SUMMER_PROGRAM: "Yaz Programı",
    SCHOOL_PROGRAM: "Okul Programı",
    SCHOLARSHIP: "Burs",
    PLATFORM: "Platform",
  }

  const seasonLabels = {
    SUMMER: "Yaz",
    WINTER: "Kış",
    FALL: "Sonbahar",
    SPRING: "İlkbahar",
    YEAR_ROUND: "Yıl Boyunca",
  }

  const financialLabels: Record<string, string> = {
    "A+": "Tam Burslu (Eğitim + Yaşam)",
    A: "Büyük Ölçüde Burslu",
    B: "Kısmen Burslu / Ödül",
    C: "Sınırlı Burs / Çekiliş",
    D: "Burssuz",
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFFDF9] to-[#FFF9F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/activities"
          className="inline-flex items-center text-[#7B1B38] font-bold hover:text-[#5A1127] mb-6 cursor-pointer"
        >
          ← Tüm Fırsatlara Dön
        </Link>

        <div className="bg-white rounded-3xl border border-[#F1E2D9] shadow-xl overflow-hidden">
          {activity.imageUrl && (
            <img
              src={activity.imageUrl}
              alt={activity.name}
              className="w-full h-80 sm:h-96 object-cover"
            />
          )}

          <div className="p-8 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#FFE5B4]/50 text-[#7B1B38]">
                  {categoryLabels[activity.category as ActivityCategory]}
                </span>
                {activity.isPrestigious && (
                  <span className="px-3 py-1 text-xs font-black rounded-full bg-[#7B1B38] text-white flex items-center uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 mr-1" />
                    Prestijli
                  </span>
                )}
                {activity.isClosed ? (
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-50 text-red-700">
                    Başvurular Kapalı
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700">
                    Başvurular Açık
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#2B0510] tracking-tight leading-tight">
                {activity.name}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FFFDF9] border border-[#F1E2D9]/70 rounded-2xl p-6">
              {activity.location && (
                <div className="flex items-center gap-3 text-[#2B0510]">
                  <div className="p-2.5 bg-[#FFE5B4]/40 rounded-xl text-[#7B1B38]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#7A696C]">Konum / Lokasyon</p>
                    <p className="font-bold text-sm">{activity.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-[#2B0510]">
                <div className="p-2.5 bg-[#FFE5B4]/40 rounded-xl text-[#7B1B38]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#7A696C]">Süre / Süreç</p>
                  <p className="font-bold text-sm">{activity.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#2B0510]">
                <div className="p-2.5 bg-[#FFE5B4]/40 rounded-xl text-[#7B1B38]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#7A696C]">Dönem</p>
                  <p className="font-bold text-sm">{seasonLabels[activity.season]}</p>
                </div>
              </div>

              {activity.deadline && (
                <div className="flex items-center gap-3 text-[#2B0510]">
                  <div className="p-2.5 bg-[#FFE5B4]/40 rounded-xl text-[#7B1B38]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#7A696C]">Son Başvuru Tarihi</p>
                    <p className="font-bold text-sm">
                      {new Date(activity.deadline).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-[#2B0510]">
                <div className="p-2.5 bg-[#FFE5B4]/40 rounded-xl text-[#7B1B38]">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#7A696C]">Maddi Destek</p>
                  <p className="font-bold text-sm">
                    {financialLabels[activity.financialSupport] || activity.financialSupport}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#2B0510]">
                <div className="p-2.5 bg-[#FFE5B4]/40 rounded-xl text-[#7B1B38]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#7A696C]">Hedef Sınıflar</p>
                  <p className="font-bold text-sm">
                    {activity.gradeLevels.map((l) => `${l}.`).join(", ")} Sınıflar
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#7B1B38] border-b border-[#F1E2D9] pb-2">
                Açıklama / Detaylar
              </h2>
              <p className="text-[#2B0510]/90 whitespace-pre-line leading-relaxed font-medium text-sm text-justify">
                {activity.description}
              </p>
            </div>

            {activity.requirements && (
              <div className="space-y-4 pt-4">
                <h2 className="text-xl font-bold text-[#7B1B38] border-b border-[#F1E2D9] pb-2">
                  Katılım Koşulları & Gereksinimler
                </h2>
                <p className="text-[#2B0510]/90 whitespace-pre-line leading-relaxed font-medium text-sm">
                  {activity.requirements}
                </p>
              </div>
            )}

            {activity.website && (
              <div className="pt-6 border-t border-[#F1E2D9]">
                <a
                  href={activity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 duration-200"
                >
                  <ExternalLink className="w-5 h-5" />
                  Resmi Başvuru Sitesini Ziyaret Et
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}