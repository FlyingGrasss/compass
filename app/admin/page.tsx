// app/admin/page.tsx

import Link from "next/link"
import { Calendar, Award, Users, BookOpen, Plus, Clock } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const competitionsCount = await prisma.activity.count({
    where: { category: "COMPETITION" },
  })

  const volunteerCount = await prisma.activity.count({
    where: { category: "VOLUNTEER" },
  })

  const summerProgramsCount = await prisma.activity.count({
    where: { category: "SUMMER_PROGRAM" },
  })

  const schoolProgramsCount = await prisma.activity.count({
    where: { category: "SCHOOL_PROGRAM" },
  })

  const totalActivities =
    competitionsCount +
    volunteerCount +
    summerProgramsCount +
    schoolProgramsCount

  const recentActivities = await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  const categoryLabels = {
    COMPETITION: "Yarışma",
    VOLUNTEER: "Gönüllülük",
    SUMMER_PROGRAM: "Yaz Programı",
    SCHOOL_PROGRAM: "Okul Programı",
    PLATFORM: "Platform",
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#242F50]">Yönetim Paneli</h1>
          <p className="text-[#242F50]/70 mt-2">
            Hoşgeldiniz! Etkinlikleri buradan yönetebilirsiniz.
          </p>
        </div>
        <Link
          href="/admin/activities/new"
          className="flex items-center gap-2 px-6 py-3 bg-[#2458B4] hover:bg-[#1d4a95] text-white font-medium rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Yeni Etkinlik
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#2458B4]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#242F50]/70">Toplam Etkinlik</p>
              <p className="text-3xl font-bold text-[#242F50] mt-1">
                {totalActivities}
              </p>
            </div>
            <div className="p-3 bg-[#E6F1FB] rounded-lg">
              <BookOpen className="w-6 h-6 text-[#2458B4]" />
            </div>
          </div>
        </div>

        <Link
          href="/admin/activities?category=COMPETITION"
          className="bg-white rounded-lg shadow p-6 border-l-4 border-[#62ABEA] hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#242F50]/70">Yarışmalar</p>
              <p className="text-3xl font-bold text-[#242F50] mt-1">
                {competitionsCount}
              </p>
            </div>
            <div className="p-3 bg-[#E6F1FB] rounded-lg">
              <Award className="w-6 h-6 text-[#2458B4]" />
            </div>
          </div>
        </Link>

        <Link
          href="/admin/activities?category=VOLUNTEER"
          className="bg-white rounded-lg shadow p-6 border-l-4 border-[#62ABEA] hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#242F50]/70">Gönüllülük</p>
              <p className="text-3xl font-bold text-[#242F50] mt-1">
                {volunteerCount}
              </p>
            </div>
            <div className="p-3 bg-[#E6F1FB] rounded-lg">
              <Users className="w-6 h-6 text-[#2458B4]" />
            </div>
          </div>
        </Link>

        <Link
          href="/admin/activities?category=SUMMER_PROGRAM"
          className="bg-white rounded-lg shadow p-6 border-l-4 border-[#62ABEA] hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#242F50]/70">Yaz Programları</p>
              <p className="text-3xl font-bold text-[#242F50] mt-1">
                {summerProgramsCount}
              </p>
            </div>
            <div className="p-3 bg-[#E6F1FB] rounded-lg">
              <Calendar className="w-6 h-6 text-[#2458B4]" />
            </div>
          </div>
        </Link>

        <Link
          href="/admin/activities?category=SCHOOL_PROGRAM"
          className="bg-white rounded-lg shadow p-6 border-l-4 border-[#62ABEA] hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#242F50]/70">Okul Programları</p>
              <p className="text-3xl font-bold text-[#242F50] mt-1">
                {schoolProgramsCount}
              </p>
            </div>
            <div className="p-3 bg-[#E6F1FB] rounded-lg">
              <BookOpen className="w-6 h-6 text-[#2458B4]" />
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-[#242F50]/10">
          <h2 className="text-xl font-bold text-[#242F50] flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Son Eklenen Etkinlikler
          </h2>
        </div>

        {recentActivities.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[#242F50]/70">
              Henüz etkinlik eklenmemiş. Başlamaya hazır mısınız?
            </p>
            <Link
              href="/admin/activities/new"
              className="inline-block mt-4 px-6 py-2 bg-[#2458B4] hover:bg-[#1d4a95] text-white font-medium rounded-lg transition-colors cursor-pointer"
            >
              İlk Etkinliği Ekle
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#E6F1FB] border-b border-[#242F50]/10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#242F50]">
                    Etkinlik Adı
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#242F50]">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#242F50]">
                    Oluşturulma Tarihi
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-[#242F50]">
                    İşlem
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242F50]/10">
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-[#E6F1FB]/50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[#242F50]">
                          {activity.name}
                        </p>
                        <p className="text-sm text-[#242F50]/70">
                          {activity.slug}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-[#AAD0F2] text-[#242F50]">
                        {categoryLabels[activity.category]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#242F50]/70">
                      {new Date(activity.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/activities/${activity.slug}/edit`}
                        className="text-[#2458B4] hover:text-[#1d4a95] font-medium text-sm cursor-pointer"
                      >
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-4 bg-[#E6F1FB]/50 border-t border-[#242F50]/10 text-center">
          <Link
            href="/admin/activities"
            className="text-[#2458B4] hover:text-[#1d4a95] font-medium cursor-pointer"
          >
            Tüm Etkinlikleri Görüntüle →
          </Link>
        </div>
      </div>
    </div>
  )
}