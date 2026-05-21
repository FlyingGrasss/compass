// app/about/page.tsx

import Link from "next/link"
import { Compass, BookOpen, Compass as CompassIcon, GraduationCap, Target, Heart } from "lucide-react"

export const metadata = {
  title: "Hakkımızda | Compass",
  description: "Compass, 13-20 yaş arasındaki gençlere yurt dışında eğitim, staj ve gönüllülük fırsatlarında yol gösteren ücretsiz bir rehberdir.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFFDF9] to-[#FFF5E6] py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Hero Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex p-3 rounded-full bg-[#FFE5B4] text-[#7B1B38] mb-2 animate-bounce">
            <CompassIcon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#7B1B38]">
            Pusulanız Compass
          </h1>
          <p className="text-lg sm:text-xl text-[#7B1B38]/80 font-medium">
            Gençlerin kendi yolculuklarını keşfetmeleri ve geleceğe güvenle adım atmaları için tasarlanmış bağımsız bir rehber.
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
                <h2 className="text-2xl font-bold text-[#7B1B38]">Biz kimiz? / Who are we?</h2>
              </div>
              
              <div className="space-y-4 text-justify">
                <p className="text-[#2B0510]/95 leading-relaxed font-medium">
                  Compass 13-20 yaş arasındaki gençlere yurt dışında okuma, staj programları ve gönüllülük projelerine katılma gibi konularda rehber olmak için tasarlanmıştır. Compass’in kurulma amacı başta Türkiye olmak üzere tüm gençlere okul ve iş hayatında bir pusula görevi görmek ve gençlerin kendilerini bulma yolculuğuna yardımcı olmaktır.
                </p>
                <p className="text-[#2B0510]/80 leading-relaxed italic border-l-4 border-[#FFE5B4] pl-4 text-sm">
                  Compass is designed to guide youth aged 13-20 in areas such as studying abroad, internship programs, and participating in voluntary projects. The founding purpose of Compass is to act as a compass for all young people, starting with Turkey, in their school and work lives, and to help them on their journey to self-discovery.
                </p>
                <p className="text-[#2B0510]/95 leading-relaxed font-medium">
                  Yüzlerce fırsatı bir websitede toplayan Compass, bunu yaparken bir kar amacı gütmez. İlham verici yolculuğumuza siz de ücretsiz bir şekilde üye olarak katılabilirsiniz.
                </p>
                <p className="text-[#2B0510]/80 leading-relaxed italic border-l-4 border-[#FFE5B4] pl-4 text-sm">
                  Gathering hundreds of opportunities on one website, Compass does not pursue any profit. You can join our inspiring journey by registering for free.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F1E2D9]/60 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B1B38]/60">Geleceğini Şekillendir</span>
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
                <h2 className="text-2xl font-bold text-[#7B1B38]">Yurt Dışında Okuma / Studying Abroad</h2>
              </div>
              
              <div className="space-y-4 text-justify">
                <p className="text-[#2B0510]/95 leading-relaxed font-medium">
                  Her yıl Türkiye’den binlerce genç yurt dışına üniversite okumaya gidiyor. Yüz binlercesi ise böyle bir seçenekleri olduklarından bile habersiz. Bu fırsat eşitsizliğini engellemek için Compass var.
                </p>
                <p className="text-[#2B0510]/80 leading-relaxed italic border-l-4 border-[#FFE5B4] pl-4 text-sm">
                  Every year, thousands of young people from Turkey go abroad for university education. Hundreds of thousands, however, are not even aware that they have such an option. Compass exists to prevent this inequality of opportunity.
                </p>
                <p className="text-[#2B0510]/95 leading-relaxed font-medium">
                  Yurt dışında okumayı hedefleyen ve yolculuğunun daha çok başında olan öğrencilerden, yurt dışında okuyabileceğini yeni öğrenen öğrencilere kadar hevesli bütün gençlere yol göstermek için Compass var. Compass bu serüveni gençler için daha erişilebilir ve kolay hale getirmeyi amaçlıyor.
                </p>
                <p className="text-[#2B0510]/80 leading-relaxed italic border-l-4 border-[#FFE5B4] pl-4 text-sm">
                  Compass exists to guide all enthusiastic young people, from students who aim to study abroad and are at the very beginning of their journey, to students who have just learned that they can study abroad. Compass aims to make this adventure more accessible and easy for youth.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F1E2D9]/60 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B1B38]/60">Sınırları Aş</span>
              <BookOpen className="w-5 h-5 text-[#7B1B38]" />
            </div>
          </div>

        </div>

        {/* Interactive CTA Section */}
        <div className="bg-linear-to-r from-[#7B1B38] to-[#5A1127] rounded-3xl p-8 sm:p-12 text-center text-[#FFFDF9] shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,229,180,0.15),transparent_50%)]"></div>
          
          <h3 className="text-3xl font-extrabold tracking-tight relative z-10">
            İlham Verici Yolculuğumuza Katılın!
          </h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto relative z-10">
            Compass tamamen ücretsiz ve kar amacı gütmeyen bir platformdur. Kaydolarak yüzlerce eğitim, staj, burs ve gönüllülük projesine anında erişebilirsiniz.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 relative z-10">
            <Link
              href="/auth/sign-up"
              className="px-8 py-3 bg-[#FFE5B4] hover:bg-[#FFD48F] text-[#7B1B38] font-bold rounded-xl transition-all shadow-md transform hover:scale-105 duration-200"
            >
              Ücretsiz Üye Ol
            </Link>
            <Link
              href="/activities"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-[#FFFDF9] border border-white/20 font-bold rounded-xl transition-all duration-200"
            >
              Fırsatları Keşfet
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
