// components/Footer.tsx

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#FFE5B4]/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <h3 className="text-xl font-black text-[#7B1B38]">Compass</h3>
            <p className="text-sm text-[#2B0510]/70 leading-relaxed">
              Türkiye'deki ve dünyadaki gençler için bağımsız, kâr amacı gütmeyen eğitim ve fırsat pusulası.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#7B1B38] mb-4">Fırsatlar</h4>
            <ul className="space-y-2.5 text-sm text-[#2B0510]/85 font-medium">
              <li>
                <Link href="/activities" className="hover:text-[#7B1B38] transition-colors cursor-pointer">
                  Tüm Etkinlikler
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-[#7B1B38] transition-colors cursor-pointer">
                  Burs Fırsatları (New)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#7B1B38] mb-4">Kurumsal</h4>
            <ul className="space-y-2.5 text-sm text-[#2B0510]/85 font-medium">
              <li>
                <Link href="/about" className="hover:text-[#7B1B38] transition-colors cursor-pointer">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#7B1B38] transition-colors cursor-pointer">
                  Ana Sayfa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#7B1B38] mb-4 font-mono text-xs uppercase tracking-wider">Yaş Aralığı</h4>
            <p className="text-sm text-[#2B0510]/85 leading-relaxed font-semibold">
              13 - 20 yaş arasındaki tüm gençlere hitap eden fırsatlar.
            </p>
          </div>

        </div>

        <div className="border-t border-[#F1E2D9] pt-8">
          <p className="text-center text-xs text-[#2B0510]/60 font-medium">
            © 2026 Compass. Tüm hakları saklıdır. Gençlik için bir pusula.
          </p>
        </div>
      </div>
    </footer>
  )
}