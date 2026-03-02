// app/page.tsx

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Briefcase, BookOpen, Users, Search } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/activities?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-b from-[#AAD0F2] to-[#E6F1FB] py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#242F50] mb-4 sm:mb-6">
                Staj ve Fırsatlar İçin
                <br className="hidden sm:inline" />
                <span className="text-[#2458B4]"> Doğru Adres</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#242F50]/80 mb-8 sm:mb-10">
                Türkiye'deki lise ve üniversite öğrencileri için özel staj,
                yarışma ve gelişim fırsatları platformu
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-xl shadow-lg p-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Etkinlik ara... (Yarışma, Staj, Program vb.)"
                  className="flex-1 px-4 py-3 outline-none text-[#242F50] placeholder:text-[#242F50]/40"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2458B4] hover:bg-[#1d4a95] text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 font-medium"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Ara</span>
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/activities"
                className="px-8 py-3 bg-[#2458B4] hover:bg-[#1d4a95] text-white font-medium rounded-lg transition-colors cursor-pointer text-center"
              >
                Etkinlikleri İncele
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#242F50] text-center mb-12 sm:mb-16">
              Neden Compass?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#62ABEA] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#242F50] mb-2">
                  Staj Fırsatları
                </h3>
                <p className="text-[#242F50]/70">
                  Binlerce staj ilanına kolayca ulaşın ve kariyer yolculuğuna başla
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#62ABEA] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#242F50] mb-2">
                  Eğitim Programları
                </h3>
                <p className="text-[#242F50]/70">
                  Kendinizi geliştirin, yeni beceriler kazanın ve ilerleyin
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#62ABEA] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#242F50] mb-2">
                  Topluluk
                </h3>
                <p className="text-[#242F50]/70">
                  Deneyimlerinizi paylaşın ve ağ oluşturun
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#2458B4] py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Başlamaya hazır mısın?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Binlerce fırsatı keşfet, senin için uygun olanları bul
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-block px-8 py-3 bg-white hover:bg-white/90 text-[#2458B4] font-medium rounded-lg transition-colors cursor-pointer"
            >
              Ücretsiz Kaydol
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}