// app/admin/page.tsx

import Link from "next/link"
import { Calendar, Award, Users, BookOpen } from "lucide-react"
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#242F50]">Yönetim Paneli</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/activities?category=COMPETITION"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#AAD0F2] rounded-lg">
              <Award className="w-6 h-6 text-[#2458B4]" />
            </div>
            <div>
              <p className="text-sm text-[#242F50]/70">Yarışmalar</p>
              <p className="text-2xl font-bold text-[#242F50]">
                {competitionsCount}
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/activities?category=VOLUNTEER"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#AAD0F2] rounded-lg">
              <Users className="w-6 h-6 text-[#2458B4]" />
            </div>
            <div>
              <p className="text-sm text-[#242F50]/70">Gönüllülük</p>
              <p className="text-2xl font-bold text-[#242F50]">
                {volunteerCount}
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/activities?category=SUMMER_PROGRAM"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#AAD0F2] rounded-lg">
              <Calendar className="w-6 h-6 text-[#2458B4]" />
            </div>
            <div>
              <p className="text-sm text-[#242F50]/70">Yaz Programları</p>
              <p className="text-2xl font-bold text-[#242F50]">
                {summerProgramsCount}
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/activities?category=SCHOOL_PROGRAM"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#AAD0F2] rounded-lg">
              <BookOpen className="w-6 h-6 text-[#2458B4]" />
            </div>
            <div>
              <p className="text-sm text-[#242F50]/70">Okul Programları</p>
              <p className="text-2xl font-bold text-[#242F50]">
                {schoolProgramsCount}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}