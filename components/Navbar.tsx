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
    <nav className="bg-white/95 backdrop-blur-md border-b border-[#FFE5B4]/40 shadow-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl flex gap-3 items-center font-black text-[#7B1B38] cursor-pointer tracking-tight"
          >
            <Compass className="scale-110 text-[#7B1B38] transition-transform group-hover:rotate-12" />
            <span>Compass</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/activities"
              className="text-sm font-bold text-[#2B0510]/80 hover:text-[#7B1B38] transition-colors cursor-pointer"
            >
              Etkinlikler
            </Link>

            <Link
              href="/scholarships"
              className="text-sm font-bold text-[#2B0510]/80 hover:text-[#7B1B38] transition-colors cursor-pointer"
            >
              Burslar
            </Link>

            <Link
              href="/about"
              className="text-sm font-bold text-[#2B0510]/80 hover:text-[#7B1B38] transition-colors cursor-pointer"
            >
              Hakkımızda
            </Link>

            {session ? (
              <div className="flex items-center gap-4 border-l border-[#F1E2D9] pl-6">
                <Link
                  href="/profile"
                  className="text-sm font-semibold text-[#2B0510]/80 hover:text-[#7B1B38] transition-colors cursor-pointer"
                >
                  {session.user?.name || "Profil"}
                </Link>

                <Link
                  href="/admin"
                  className="text-sm text-[#7B1B38] font-black hover:text-[#5A1127] transition-colors cursor-pointer"
                >
                  Panel
                </Link>

                <button
                  onClick={handleSignOut}
                  className="text-sm px-4 py-2 bg-[#7B1B38] hover:bg-[#5A1127] text-white rounded-xl transition-colors font-bold cursor-pointer"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-l border-[#F1E2D9] pl-6">
                <Link
                  href="/auth/sign-in"
                  className="text-sm text-[#7B1B38] font-bold hover:text-[#5A1127] transition-colors cursor-pointer"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="text-sm px-4 py-2 bg-[#7B1B38] hover:bg-[#5A1127] text-white rounded-xl transition-all shadow-xs hover:shadow-md font-bold cursor-pointer"
                >
                  Kaydol
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#7B1B38] hover:bg-[#FFE5B4]/30 rounded-lg cursor-pointer transition-colors"
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
          <div className="md:hidden pb-4 space-y-2 border-t border-[#F1E2D9] mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="/activities"
              className="block px-4 py-2.5 text-sm font-bold text-[#2B0510]/80 hover:text-[#7B1B38] hover:bg-[#FFE5B4]/20 rounded-xl transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Etkinlikler
            </Link>

            <Link
              href="/scholarships"
              className="block px-4 py-2.5 text-sm font-bold text-[#2B0510]/80 hover:text-[#7B1B38] hover:bg-[#FFE5B4]/20 rounded-xl transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Burslar
            </Link>

            <Link
              href="/about"
              className="block px-4 py-2.5 text-sm font-bold text-[#2B0510]/80 hover:text-[#7B1B38] hover:bg-[#FFE5B4]/20 rounded-xl transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Hakkımızda
            </Link>

            {session ? (
              <div className="pt-2 border-t border-[#F1E2D9] space-y-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2.5 text-sm font-semibold text-[#2B0510]/80 hover:text-[#7B1B38] hover:bg-[#FFE5B4]/20 rounded-xl transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {session.user?.name || "Profil"}
                </Link>

                <Link
                  href="/admin"
                  className="block px-4 py-2.5 text-sm font-bold text-[#7B1B38] hover:bg-[#FFE5B4]/20 rounded-xl transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Panel
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-[#F1E2D9] space-y-2">
                <Link
                  href="/auth/sign-in"
                  className="block px-4 py-2.5 text-sm font-bold text-[#7B1B38] hover:bg-[#FFE5B4]/20 rounded-xl transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="block px-4 py-2.5 text-sm font-bold bg-[#7B1B38] text-white rounded-xl hover:bg-[#5A1127] text-center shadow-xs transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Kaydol
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}