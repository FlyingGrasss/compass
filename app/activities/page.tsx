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
  }

  return (
    <main className="min-h-screen bg-[#E6F1FB] py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#242F50] mb-4">
            Etkinlikler
          </h1>
          {searchQuery && (
            <p className="text-lg text-[#242F50]/70">
              "{searchQuery}" için sonuçlar
            </p>
          )}
        </div>

        {activities.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-[#242F50]/70">
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
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer h-full flex flex-col"
              >
                {activity.imageUrl ? (
                  <img
                    src={activity.imageUrl}
                    alt={activity.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 sm:h-48 bg-[#AAD0F2] flex items-center justify-center">
                    <Award className="w-12 h-12 text-[#2458B4]" />
                  </div>
                )}

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg font-bold text-[#242F50] line-clamp-2">
                        {activity.name}
                      </h3>
                      {activity.isPrestigious && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#2458B4] text-white whitespace-nowrap shrink-0">
                          Prestijli
                        </span>
                      )}
                    </div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-[#AAD0F2] text-[#242F50] mb-3">
                      {categoryLabels[activity.category]}
                    </span>

                    <p className="text-sm text-[#242F50]/70 line-clamp-3">
                      {activity.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-[#242F50]/70 pt-4 border-t border-[#AAD0F2]">
                    {activity.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="truncate">{activity.location}</span>
                      </div>
                    )}
                    {activity.deadline && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>
                          {new Date(activity.deadline).toLocaleDateString(
                            "tr-TR"
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <span className="text-[#2458B4] font-medium text-sm">
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