// components/Footer.tsx

import Link from "next/link"
import { T } from "@/lib/i18n"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#FFE5B4]/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <h3 className="text-xl font-black text-[#7B1B38]">YouthCompass</h3>
            <p className="text-sm text-[#2B0510]/70 leading-relaxed">
              <T k="footer.description" />
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#7B1B38] mb-4"><T k="footer.opportunities" /></h4>
            <ul className="space-y-2.5 text-sm text-[#2B0510]/85 font-medium">
              <li>
                <Link href="/activities" className="hover:text-[#7B1B38] transition-colors cursor-pointer">
                  <T k="footer.allActivities" />
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-[#7B1B38] transition-colors cursor-pointer">
                  <T k="footer.scholarshipOpportunities" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#7B1B38] mb-4"><T k="footer.corporate" /></h4>
            <ul className="space-y-2.5 text-sm text-[#2B0510]/85 font-medium">
              <li>
                <Link href="/about" className="hover:text-[#7B1B38] transition-colors cursor-pointer">
                  <T k="nav.about" />
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#7B1B38] transition-colors cursor-pointer">
                  <T k="footer.home" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#7B1B38] mb-4 font-mono text-xs uppercase tracking-wider"><T k="footer.ageRange" /></h4>
            <p className="text-sm text-[#2B0510]/85 leading-relaxed font-semibold">
              <T k="footer.ageDescription" />
            </p>
          </div>

        </div>

        <div className="border-t border-[#F1E2D9] pt-8">
          <p className="text-center text-xs text-[#2B0510]/60 font-medium">
            <T k="footer.copyright" />
          </p>
        </div>
      </div>
    </footer>
  )
}
