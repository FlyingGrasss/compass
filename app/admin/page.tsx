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
    SCHOLARSHIP: "Burs",
    PLATFORM: "Platform",
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#2B0510]">Yönetim Paneli</h1>
          <p className="text-[#2B0510]/70 mt-2">
            Hoşgeldiniz! Etkinlikleri buradan yönetebilirsiniz.
          </p>
        </div>
        <Link
          href="/admin/activities/new"
          className="flex items-center gap-2 px-6 py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-medium rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Yeni Etkinlik
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#7B1B38]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#2B0510]/70">Toplam Etkinlik</p>
              <p className="text-3xl font-bold text-[#2B0510] mt-1">
                {totalActivities}
              </p>
            </div>
            <div className="p-3 bg-[#F9EFE6] rounded-lg">
              <BookOpen className="w-6 h-6 text-[#7B1B38]" />
            </div>
          </div>
        </div>

        <Link
          href="/admin/activities?category=COMPETITION"
          className="bg-white rounded-lg shadow p-6 border-l-4 border-[#62ABEA] hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#2B0510]/70">Yarışmalar</p>
              <p className="text-3xl font-bold text-[#2B0510] mt-1">
                {competitionsCount}
              </p>
            </div>
            <div className="p-3 bg-[#F9EFE6] rounded-lg">
              <Award className="w-6 h-6 text-[#7B1B38]" />
            </div>
          </div>
        </Link>

        <Link
          href="/admin/activities?category=VOLUNTEER"
          className="bg-white rounded-lg shadow p-6 border-l-4 border-[#62ABEA] hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#2B0510]/70">Gönüllülük</p>
              <p className="text-3xl font-bold text-[#2B0510] mt-1">
                {volunteerCount}
              </p>
            </div>
            <div className="p-3 bg-[#F9EFE6] rounded-lg">
              <Users className="w-6 h-6 text-[#7B1B38]" />
            </div>
          </div>
        </Link>

        <Link
          href="/admin/activities?category=SUMMER_PROGRAM"
          className="bg-white rounded-lg shadow p-6 border-l-4 border-[#62ABEA] hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#2B0510]/70">Yaz Programları</p>
              <p className="text-3xl font-bold text-[#2B0510] mt-1">
                {summerProgramsCount}
              </p>
            </div>
            <div className="p-3 bg-[#F9EFE6] rounded-lg">
              <Calendar className="w-6 h-6 text-[#7B1B38]" />
            </div>
          </div>
        </Link>

        <Link
          href="/admin/activities?category=SCHOOL_PROGRAM"
          className="bg-white rounded-lg shadow p-6 border-l-4 border-[#62ABEA] hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#2B0510]/70">Okul Programları</p>
              <p className="text-3xl font-bold text-[#2B0510] mt-1">
                {schoolProgramsCount}
              </p>
            </div>
            <div className="p-3 bg-[#F9EFE6] rounded-lg">
              <BookOpen className="w-6 h-6 text-[#7B1B38]" />
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2B0510]/10">
          <h2 className="text-xl font-bold text-[#2B0510] flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Son Eklenen Etkinlikler
          </h2>
        </div>

        {recentActivities.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[#2B0510]/70">
              Henüz etkinlik eklenmemiş. Başlamaya hazır mısınız?
            </p>
            <Link
              href="/admin/activities/new"
              className="inline-block mt-4 px-6 py-2 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-medium rounded-lg transition-colors cursor-pointer"
            >
              İlk Etkinliği Ekle
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9EFE6] border-b border-[#2B0510]/10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#2B0510]">
                    Etkinlik Adı
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#2B0510]">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#2B0510]">
                    Oluşturulma Tarihi
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-[#2B0510]">
                    İşlem
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B0510]/10">
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-[#F9EFE6]/50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[#2B0510]">
                          {activity.name}
                        </p>
                        <p className="text-sm text-[#2B0510]/70">
                          {activity.slug}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-[#FFE5B4] text-[#2B0510]">
                        {categoryLabels[activity.category]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2B0510]/70">
                      {new Date(activity.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/activities/${activity.slug}/edit`}
                        className="text-[#7B1B38] hover:text-[#5A1127] font-medium text-sm cursor-pointer"
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

        <div className="px-6 py-4 bg-[#F9EFE6]/50 border-t border-[#2B0510]/10 text-center">
          <Link
            href="/admin/activities"
            className="text-[#7B1B38] hover:text-[#5A1127] font-medium cursor-pointer"
          >
            Tüm Etkinlikleri Görüntüle →
          </Link>
        </div>
      </div>
    </div>
  )
}