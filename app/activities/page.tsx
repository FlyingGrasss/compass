// app/activities/page.tsx

import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Calendar, MapPin, Award } from "lucide-react"

export default async function ActivitiesPage() {
  const activities = await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
  })

  const categoryLabels = {
    COMPETITION: "Yarışma",
    VOLUNTEER: "Gönüllülük",
    SUMMER_PROGRAM: "Yaz Programı",
    SCHOOL_PROGRAM: "Okul Programı",
  }

  return (
    <main className="min-h-screen bg-[#E6F1FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#242F50] mb-4">
            Etkinlikler
          </h1>
          <p className="text-lg text-[#242F50]/70">
            Size uygun fırsatları keşfedin
          </p>
        </div>

        {activities.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-[#242F50]/70">
              Henüz etkinlik bulunmuyor. Yakında eklenecek!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Link
                key={activity.id}
                href={`/activities/${activity.slug}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
              >
                {activity.imageUrl ? (
                  <img
                    src={activity.imageUrl}
                    alt={activity.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-[#AAD0F2] flex items-center justify-center">
                    <Award className="w-12 h-12 text-[#2458B4]" />
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-[#242F50]">
                        {activity.name}
                      </h3>
                      {activity.isPrestigious && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#2458B4] text-white whitespace-nowrap">
                          Prestijli
                        </span>
                      )}
                    </div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-[#AAD0F2] text-[#242F50]">
                      {categoryLabels[activity.category]}
                    </span>
                  </div>

                  <p className="text-sm text-[#242F50]/70 line-clamp-3">
                    {activity.description}
                  </p>

                  <div className="space-y-2 text-sm text-[#242F50]/70">
                    {activity.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{activity.location}</span>
                      </div>
                    )}
                    {activity.deadline && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Son Başvuru:{" "}
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