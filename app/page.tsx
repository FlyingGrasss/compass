// app/page.tsx

"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Briefcase, BookOpen, Users, Search, GraduationCap, Award, Compass, ArrowRight, DollarSign, CheckCircle2 } from "lucide-react"

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "ALL")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim())
    }
    if (selectedCategory && selectedCategory !== "ALL") {
      params.set('category', selectedCategory)
    }
    const queryString = params.toString()
    router.push(`/activities${queryString ? `?${queryString}` : ''}`)
  }

  const highlights = [
    {
      name: "Clarendon Fund Scholarships",
      desc: "Oxford Üniversitesi'nde olağanüstü başarılı öğrencilere sunulan tam burslu yüksek lisans ve doktora programı.",
      support: "Tam Burslu (Eğitim + Yaşam)",
      location: "Oxford Üniversitesi, İngiltere",
      slug: "clarendon-fund-scholarships",
      badge: "Prestijli",
    },
    {
      name: "Writers of the Future Contest",
      desc: "Amatör ve yeni bilim kurgu ile fantezi yazarlarını teşvik etmek amacıyla düzenlenen prestijli küresel yazım yarışması.",
      support: "Kısmi Burslu / Ödül ($500 - $5,000)",
      location: "Küresel (Global)",
      slug: "writers-of-the-future-contest",
      badge: "Küresel",
    },
    {
      name: "Bezos Scholars Program",
      desc: "Devlet okullarındaki 11. sınıf öğrencilerine yönelik, tam destekli liderlik eğitimi ve proje fonu sunan prestijli program.",
      support: "$1,000 Proje Fonu + Tam Seyahat",
      location: "Amerika Birleşik Devletleri",
      slug: "bezos-scholars-program",
      badge: "Liderlik",
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2B0510]">
      {/* Hero Section */}
      <div className="bg-linear-to-b from-[#FFE5B4]/30 via-[#FFF9F0] to-[#FFFDF9] py-16 pt-12 sm:pt-16 lg:pt-20 sm:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE5B4]/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7B1B38]/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE5B4]/50 border border-[#FFE5B4] text-[#7B1B38] text-xs font-bold uppercase tracking-wider animate-pulse">
              <Compass className="w-4 h-4" /> Gençlik İçin Pusula
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-black text-[#7B1B38] tracking-tight leading-none">
                Geleceğinizi Şekillendirecek
                <br className="hidden sm:inline" />
                <span className="bg-linear-to-r from-[#7B1B38] to-[#9E284B] bg-clip-text text-transparent"> Fırsatları Keşfedin</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#2B0510]/80 max-w-2xl mx-auto font-medium">
                13-20 yaş arasındaki gençler için yurt dışı eğitim rehberi, prestijli burslar, stajlar ve gönüllülük programları bir arada!
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-2xl shadow-xl border border-[#F1E2D9] p-2 hover:shadow-2xl transition-all">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-[#FFF9F0] border-r border-[#F1E2D9] rounded-xl text-[#7B1B38] font-bold text-sm outline-none cursor-pointer"
                >
                  <option value="ALL">Tüm Kategoriler</option>
                  <option value="COMPETITION">Yarışmalar</option>
                  <option value="VOLUNTEER">Gönüllülük</option>
                  <option value="SUMMER_PROGRAM">Yaz Programları</option>
                  <option value="SCHOOL_PROGRAM">Okul Programları</option>
                  <option value="SCHOLARSHIP">Burslar</option>
                  <option value="PLATFORM">Platformlar</option>
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Burs, staj, yarışma veya okul programı ara..."
                  className="flex-1 px-4 py-3 outline-none text-[#2B0510] placeholder:text-[#7A696C]/60 bg-transparent font-medium"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#7B1B38] hover:bg-[#5A1127] text-white rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2 font-bold"
                >
                  <Search className="w-5 h-5" />
                  <span>Ara</span>
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link
                href="/activities"
                className="px-8 py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 duration-200"
              >
                Fırsatları Keşfet
              </Link>
              <Link
                href="/scholarships"
                className="px-8 py-3 bg-[#FFE5B4] hover:bg-[#FFD48F] text-[#7B1B38] font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Burs Rehberini Gör
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features/Stats Section */}
      <div className="py-16 sm:py-24 border-t border-[#F1E2D9]/40 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#7B1B38] tracking-tight">
              Compass Size Ne Sunuyor?
            </h2>
            <div className="w-16 h-1 bg-[#7B1B38] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFFDF9] rounded-2xl border border-[#F1E2D9] p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#FFE5B4]/50 text-[#7B1B38] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#7B1B38] mb-3">Burs Rehberliği</h3>
              <p className="text-[#2B0510]/80 font-medium text-sm leading-relaxed">
                Dünyanın dört bir yanından, lise ve üniversite seviyesindeki öğrencilere özel yüzlerce burs fırsatına ücretsiz erişim.
              </p>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl border border-[#F1E2D9] p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#FFE5B4]/50 text-[#7B1B38] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#7B1B38] mb-3">Yurt Dışında Okuma</h3>
              <p className="text-[#2B0510]/80 font-medium text-sm leading-relaxed">
                Fırsat eşitsizliğini engellemek için tasarlanmış bağımsız rehberlik. Yurt dışı okuma imkanlarını kolayca öğrenin.
              </p>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl border border-[#F1E2D9] p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#FFE5B4]/50 text-[#7B1B38] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#7B1B38] mb-3">Kar Amacı Gütmeyen Yapı</h3>
              <p className="text-[#2B0510]/80 font-medium text-sm leading-relaxed">
                Compass, gençler için tamamen ücretsiz ve kâr amacı gütmeyen, gönüllülük esasıyla çalışan bir pusuladır.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Scholarships Section */}
      <div className="py-16 sm:py-24 bg-linear-to-b from-[#FFFDF9] to-[#FFF9F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B1B38]/60 font-mono">Burslar & Çekilişler</span>
              <h2 className="text-3xl font-extrabold text-[#7B1B38] tracking-tight">Öne Çıkan Burs Fırsatları</h2>
            </div>
            <Link
              href="/scholarships"
              className="inline-flex items-center gap-1 text-sm font-black text-[#7B1B38] hover:text-[#5A1127] transition-all hover:translate-x-1"
            >
              Tüm 37+ Bursu İncele <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#F1E2D9] p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFE5B4]/50 text-[#7B1B38] text-[10px] font-black uppercase tracking-wider">
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-[#7A696C] font-semibold">{item.location}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#2B0510] leading-snug">{item.name}</h3>
                  
                  <p className="text-xs font-medium text-[#2B0510]/80 leading-relaxed line-clamp-3">{item.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F1E2D9]/60 flex items-center justify-between">
                  <span className="inline-flex items-center text-xs font-bold text-[#7B1B38] bg-[#FFE5B4]/25 px-2 py-1 rounded-lg">
                    <DollarSign className="w-3.5 h-3.5" /> {item.support.split(" ")[0]}
                  </span>
                  <Link
                    href={`/scholarships?search=${encodeURIComponent(item.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#7B1B38] hover:text-[#5A1127] group"
                  >
                    Detaylar <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section Teaser */}
      <div className="py-16 sm:py-24 bg-white border-t border-[#F1E2D9]/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-[#7B1B38] tracking-tight">Biz Kimiz?</h2>
            <p className="text-[#2B0510]/85 font-medium leading-relaxed">
              Compass, başta Türkiye olmak üzere 13-20 yaş arasındaki tüm gençlere yurt dışında okuma, staj programları ve gönüllülük projelerine katılma gibi konularda tamamen ücretsiz ve kar amacı gütmeden rehberlik eder.
            </p>
            <p className="text-sm text-[#2B0510]/70 italic border-l-4 border-[#FFE5B4] pl-4 leading-relaxed">
              "Compass is designed to act as a compass for young people, helping them on their journey to self-discovery."
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="px-6 py-3 bg-[#FFE5B4] hover:bg-[#FFD48F] text-[#7B1B38] font-bold rounded-xl transition-all shadow-xs inline-flex items-center gap-2"
              >
                Daha Fazlasını Öğren <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="bg-linear-to-tr from-[#7B1B38] to-[#4A0E21] rounded-3xl p-8 sm:p-12 text-[#FFFDF9] shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,229,180,0.15),transparent_50%)]"></div>
            <h3 className="text-2xl font-extrabold relative z-10">Bize Katılın</h3>
            <p className="text-sm text-white/80 leading-relaxed relative z-10 font-medium">
              Siz de ücretsiz bir şekilde üye olarak ilham verici yolculuğumuza katılın. Pusulanız hazır, sınırları aşmak için kaydolun!
            </p>
            <div className="pt-2 relative z-10">
              <Link
                href="/auth/sign-up"
                className="px-6 py-3 bg-white text-[#7B1B38] font-bold rounded-xl transition-all shadow-md hover:bg-white/90 inline-block text-center w-full"
              >
                Ücretsiz Üye Ol
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  )
}