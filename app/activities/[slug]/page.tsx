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

  const categoryLabels = {
    COMPETITION: "Yarışma",
    VOLUNTEER: "Gönüllülük",
    SUMMER_PROGRAM: "Yaz Programı",
    SCHOOL_PROGRAM: "Okul Programı",
  }

  const seasonLabels = {
    SUMMER: "Yaz",
    WINTER: "Kış",
    FALL: "Sonbahar",
    SPRING: "İlkbahar",
    YEAR_ROUND: "Yıl Boyunca",
  }

  const financialLabels: Record<string, string> = {
    "A+": "Tam Burslu",
    A: "Çoğunlukla Burslu",
    B: "Kısmen Burslu",
    C: "Sınırlı Burs",
    D: "Burssuz",
  }

  return (
    <main className="min-h-screen bg-[#E6F1FB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/activities"
          className="inline-flex items-center text-[#2458B4] hover:text-[#1d4a95] mb-6 cursor-pointer"
        >
          ← Tüm Etkinlikler
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {activity.imageUrl && (
            <img
              src={activity.imageUrl}
              alt={activity.name}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-8 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-[#AAD0F2] text-[#242F50]">
                  {categoryLabels[activity.category]}
                </span>
                {activity.isPrestigious && (
                  <span className="px-3 py-1 text-sm font-semibold rounded-full bg-[#2458B4] text-white">
                    <Award className="w-4 h-4 inline mr-1" />
                    Prestijli
                  </span>
                )}
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-[#E6F1FB] text-[#242F50]">
                  {activity.financialSupport}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-[#242F50] mb-4">
                {activity.name}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activity.location && (
                <div className="flex items-center gap-3 text-[#242F50]">
                  <div className="p-2 bg-[#AAD0F2] rounded-lg">
                    <MapPin className="w-5 h-5 text-[#2458B4]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#242F50]/70">Konum</p>
                    <p className="font-medium">{activity.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-[#242F50]">
                <div className="p-2 bg-[#AAD0F2] rounded-lg">
                  <Clock className="w-5 h-5 text-[#2458B4]" />
                </div>
                <div>
                  <p className="text-sm text-[#242F50]/70">Süre</p>
                  <p className="font-medium">{activity.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#242F50]">
                <div className="p-2 bg-[#AAD0F2] rounded-lg">
                  <Calendar className="w-5 h-5 text-[#2458B4]" />
                </div>
                <div>
                  <p className="text-sm text-[#242F50]/70">Dönem</p>
                  <p className="font-medium">{seasonLabels[activity.season]}</p>
                </div>
              </div>

              {activity.deadline && (
                <div className="flex items-center gap-3 text-[#242F50]">
                  <div className="p-2 bg-[#AAD0F2] rounded-lg">
                    <Calendar className="w-5 h-5 text-[#2458B4]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#242F50]/70">Son Başvuru</p>
                    <p className="font-medium">
                      {new Date(activity.deadline).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-[#242F50]">
                <div className="p-2 bg-[#AAD0F2] rounded-lg">
                  <DollarSign className="w-5 h-5 text-[#2458B4]" />
                </div>
                <div>
                  <p className="text-sm text-[#242F50]/70">Finansal Destek</p>
                  <p className="font-medium">
                    {financialLabels[activity.financialSupport]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#242F50]">
                <div className="p-2 bg-[#AAD0F2] rounded-lg">
                  <Users className="w-5 h-5 text-[#2458B4]" />
                </div>
                <div>
                  <p className="text-sm text-[#242F50]/70">Sınıf Seviyeleri</p>
                  <p className="font-medium">
                    {activity.gradeLevels.map((l) => `${l}.`).join(", ")} Sınıf
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#242F50]/10 pt-6">
              <h2 className="text-2xl font-bold text-[#242F50] mb-3">
                Açıklama
              </h2>
              <p className="text-[#242F50]/80 whitespace-pre-line leading-relaxed">
                {activity.description}
              </p>
            </div>

            {activity.requirements && (
              <div className="border-t border-[#242F50]/10 pt-6">
                <h2 className="text-2xl font-bold text-[#242F50] mb-3">
                  Gereksinimler
                </h2>
                <p className="text-[#242F50]/80 whitespace-pre-line leading-relaxed">
                  {activity.requirements}
                </p>
              </div>
            )}

            {activity.website && (
              <div className="border-t border-[#242F50]/10 pt-6">
                <a
                  href={activity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#2458B4] hover:bg-[#1d4a95] text-white font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-5 h-5" />
                  Resmi Websiteyi Ziyaret Et
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}