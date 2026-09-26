"use client"

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-[#FFFDF9]">
      <div className="max-w-lg text-center space-y-5">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7B1B38]">YouthCompass</p>
        <h1 className="text-3xl sm:text-4xl font-black text-[#2B0510]">Bir şeyler ters gitti</h1>
        <p className="text-[#2B0510]/70">Sayfa yüklenemedi. Tekrar deneyebilirsiniz.</p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-[#7B1B38] px-6 py-3 font-bold text-white hover:bg-[#5A1127] transition-colors"
        >
          Tekrar dene
        </button>
      </div>
    </main>
  )
}
