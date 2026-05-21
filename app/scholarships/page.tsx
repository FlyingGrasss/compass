// app/scholarships/page.tsx

import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Search, Filter, Calendar, MapPin, GraduationCap, DollarSign, Award, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Burslar & Burs Rehberi | Compass",
  description: "Yurt dışında eğitim almak isteyen lise ve üniversite öğrencileri için en prestijli, güncel burs ve finansal destek fırsatları.",
}

interface PageProps {
  searchParams: {
    search?: string
    status?: string
    eligibility?: string
    prestigious?: string
  }
}

export default async function ScholarshipsPage({ searchParams }: PageProps) {
  const searchQuery = (await searchParams).search || ""
  const statusFilter = (await searchParams).status || "all"
  const eligibilityFilter = (await searchParams).eligibility || "all"
  const prestigiousFilter = (await searchParams).prestigious || "all"

  // Build prisma query
  const whereClause: any = {
    category: "SCHOLARSHIP",
  }

  if (searchQuery) {
    whereClause.OR = [
      { name: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
      { requirements: { contains: searchQuery, mode: "insensitive" } },
    ]
  }

  if (statusFilter === "open") {
    whereClause.isClosed = false
  } else if (statusFilter === "closed") {
    whereClause.isClosed = true
  }

  if (eligibilityFilter === "global") {
    whereClause.OR = [
      { location: { contains: "global", mode: "insensitive" } },
      { location: { contains: "küresel", mode: "insensitive" } },
      { location: { contains: "oxford", mode: "insensitive" } },
      { location: { contains: "ingiltere", mode: "insensitive" } },
      { location: null },
    ]
  } else if (eligibilityFilter === "us") {
    whereClause.OR = [
      { location: { contains: "abd", mode: "insensitive" } },
      { location: { contains: "amerika", mode: "insensitive" } },
      { location: { contains: "united states", mode: "insensitive" } },
    ]
  }

  if (prestigiousFilter === "true") {
    whereClause.isPrestigious = true
  }

  const scholarships = await prisma.activity.findMany({
    where: whereClause,
    orderBy: [
      { isPrestigious: "desc" },
      { deadline: "asc" },
    ],
  })

  // Format financial support descriptions
  const getFinancialSupportLabel = (code: string) => {
    switch (code) {
      case "A+": return "Tam Burslu (Eğitim + Yaşam)"
      case "A": return "Büyük Ölçüde Burslu"
      case "B": return "Kısmi Burslu / Ödül"
      case "C": return "Küçük Çekiliş / Katılım Ödülü"
      default: return code || "Finansal Destek Detayda"
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFFDF9] to-[#FFF9F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Hero Section */}
        <div className="bg-linear-to-br from-[#7B1B38] to-[#4A0E21] rounded-3xl p-8 sm:p-12 text-[#FFFDF9] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,229,180,0.15),transparent_60%)]"></div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FFE5B4]/5 rounded-full blur-3xl"></div>
          
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE5B4]/20 border border-[#FFE5B4]/30 text-[#FFE5B4] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Burs & Finansal Destek Fırsatları
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              Geleceğini Burslarla İnşa Et
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
              Dünyanın en prestijli üniversitelerinden ve vakıflarından 37'den fazla burs fırsatını derledik. Compass ile kriterlerine uygun olanları filtrele ve hayallerine giden yolda destek bul!
            </p>
          </div>
        </div>

        {/* Search and Interactive Filter Form */}
        <div className="bg-white rounded-2xl border border-[#F1E2D9] p-6 shadow-md">
          <form method="GET" className="space-y-4 sm:space-y-0 sm:flex sm:gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-[#7A696C]" />
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Burs adı, gereksinimler veya anahtar kelimelerle ara..."
                className="w-full pl-11 pr-4 py-3 bg-[#FFFDF9] border border-[#F1E2D9] rounded-xl text-[#2B0510] font-medium placeholder-[#7A696C]/60 focus:outline-none focus:ring-2 focus:ring-[#7B1B38] focus:border-[#7B1B38] transition-all"
              />
            </div>

            {/* Filter Group */}
            <div className="grid grid-cols-2 sm:flex sm:gap-3 gap-2">
              
              {/* Eligibility Filter */}
              <div className="relative">
                <select
                  name="eligibility"
                  defaultValue={eligibilityFilter}
                  className="w-full sm:w-44 px-3 py-3 bg-[#FFFDF9] border border-[#F1E2D9] rounded-xl text-sm font-semibold text-[#2B0510] focus:outline-none focus:ring-2 focus:ring-[#7B1B38] transition-all cursor-pointer appearance-none"
                >
                  <option value="all">Tüm Uygunluklar</option>
                  <option value="global">Küresel / Türkiye</option>
                  <option value="us">Sadece ABD</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  name="status"
                  defaultValue={statusFilter}
                  className="w-full sm:w-40 px-3 py-3 bg-[#FFFDF9] border border-[#F1E2D9] rounded-xl text-sm font-semibold text-[#2B0510] focus:outline-none focus:ring-2 focus:ring-[#7B1B38] transition-all cursor-pointer appearance-none"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="open">Açık Başvurular</option>
                  <option value="closed">Kapanmış</option>
                </select>
              </div>

              {/* Prestigious Filter */}
              <div className="relative col-span-2 sm:col-span-1">
                <select
                  name="prestigious"
                  defaultValue={prestigiousFilter}
                  className="w-full sm:w-40 px-3 py-3 bg-[#FFFDF9] border border-[#F1E2D9] rounded-xl text-sm font-semibold text-[#2B0510] focus:outline-none focus:ring-2 focus:ring-[#7B1B38] transition-all cursor-pointer appearance-none"
                >
                  <option value="all">Tüm Dereceler</option>
                  <option value="true">Sadece Prestijli</option>
                </select>
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-bold rounded-xl shadow-md transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" /> Filtrele
            </button>
          </form>
        </div>

        {/* Directory Scholarships Count */}
        <div className="flex items-center justify-between border-b border-[#F1E2D9] pb-4">
          <p className="text-sm font-bold text-[#7A696C]">
            Toplam <span className="text-[#7B1B38]">{scholarships.length}</span> burs listeleniyor
          </p>
          {(searchQuery || statusFilter !== "all" || eligibilityFilter !== "all" || prestigiousFilter !== "all") && (
            <Link
              href="/scholarships"
              className="text-xs font-bold text-[#7B1B38] hover:underline"
            >
              Filtreleri Temizle
            </Link>
          )}
        </div>

        {/* Scholarships Directory Grid */}
        {scholarships.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#F1E2D9] p-16 text-center space-y-4">
            <div className="w-16 h-16 bg-[#FFE5B4]/30 rounded-full flex items-center justify-center mx-auto text-[#7B1B38]">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#2B0510]">Sonuç Bulunamadı</h3>
            <p className="text-sm text-[#7A696C] max-w-md mx-auto">
              Belirttiğiniz kriterlere uygun burs fırsatı bulunmamaktadır. Farklı filtreler kullanmayı veya aramayı genişletmeyi deneyebilirsiniz.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className={`bg-white rounded-2xl border ${scholarship.isPrestigious ? "border-[#FFE5B4]" : "border-[#F1E2D9]"} shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group hover:-translate-y-1.5`}
              >
                {/* Prestigious Banner badge */}
                {scholarship.isPrestigious && (
                  <div className="absolute top-0 right-0 bg-linear-to-l from-[#FFE5B4] to-[#FFF0D4] text-[#7B1B38] px-4 py-1.5 rounded-bl-xl text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 z-10 border-l border-b border-[#FFE5B4]">
                    <Award className="w-3 h-3 fill-[#7B1B38]/10" /> Prestijli Fırsat
                  </div>
                )}

                <div className="p-6 space-y-5 flex-1">
                  
                  {/* Status & Support */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Badge */}
                    {scholarship.isClosed ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold">
                        Kapandı
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Açık
                      </span>
                    )}

                    {/* Support Amount badge */}
                    <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full bg-[#FFE5B4]/30 text-[#7B1B38] text-xs font-bold">
                      <DollarSign className="w-3 h-3" /> {getFinancialSupportLabel(scholarship.financialSupport)}
                    </span>
                  </div>

                  {/* Scholarship Name */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#2B0510] group-hover:text-[#7B1B38] transition-colors line-clamp-2">
                      {scholarship.name}
                    </h3>
                    
                    {scholarship.location && (
                      <div className="flex items-center gap-1.5 text-xs text-[#7A696C]">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{scholarship.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#2B0510]/85 line-clamp-4 leading-relaxed font-medium">
                    {scholarship.description.split("\n\n")[0]}
                  </p>

                  {/* Requirements Summary in card */}
                  {scholarship.requirements && (
                    <div className="bg-[#FFFDF9] border border-[#F1E2D9] rounded-xl p-3 text-xs text-[#2B0510]/95 font-medium space-y-1">
                      <span className="font-bold text-[#7B1B38] text-[10px] uppercase tracking-wider block">Gereksinimler:</span>
                      <p className="line-clamp-2 leading-relaxed">
                        {scholarship.requirements.replace(/•\s/g, "")}
                      </p>
                    </div>
                  )}

                </div>

                {/* Footer Section */}
                <div className="px-6 py-4 bg-[#FFFDF9] border-t border-[#F1E2D9]/60 flex items-center justify-between">
                  {/* Deadline */}
                  <div className="flex items-center gap-1.5 text-xs text-[#7A696C] font-semibold">
                    <Calendar className="w-4 h-4 text-[#7B1B38]" />
                    <span>
                      {scholarship.deadline ? (
                        <>Son Tarih: {new Date(scholarship.deadline).toLocaleDateString("tr-TR")}</>
                      ) : (
                        "Sürekli (Rolling)"
                      )}
                    </span>
                  </div>

                  {/* CTA button inside Card */}
                  {scholarship.website ? (
                    <a
                      href={scholarship.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-black text-[#7B1B38] hover:text-[#5A1127] transition-colors group/btn"
                    >
                      Başvur <ArrowUpRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      href={`/activities/${scholarship.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-black text-[#7B1B38] hover:text-[#5A1127] transition-colors"
                    >
                      Detay Gör →
                    </Link>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}
