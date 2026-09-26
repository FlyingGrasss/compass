"use client"

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-[#FFFDF9] text-[#2B0510]">
        <main className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-lg text-center space-y-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7B1B38]">YouthCompass</p>
            <h1 className="text-3xl font-black">Beklenmeyen bir hata oluştu</h1>
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-xl bg-[#7B1B38] px-6 py-3 font-bold text-white hover:bg-[#5A1127] transition-colors"
            >
              Tekrar dene
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
