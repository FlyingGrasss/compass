// components/Footer.tsx

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#242F50]/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-[#2458B4] mb-4">Compass</h3>
            <p className="text-sm text-[#242F50]/70">
              Türkiye'deki öğrenciler için staj ve fırsat platformu
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#242F50] mb-4">Kategoriler</h4>
            <ul className="space-y-2 text-sm text-[#242F50]/70">
              <li>
                <Link href="/activities" className="hover:text-[#2458B4] cursor-pointer">
                  Tüm Etkinlikler
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-[#2458B4] cursor-pointer">
                  Yarışmalar
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-[#2458B4] cursor-pointer">
                  Staj Fırsatları
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#242F50] mb-4">Hakkımızda</h4>
            <ul className="space-y-2 text-sm text-[#242F50]/70">
              <li>
                <Link href="/" className="hover:text-[#2458B4] cursor-pointer">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-[#2458B4] cursor-pointer">
                  Profil
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#242F50]/10 pt-8">
          <p className="text-center text-sm text-[#242F50]/70">
            © 2026 Compass. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}