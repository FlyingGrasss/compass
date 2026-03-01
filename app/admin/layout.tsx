// app/admin/layout.tsx

import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { headers } from "next/headers"

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
      <nav className="bg-white border-b border-[#242F50]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link
                href="/admin"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#242F50] border-b-2 border-transparent hover:border-[#2458B4] cursor-pointer"
              >
                Panel
              </Link>
              <Link
                href="/admin/activities"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#242F50] border-b-2 border-transparent hover:border-[#2458B4] cursor-pointer"
              >
                Etkinlikler
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                href="/"
                className="text-sm text-[#242F50]/70 hover:text-[#2458B4] cursor-pointer"
              >
                Siteye Dön
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}