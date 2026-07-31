// app/admin/layout.tsx

import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { headers } from "next/headers"

export const metadata: Metadata = {
  title: "Yönetim Paneli - YouthCompass",
  description: "Etkinlikleri yönetin, oluşturun ve düzenleyin",
  robots: "noindex, nofollow",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/auth/sign-in")
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
