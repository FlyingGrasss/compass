// app/about/page.tsx

import Link from "next/link"
import Image from "next/image"
import { BookOpen, GraduationCap, Target, Heart } from "lucide-react"
import { LocaleText, T } from "@/lib/i18n"

export const metadata = {
  title: "Hakkımızda | YouthCompass",
  description: "YouthCompass, 13-20 yaş arasındaki gençlere yurt dışında eğitim, staj ve gönüllülük fırsatlarında yol gösteren ücretsiz bir rehberdir.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFFDF9] to-[#FFF5E6] py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Hero Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex p-3 rounded-full bg-[#FFE5B4] text-[#7B1B38] mb-2 animate-bounce">
            <Image src="/logo.svg" alt="YouthCompass" width={32} height={32} className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#7B1B38]">
            <T k="about.title" />
          </h1>
          <p className="text-lg sm:text-xl text-[#7B1B38]/80 font-medium">
            <T k="about.subtitle" />
          </p>
          <div className="w-24 h-1 bg-[#7B1B38] mx-auto rounded-full mt-4"></div>
        </div>

        {/* Double Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Biz Kimiz? */}
          <div className="bg-white rounded-2xl border border-[#F1E2D9] shadow-xl p-8 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FFE5B4] text-[#7B1B38] rounded-xl">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#7B1B38]"><T k="about.whoTitle" /></h2>
              </div>
              
              <div className="space-y-4 text-justify">
                <p className="text-[#2B0510]/95 leading-relaxed font-medium">
                  <LocaleText tr="YouthCompass, 13-20 yaş arasındaki gençlere yurt dışında okuma, staj programları ve gönüllülük projelerine katılma gibi konularda rehber olmak için tasarlanmıştır. Kuruluş amacı, başta Türkiye olmak üzere tüm gençlere okul ve iş hayatında bir pusula görevi görmek ve gençlerin kendilerini bulma yolculuğuna yardımcı olmaktır." en="YouthCompass is designed to guide young people aged 13–20 in studying abroad, internships, and volunteering projects. Its purpose is to act as a compass for young people, starting in Turkey, throughout their education and working lives, and to support them on their journey of self-discovery." />
                </p>
                <p className="text-[#2B0510]/80 leading-relaxed italic border-l-4 border-[#FFE5B4] pl-4 text-sm">
                  <LocaleText tr="YouthCompass, 13-20 yaş arasındaki gençlere yurt dışında okuma, staj programları ve gönüllülük projelerine katılma gibi konularda rehber olmak için tasarlanmıştır. Kuruluş amacı, başta Türkiye olmak üzere tüm gençlere okul ve iş hayatında bir pusula görevi görmek ve gençlerin kendilerini bulma yolculuğuna yardımcı olmaktır." en="YouthCompass is designed to guide young people aged 13–20 in studying abroad, internships, and volunteering projects. Its purpose is to act as a compass for young people, starting in Turkey, throughout their education and working lives, and to support them on their journey of self-discovery." />
                </p>
                <p className="text-[#2B0510]/95 leading-relaxed font-medium">
                  <LocaleText tr="Yüzlerce fırsatı bir web sitesinde toplayan YouthCompass, bunu yaparken kâr amacı gütmez. İlham verici yolculuğumuza siz de ücretsiz bir şekilde üye olarak katılabilirsiniz." en="By bringing hundreds of opportunities together in one website, YouthCompass remains non-profit. You can join our inspiring journey by registering for free." />
                </p>
                <p className="text-[#2B0510]/80 leading-relaxed italic border-l-4 border-[#FFE5B4] pl-4 text-sm">
                  <LocaleText tr="Yüzlerce fırsatı bir web sitesinde toplayan YouthCompass, bunu yaparken kâr amacı gütmez. İlham verici yolculuğumuza siz de ücretsiz bir şekilde üye olarak katılabilirsiniz." en="By bringing hundreds of opportunities together in one website, YouthCompass remains non-profit. You can join our inspiring journey by registering for free." />
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F1E2D9]/60 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B1B38]/60"><T k="about.shapeFuture" /></span>
              <Heart className="w-5 h-5 text-[#7B1B38] fill-[#7B1B38]/10" />
            </div>
          </div>

          {/* Card 2: Yurt Dışında Okuma */}
          <div className="bg-white rounded-2xl border border-[#F1E2D9] shadow-xl p-8 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FFE5B4] text-[#7B1B38] rounded-xl">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#7B1B38]"><T k="about.abroadTitle" /></h2>
              </div>
              
              <div className="space-y-4 text-justify">
                <p className="text-[#2B0510]/95 leading-relaxed font-medium">
                  <LocaleText tr="Her yıl Türkiye'den binlerce genç yurt dışına üniversite okumaya gidiyor. Yüz binlercesi ise böyle bir seçenekleri olduğundan bile habersiz. YouthCompass, bu fırsat eşitsizliğini azaltmak için var." en="Every year, thousands of young people from Turkey go abroad for university. Hundreds of thousands more are not even aware that this option exists. YouthCompass exists to help reduce this inequality of opportunity." />
                </p>
                <p className="text-[#2B0510]/80 leading-relaxed italic border-l-4 border-[#FFE5B4] pl-4 text-sm">
                  <LocaleText tr="Her yıl Türkiye'den binlerce genç yurt dışına üniversite okumaya gidiyor. Yüz binlercesi ise böyle bir seçenekleri olduğundan bile habersiz. YouthCompass, bu fırsat eşitsizliğini azaltmak için var." en="Every year, thousands of young people from Turkey go abroad for university. Hundreds of thousands more are not even aware that this option exists. YouthCompass exists to help reduce this inequality of opportunity." />
                </p>
                <p className="text-[#2B0510]/95 leading-relaxed font-medium">
                  <LocaleText tr="Yurt dışında okumayı hedefleyen ve yolculuğunun daha başında olan öğrencilerden, yurt dışında okuyabileceğini yeni öğrenen öğrencilere kadar tüm hevesli gençlere yol göstermek için varız. Bu serüveni gençler için daha erişilebilir ve kolay hale getirmeyi amaçlıyoruz." en="We are here to guide every enthusiastic young person, from students just beginning their journey to those who have only recently discovered that studying abroad is possible. We aim to make this adventure more accessible and easier for young people." />
                </p>
                <p className="text-[#2B0510]/80 leading-relaxed italic border-l-4 border-[#FFE5B4] pl-4 text-sm">
                  <LocaleText tr="Yurt dışında okumayı hedefleyen ve yolculuğunun daha başında olan öğrencilerden, yurt dışında okuyabileceğini yeni öğrenen öğrencilere kadar tüm hevesli gençlere yol göstermek için varız. Bu serüveni gençler için daha erişilebilir ve kolay hale getirmeyi amaçlıyoruz." en="We are here to guide every enthusiastic young person, from students just beginning their journey to those who have only recently discovered that studying abroad is possible. We aim to make this adventure more accessible and easier for young people." />
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F1E2D9]/60 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B1B38]/60"><T k="about.crossBorders" /></span>
              <BookOpen className="w-5 h-5 text-[#7B1B38]" />
            </div>
          </div>

        </div>

        {/* Interactive CTA Section */}
        <div className="bg-linear-to-r from-[#7B1B38] to-[#5A1127] rounded-3xl p-8 sm:p-12 text-center text-[#FFFDF9] shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,229,180,0.15),transparent_50%)]"></div>
          
          <h3 className="text-3xl font-extrabold tracking-tight relative z-10">
            <T k="about.ctaTitle" />
          </h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto relative z-10">
            <LocaleText tr="YouthCompass tamamen ücretsiz ve kâr amacı gütmeyen bir platformdur. Kaydolarak yüzlerce eğitim, staj, burs ve gönüllülük projesine anında erişebilirsiniz." en="YouthCompass is a completely free, non-profit platform. Register to access hundreds of education, internship, scholarship, and volunteering opportunities." />
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 relative z-10">
            <Link
              href="/auth/sign-up"
              className="px-8 py-3 bg-[#FFE5B4] hover:bg-[#FFD48F] text-[#7B1B38] font-bold rounded-xl transition-all shadow-md transform hover:scale-105 duration-200"
            >
              <T k="home.joinFree" />
            </Link>
            <Link
              href="/activities"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-[#FFFDF9] border border-white/20 font-bold rounded-xl transition-all duration-200"
            >
              <T k="home.explore" />
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
