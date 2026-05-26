// app/admin/page.tsx

import Link from "next/link"
import { Calendar, Award, Users, BookOpen, Plus, Clock, Sparkles, DollarSign, Globe, Layers } from "lucide-react"
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

  const scholarshipsCount = await prisma.activity.count({
    where: { category: "SCHOLARSHIP" },
  })

  const platformsCount = await prisma.activity.count({
    where: { category: "PLATFORM" },
  })

  const totalActivities = await prisma.activity.count()

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-[#FFE5B4]/30 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-[#2B0510]">Yönetim Paneli</h1>
          <p className="text-[#2B0510]/70 mt-2">
            Hoşgeldiniz! Etkinlikleri ve toplu aktarımları buradan yönetebilirsiniz.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/bulk-import"
            className="flex items-center gap-2 px-6 py-3 bg-[#F9EFE6] hover:bg-[#FFE5B4]/55 text-[#7B1B38] font-bold rounded-lg border-2 border-[#7B1B38]/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#7B1B38]" />
            Toplu AI Yükleyici
          </Link>
          <Link
            href="/admin/activities/new"
            className="flex items-center gap-2 px-6 py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-bold rounded-lg transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Yeni Etkinlik
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4">
        {/* Total */}
        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-[#7B1B38] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#2B0510]/60 uppercase tracking-wider">Toplam</p>
              <p className="text-2xl font-black text-[#2B0510] mt-1">
                {totalActivities}
              </p>
            </div>
            <div className="p-2.5 bg-[#F9EFE6] rounded-lg">
              <Layers className="w-5 h-5 text-[#7B1B38]" />
            </div>
          </div>
        </div>

        {/* Competitions */}
        <Link
          href="/admin/activities?category=COMPETITION"
          className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-[#D4AF37] flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#2B0510]/60 uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">Yarışma</p>
              <p className="text-2xl font-black text-[#2B0510] mt-1">
                {competitionsCount}
              </p>
            </div>
            <div className="p-2.5 bg-[#FFF9E6] rounded-lg">
              <Award className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>
        </Link>

        {/* Volunteer */}
        <Link
          href="/admin/activities?category=VOLUNTEER"
          className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-[#4E8D70] flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#2B0510]/60 uppercase tracking-wider group-hover:text-[#4E8D70] transition-colors">Gönüllülük</p>
              <p className="text-2xl font-black text-[#2B0510] mt-1">
                {volunteerCount}
              </p>
            </div>
            <div className="p-2.5 bg-[#EAF5F0] rounded-lg">
              <Users className="w-5 h-5 text-[#4E8D70]" />
            </div>
          </div>
        </Link>

        {/* Summer Program */}
        <Link
          href="/admin/activities?category=SUMMER_PROGRAM"
          className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-[#E07A5F] flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#2B0510]/60 uppercase tracking-wider group-hover:text-[#E07A5F] transition-colors">Yaz Prog.</p>
              <p className="text-2xl font-black text-[#2B0510] mt-1">
                {summerProgramsCount}
              </p>
            </div>
            <div className="p-2.5 bg-[#FDF2F0] rounded-lg">
              <Calendar className="w-5 h-5 text-[#E07A5F]" />
            </div>
          </div>
        </Link>

        {/* School Program */}
        <Link
          href="/admin/activities?category=SCHOOL_PROGRAM"
          className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-[#5F7CE0] flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#2B0510]/60 uppercase tracking-wider group-hover:text-[#5F7CE0] transition-colors">Okul Prog.</p>
              <p className="text-2xl font-black text-[#2B0510] mt-1">
                {schoolProgramsCount}
              </p>
            </div>
            <div className="p-2.5 bg-[#F0F3FD] rounded-lg">
              <BookOpen className="w-5 h-5 text-[#5F7CE0]" />
            </div>
          </div>
        </Link>

        {/* Scholarships */}
        <Link
          href="/admin/activities?category=SCHOLARSHIP"
          className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-[#D16C82] flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#2B0510]/60 uppercase tracking-wider group-hover:text-[#D16C82] transition-colors">Burslar</p>
              <p className="text-2xl font-black text-[#2B0510] mt-1">
                {scholarshipsCount}
              </p>
            </div>
            <div className="p-2.5 bg-[#FDF0F3] rounded-lg">
              <DollarSign className="w-5 h-5 text-[#D16C82]" />
            </div>
          </div>
        </Link>

        {/* Platforms */}
        <Link
          href="/admin/activities?category=PLATFORM"
          className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-[#3C9199] flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#2B0510]/60 uppercase tracking-wider group-hover:text-[#3C9199] transition-colors">Platform</p>
              <p className="text-2xl font-black text-[#2B0510] mt-1">
                {platformsCount}
              </p>
            </div>
            <div className="p-2.5 bg-[#EBF7F8] rounded-lg">
              <Globe className="w-5 h-5 text-[#3C9199]" />
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