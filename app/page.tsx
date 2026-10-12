// app/page.tsx

import Link from "next/link"
import Image from "next/image"
import { Briefcase, Users, GraduationCap, ArrowRight, DollarSign, Compass } from "lucide-react"
import { LocaleText, T } from "@/lib/i18n"
import HomeSearchBar from "@/components/HomeSearchBar"

const highlights = [
  {
    name: "Clarendon Fund Scholarships",
    descTr: "Oxford Üniversitesi'nde olağanüstü başarılı öğrencilere sunulan tam burslu yüksek lisans ve doktora programı.",
    descEn: "Fully funded master's and doctoral programs at the University of Oxford for exceptional students.",
    supportShortTr: "Tam Burslu",
    supportShortEn: "Fully Funded",
    locationTr: "Oxford Üniversitesi, İngiltere",
    locationEn: "University of Oxford, UK",
    slug: "clarendon-fund-scholarships",
    badgeTr: "Prestijli",
    badgeEn: "Prestigious",
  },
  {
    name: "Writers of the Future Contest",
    descTr: "Amatör ve yeni bilim kurgu ile fantezi yazarlarını teşvik etmek amacıyla düzenlenen prestijli küresel yazım yarışması.",
    descEn: "A prestigious global writing contest encouraging aspiring science-fiction and fantasy writers.",
    supportShortTr: "Kısmi Burslu",
    supportShortEn: "Partially Funded",
    locationTr: "Küresel (Global)",
    locationEn: "Global",
    slug: "writers-of-the-future-contest",
    badgeTr: "Küresel",
    badgeEn: "Global",
  },
  {
    name: "Bezos Scholars Program",
    descTr: "Devlet okullarındaki 11. sınıf öğrencilerine yönelik, tam destekli liderlik eğitimi ve proje fonu sunan prestijli program.",
    descEn: "A prestigious program for 11th-grade public-school students offering fully supported leadership training and project funding.",
    supportShortTr: "$1,000",
    supportShortEn: "$1,000",
    locationTr: "Amerika Birleşik Devletleri",
    locationEn: "United States",
    slug: "bezos-scholars-program",
    badgeTr: "Liderlik",
    badgeEn: "Leadership",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#1a0a10] text-[#2B0510] dark:text-[#f5e8d0]">
      {/* Hero Section */}
      <div className="bg-linear-to-b from-[#FFE5B4]/30 via-[#FFF9F0] to-[#FFFDF9] dark:from-[#2d121c] dark:via-[#1f0b13] dark:to-[#1a0a10] py-16 pt-12 sm:pt-16 lg:pt-20 sm:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE5B4]/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7B1B38]/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE5B4]/50 dark:bg-[#4a2030]/60 border border-[#FFE5B4] dark:border-[#e8637f]/40 text-[#7B1B38] dark:text-[#f8d7df] text-xs font-bold uppercase tracking-wider animate-pulse">
              <Image src="/logo.svg" alt="" width={16} height={16} className="w-4 h-4 rounded-sm" /> <T k="home.badge" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-black text-[#7B1B38] dark:text-[#f8d7df] tracking-tight leading-none">
                <T k="home.titleStart" />
                <br className="hidden sm:inline" />
                <span className="bg-linear-to-r from-[#7B1B38] to-[#9E284B] dark:from-[#f8d7df] dark:to-[#e8637f] bg-clip-text text-transparent"> <T k="home.titleEnd" /></span>
              </h1>
              <p className="text-lg sm:text-xl text-[#2B0510]/80 dark:text-[#f5e8d0]/80 max-w-2xl mx-auto font-medium">
                <T k="home.description" />
              </p>
            </div>

            {/* Search Bar */}
            <HomeSearchBar />

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link
                href="/activities"
                className="px-8 py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 duration-200"
              >
                <T k="home.explore" />
              </Link>
              <Link
                href="/scholarships"
                className="px-8 py-3 bg-[#FFE5B4] dark:bg-[#4a2030] hover:bg-[#FFD48F] dark:hover:bg-[#5a283b] text-[#7B1B38] dark:text-[#f8d7df] font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <T k="home.viewScholarshipGuide" />
              </Link>
              <Link
                href="/activities?fit=me"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-[#2b1118] hover:bg-[#FFF9F0] dark:hover:bg-[#381620] text-[#7B1B38] dark:text-[#f8d7df] font-black rounded-xl border-2 border-[#7B1B38]/20 dark:border-[#4a2030] hover:border-[#7B1B38] dark:hover:border-[#e8637f] transition-all shadow-xs cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <T k="home.findMatches" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features/Stats Section */}
      <div className="py-16 sm:py-24 border-t border-[#F1E2D9]/40 dark:border-[#4a2030] bg-white dark:bg-[#1a0a10]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#7B1B38] dark:text-[#f8d7df] tracking-tight">
              <T k="home.whatWeOffer" />
            </h2>
            <div className="w-16 h-1 bg-[#7B1B38] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFFDF9] dark:bg-[#2b1118] rounded-2xl border border-[#F1E2D9] dark:border-[#4a2030] p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#FFE5B4]/50 dark:bg-[#4a2030] text-[#7B1B38] dark:text-[#e8637f] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#7B1B38] dark:text-[#f8d7df] mb-3"><T k="home.scholarshipGuidance" /></h3>
              <p className="text-[#2B0510]/80 dark:text-[#f5e8d0]/80 font-medium text-sm leading-relaxed">
                <T k="home.scholarshipGuidanceDescription" />
              </p>
            </div>

            <div className="bg-[#FFFDF9] dark:bg-[#2b1118] rounded-2xl border border-[#F1E2D9] dark:border-[#4a2030] p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#FFE5B4]/50 dark:bg-[#4a2030] text-[#7B1B38] dark:text-[#e8637f] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#7B1B38] dark:text-[#f8d7df] mb-3"><T k="home.studyAbroad" /></h3>
              <p className="text-[#2B0510]/80 dark:text-[#f5e8d0]/80 font-medium text-sm leading-relaxed">
                <T k="home.studyAbroadDescription" />
              </p>
            </div>

            <div className="bg-[#FFFDF9] dark:bg-[#2b1118] rounded-2xl border border-[#F1E2D9] dark:border-[#4a2030] p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#FFE5B4]/50 dark:bg-[#4a2030] text-[#7B1B38] dark:text-[#e8637f] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xs">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#7B1B38] dark:text-[#f8d7df] mb-3"><T k="home.nonProfit" /></h3>
              <p className="text-[#2B0510]/80 dark:text-[#f5e8d0]/80 font-medium text-sm leading-relaxed">
                <T k="home.nonProfitDescription" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Scholarships Section */}
      <div className="py-16 sm:py-24 bg-linear-to-b from-[#FFFDF9] to-[#FFF9F0] dark:from-[#1a0a10] dark:to-[#220d15]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B1B38]/60 dark:text-[#e8a0b0]/60 font-mono"><T k="home.scholarshipsAndDrawings" /></span>
              <h2 className="text-3xl font-extrabold text-[#7B1B38] dark:text-[#f8d7df] tracking-tight"><T k="home.featuredScholarships" /></h2>
            </div>
            <Link
              href="/scholarships"
              className="inline-flex items-center gap-1 text-sm font-black text-[#7B1B38] dark:text-[#e8637f] hover:text-[#5A1127] dark:hover:text-[#f8d7df] transition-all hover:translate-x-1"
            >
              <T k="home.viewAllScholarships" /> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#2b1118] rounded-2xl border border-[#F1E2D9] dark:border-[#4a2030] p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFE5B4]/50 dark:bg-[#4a2030] text-[#7B1B38] dark:text-[#e8637f] text-[10px] font-black uppercase tracking-wider">
                      <LocaleText tr={item.badgeTr} en={item.badgeEn} />
                    </span>
                    <span className="text-[10px] text-[#7A696C] dark:text-[#c4a08a] font-semibold"><LocaleText tr={item.locationTr} en={item.locationEn} /></span>
                  </div>

                  <h3 className="text-lg font-bold text-[#2B0510] dark:text-[#f5e8d0] leading-snug">{item.name}</h3>

                  <p className="text-xs font-medium text-[#2B0510]/80 dark:text-[#f5e8d0]/80 leading-relaxed line-clamp-3"><LocaleText tr={item.descTr} en={item.descEn} /></p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F1E2D9]/60 dark:border-[#4a2030]/60 flex items-center justify-between">
                  <span className="inline-flex items-center text-xs font-bold text-[#7B1B38] dark:text-[#f8d7df] bg-[#FFE5B4]/25 dark:bg-[#4a2030] px-2 py-1 rounded-lg">
                    <DollarSign className="w-3.5 h-3.5" /> <LocaleText tr={item.supportShortTr} en={item.supportShortEn} />
                  </span>
                  <Link
                    href={`/scholarships?search=${encodeURIComponent(item.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#7B1B38] dark:text-[#e8637f] hover:text-[#5A1127] dark:hover:text-[#f8d7df] group"
                  >
                    <T k="home.details" /> <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section Teaser */}
      <div className="py-16 sm:py-24 bg-white dark:bg-[#1a0a10] border-t border-[#F1E2D9]/40 dark:border-[#4a2030]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-[#7B1B38] dark:text-[#f8d7df] tracking-tight"><T k="home.whoWeAre" /></h2>
            <p className="text-[#2B0510]/85 dark:text-[#f5e8d0]/85 font-medium leading-relaxed">
              <T k="home.aboutDescription" />
            </p>
            <p className="text-sm text-[#2B0510]/70 dark:text-[#f5e8d0]/70 italic border-l-4 border-[#FFE5B4] dark:border-[#4a2030] pl-4 leading-relaxed">
              &quot;<T k="home.aboutQuote" />&quot;
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="px-6 py-3 bg-[#FFE5B4] dark:bg-[#4a2030] hover:bg-[#FFD48F] dark:hover:bg-[#5a283b] text-[#7B1B38] dark:text-[#f8d7df] font-bold rounded-xl transition-all shadow-xs inline-flex items-center gap-2"
              >
                <T k="home.learnMore" /> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-linear-to-tr from-[#7B1B38] to-[#4A0E21] rounded-3xl p-8 sm:p-12 text-[#FFFDF9] shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,229,180,0.15),transparent_50%)]"></div>
            <h3 className="text-2xl font-extrabold relative z-10"><T k="home.joinUs" /></h3>
            <p className="text-sm text-white/80 leading-relaxed relative z-10 font-medium">
              <T k="home.joinDescription" />
            </p>
            <div className="pt-2 relative z-10">
              <Link
                href="/auth/sign-up"
                className="px-6 py-3 bg-white text-[#7B1B38] font-bold rounded-xl transition-all shadow-md hover:bg-white/90 inline-block text-center w-full"
              >
                <T k="home.joinFree" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
