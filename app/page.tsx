// app/page.tsx

import Link from "next/link"
import { Briefcase, BookOpen, Users } from "lucide-react"
import { auth } from "@/auth"
import { headers } from "next/headers"

export default async function Home() {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-[#242F50] mb-6">
              Staj ve Fırsatlar İçin
              <br />
              Doğru Adres
            </h1>
            <p className="text-xl text-[#242F50]/80 mb-8">
              Türkiye'deki lise ve üniversite öğrencileri için özel staj ve
              gelişim fırsatları platformu
            </p>
            <div className="flex gap-4 justify-center">
              {session ? (
                <Link
                  href="/profile"
                  className="px-8 py-3 bg-[#2458B4] hover:bg-[#1d4a95] text-white font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Profil
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/sign-up"
                    className="px-8 py-3 bg-[#2458B4] hover:bg-[#1d4a95] text-white font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Hemen Başla
                  </Link>
                  <Link
                    href="/auth/sign-in"
                    className="px-8 py-3 bg-white hover:bg-white/90 text-[#2458B4] font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Giriş Yap
                  </Link>
                </>
              )
              }
              
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#62ABEA] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#242F50] mb-2">
              Staj Fırsatları
            </h3>
            <p className="text-[#242F50]/70">
              Binlerce staj ilanına kolayca ulaşın
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#62ABEA] rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#242F50] mb-2">
              Eğitim Programları
            </h3>
            <p className="text-[#242F50]/70">
              Kendinizi geliştirin, yeni beceriler kazanın
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#62ABEA] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#242F50] mb-2">
              Topluluk
            </h3>
            <p className="text-[#242F50]/70">
              Deneyimlerinizi paylaşın, networking yapın
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}