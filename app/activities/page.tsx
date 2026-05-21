// app/activities/page.tsx

import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Calendar, MapPin, Award } from "lucide-react"

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const searchQuery = searchParams.search || ""

  let activities = await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
  })

  if (searchQuery) {
    activities = activities.filter(
      (a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const categoryLabels = {
    COMPETITION: "Yarışma",
    VOLUNTEER: "Gönüllülük",
    SUMMER_PROGRAM: "Yaz Programı",
    SCHOOL_PROGRAM: "Okul Programı",
    SCHOLARSHIP: "Burs",
    PLATFORM: "Platform",
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFFDF9] to-[#FFF9F0] py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-[#7B1B38] mb-4">
            Tüm Fırsatlar & Etkinlikler
          </h1>
          {searchQuery && (
            <p className="text-lg font-semibold text-[#2B0510]/80">
              "{searchQuery}" için sonuçlar
            </p>
          )}
        </div>

        {activities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#F1E2D9] shadow-sm p-12 text-center">
            <p className="text-[#2B0510]/70 font-medium">
              {searchQuery
                ? `"${searchQuery}" için sonuç bulunamadı`
                : "Henüz etkinlik bulunmuyor. Yakında eklenecek!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Link
                key={activity.id}
                href={`/activities/${activity.slug}`}
                className="bg-white rounded-2xl border border-[#F1E2D9] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col hover:-translate-y-1.5"
              >
                {activity.imageUrl ? (
                  <img
                    src={activity.imageUrl}
                    alt={activity.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 sm:h-48 bg-[#FFE5B4]/30 flex items-center justify-center">
                    <Award className="w-12 h-12 text-[#7B1B38]" />
                  </div>
                )}

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg font-bold text-[#2B0510] line-clamp-2">
                        {activity.name}
                      </h3>
                      {activity.isPrestigious && (
                        <span className="px-2.5 py-1 text-[10px] font-black rounded-full bg-[#7B1B38] text-[#FFFDF9] whitespace-nowrap shrink-0 uppercase tracking-wider">
                          Prestijli
                        </span>
                      )}
                    </div>
                    <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#FFE5B4]/50 text-[#7B1B38] mb-3">
                      {categoryLabels[activity.category]}
                    </span>

                    <p className="text-sm text-[#2B0510]/85 line-clamp-3 leading-relaxed font-medium">
                      {activity.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-[#2B0510]/75 pt-4 border-t border-[#F1E2D9]">
                    {activity.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 shrink-0 text-[#7B1B38]" />
                        <span className="truncate">{activity.location}</span>
                      </div>
                    )}
                    {activity.deadline && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 shrink-0 text-[#7B1B38]" />
                        <span className="font-semibold">
                          {new Date(activity.deadline).toLocaleDateString(
                            "tr-TR"
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex justify-between items-center border-t border-[#F1E2D9]/40 mt-auto">
                    <span className="text-[#7B1B38] font-bold text-sm">
                      Detayları Gör →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}