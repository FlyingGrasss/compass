// components/Navbar.tsx

"use client"

import Link from "next/link"
import { useSession, signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Compass, Menu, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    toast.success("Çıkış yapıldı")
    router.push("/auth/sign-in")
    setIsOpen(false)
  }

  return (
    <nav className="bg-white border-b border-[#242F50]/10 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl flex gap-3 items-center font-bold text-[#2458B4] cursor-pointer"
          >
            <Compass className="scale-150 pt-0.5" /> Compass
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href={session ? "/admin/activites" : "/activites"}
              className="text-sm text-[#242F50]/70 hover:text-[#2458B4] transition-colors cursor-pointer"
            >
              {session ? "Admin" : "Etkinlikler"}
            </Link>

            {session ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="text-sm text-[#242F50]/70 hover:text-[#2458B4] transition-colors cursor-pointer"
                >
                  {session.user?.name || "Profil"}
                </Link>
                {session.user?.email === "your-admin-email@example.com" && (
                  <Link
                    href="/admin"
                    className="text-sm text-[#2458B4] font-medium hover:text-[#1d4a95] transition-colors cursor-pointer"
                  >
                    Panel
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/sign-in"
                  className="text-sm text-[#2458B4] font-medium hover:text-[#1d4a95] transition-colors cursor-pointer"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="text-sm px-4 py-2 bg-[#2458B4] hover:bg-[#1d4a95] text-white rounded-lg transition-colors cursor-pointer"
                >
                  Kaydol
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#242F50] cursor-pointer"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-[#242F50]/10">
            <Link
              href="/activities"
              className="block px-4 py-2 text-sm text-[#242F50]/70 hover:text-[#2458B4] hover:bg-[#E6F1FB] rounded transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Etkinlikler
            </Link>

            {session ? (
              <>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-[#242F50]/70 hover:text-[#2458B4] hover:bg-[#E6F1FB] rounded transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Profil
                </Link>
                {session.user?.email === "your-admin-email@example.com" && (
                  <Link
                    href="/admin"
                    className="block px-4 py-2 text-sm text-[#2458B4] font-medium hover:bg-[#E6F1FB] rounded transition-colors cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    Panel
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="block px-4 py-2 text-sm text-[#2458B4] font-medium hover:bg-[#E6F1FB] rounded transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="block px-4 py-2 text-sm bg-[#2458B4] text-white rounded hover:bg-[#1d4a95] transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Kaydol
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}