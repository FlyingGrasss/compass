// app/activities/page.tsx

import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import ActivitiesClient, { SerializedActivity } from "@/components/ActivitiesClient"
import { KNOWN_ACTIVITY_SUBJECTS } from "@/lib/activity-subjects"

export const revalidate = 300

export const metadata = {
  title: "Tüm Fırsatlar & Etkinlikler | YouthCompass",
  description: "Liseli ve üniversiteli gençler için yarışmalar, yaz programları, staj ve gönüllülük fırsatları.",
}

export default async function ActivitiesPage() {
  let activities: SerializedActivity[] = []

  try {
    const rawActivities = await prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
    })

    activities = rawActivities.map((act) => ({
      id: act.id,
      name: act.name,
      slug: act.slug,
      description: act.description,
      category: act.category,
      gradeLevels: act.gradeLevels,
      minAge: act.minAge,
      maxAge: act.maxAge,
      financialSupport: act.financialSupport,
      entryPrice: act.entryPrice ? Number(act.entryPrice) : null,
      scholarshipAmount: act.scholarshipAmount,
      amountCurrency: act.amountCurrency,
      isPrestigious: act.isPrestigious,
      isClosed: act.isClosed,
      season: act.season,
      duration: act.duration,
      deadline: act.deadline ? act.deadline.toISOString() : null,
      location: act.location,
      locationTags: act.locationTags,
      subjectTags: act.subjectTags?.length ? act.subjectTags : (KNOWN_ACTIVITY_SUBJECTS[act.slug] || []),
      requirements: act.requirements,
      website: act.website,
      imageUrl: act.imageUrl,
      createdAt: act.createdAt.toISOString(),
    }))
  } catch (error) {
    console.error("Failed to fetch activities for SSG:", error)
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFFDF9] via-[#FFF9F0] to-[#FFFDF9] dark:from-[#1a0a10] dark:via-[#220d15] dark:to-[#1a0a10] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Suspense fallback={<div className="h-96 flex items-center justify-center text-[#7B1B38] font-bold">Yükleniyor...</div>}>
          <ActivitiesClient initialActivities={activities} />
        </Suspense>
      </div>
    </main>
  )
}
