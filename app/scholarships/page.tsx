// app/scholarships/page.tsx

import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import ScholarshipsClient, { SerializedScholarship } from "@/components/ScholarshipsClient"

export const revalidate = 300

export const metadata = {
  title: "Burslar & Burs Rehberi | YouthCompass",
  description: "Yurt dışında eğitim almak isteyen lise ve üniversite öğrencileri için en prestijli, güncel burs ve finansal destek fırsatları.",
}

export default async function ScholarshipsPage() {
  let scholarships: SerializedScholarship[] = []

  try {
    const rawScholarships = await prisma.activity.findMany({
      where: {
        category: "SCHOLARSHIP",
      },
      orderBy: [
        { isPrestigious: "desc" },
        { deadline: "asc" },
      ],
    })

    scholarships = rawScholarships.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      description: s.description,
      requirements: s.requirements,
      imageUrl: s.imageUrl,
      isPrestigious: s.isPrestigious,
      isClosed: s.isClosed,
      deadline: s.deadline ? s.deadline.toISOString() : null,
      scholarshipAmount: s.scholarshipAmount,
      financialSupport: s.financialSupport,
      location: s.location,
      locationTags: s.locationTags,
      website: s.website,
    }))
  } catch (error) {
    console.error("Failed to fetch scholarships for SSG:", error)
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFFDF9] to-[#FFF9F0] dark:from-[#1a0a10] dark:to-[#220d15] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <Suspense fallback={<div className="h-96 flex items-center justify-center text-[#7B1B38] font-bold">Yükleniyor...</div>}>
          <ScholarshipsClient initialScholarships={scholarships} />
        </Suspense>
      </div>
    </main>
  )
}
