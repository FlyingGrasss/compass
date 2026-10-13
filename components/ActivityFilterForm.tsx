// components/ActivityFilterForm.tsx
"use client"

import { useRouter } from "next/navigation"
import { ReactNode, FormEvent } from "react"

interface ActivityFilterFormProps {
  children: ReactNode
  fitFilter?: boolean
}

/**
 * Filter form wrapper that intercepts GET submissions to remove empty or "ALL" default query parameters.
 * Produces clean, readable URLs (e.g. /activities?grade=10&subjects=cs instead of giant URLs with default ALL params).
 */
export default function ActivityFilterForm({ children, fitFilter }: ActivityFilterFormProps) {
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const params = new URLSearchParams()

    const search = formData.get("search")?.toString().trim()
    if (search) params.set("search", search)

    const sort = formData.get("sort")?.toString()
    if (sort && sort !== "deadline_asc") params.set("sort", sort)

    const category = formData.get("category")?.toString()
    if (category && category !== "ALL") params.set("category", category)

    const season = formData.get("season")?.toString()
    if (season && season !== "ALL") params.set("season", season)

    const grade = formData.get("grade")?.toString()
    if (grade && grade !== "ALL") params.set("grade", grade)

    const age = formData.get("age")?.toString()
    if (age && age !== "ALL") params.set("age", age)

    const location = formData.get("location")?.toString()
    if (location && location !== "ALL") params.set("location", location)

    const prestigious = formData.get("prestigious")?.toString()
    if (prestigious && prestigious !== "ALL") params.set("prestigious", prestigious)

    const status = formData.get("status")?.toString()
    if (status && status !== "ALL") params.set("status", status)

    const subjects = formData.getAll("subjects").map((s) => s.toString().trim()).filter(Boolean)
    for (const s of subjects) {
      params.append("subjects", s)
    }

    if (fitFilter) params.set("fit", "me")

    const query = params.toString()
    router.push(query ? `/activities?${query}` : "/activities")
  }

  return (
    <form action="/activities" method="GET" onSubmit={handleSubmit} className="space-y-4">
      {children}
    </form>
  )
}
