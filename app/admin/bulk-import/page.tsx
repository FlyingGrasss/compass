// app/admin/bulk-import/page.tsx

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Sparkles, 
  Upload, 
  FileCode, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  DollarSign,
  Activity as ActivityIcon,
  CheckCircle2,
  HelpCircle
} from "lucide-react"
import Link from "next/link"

interface ParsedActivity {
  title?: string
  name?: string
  description?: string
  category?: string
  gradeLevels?: number[]
  minAge?: number | null
  maxAge?: number | null
  financialSupport?: string
  entryPrice?: number
  scholarshipAmount?: number | string
  amountCurrency?: string
  isPrestigious?: boolean
  season?: string
  duration?: string
  deadline?: string
  location?: string
  requirements?: string[] | string
  link?: string
  website?: string
  imageUrl?: string
}

export default function BulkImportPage() {
  const router = useRouter()
  const [jsonInput, setJsonInput] = useState("")
  const [existingSlugs, setExistingSlugs] = useState<string[]>([])
  const [parsedData, setParsedData] = useState<ParsedActivity[]>([])
  const [jsonError, setJsonError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error"
    message: string
  }>({
    type: "idle",
    message: "",
  })

  const systemPrompt = `Sen bir veri yapılandırma asistanısın. Sana ham metin, linkler veya belgeler şeklinde öğrenci etkinlikleri (kulüpler, yarışmalar, burslar, yaz programları vb.) hakkında bilgi vereceğim.

Mevcut slug'lar (AI eşleştirme için, buradakilerden duplike oluşturmaya çalışma (DO NOT CREATE DUPLICATES)): ${JSON.stringify(existingSlugs)}

Görevin bu bilgileri aşağıdaki JSON dizisi şemasına birebir uygun şekilde ayrıştırmaktır.

ÇIKTI KURALLARI (KESİNLİKLE UYULMALIDIR):
1. Çıktını MUTLAKA bir \`\`\`json kod bloğu içinde ver. Sadece ham JSON dizisini içeren tek bir kod bloğu olsun, başka metin ekleme.
2. "link" alanına YALNIZCA düz URL yaz (örn. https://example.com). Asla [metin](url) şeklinde markdown link formatı kullanma.
3. JSON yapısı geçerli olmalıdır — sistemimiz JSON'u otomatik doğrular ve hata bulursa senden tekrar denemeni ister.
4. Alanlar eksikse mantıksal çıkarım yap ya da null bırak.

Açıklama (description) alanını şu formatta yaz:
- Önce Türkçe tam açıklama
- Ardından boş satır ve "[English Summary]" başlığıyla İngilizce kısa özet

financialSupport skalası:
- "A+" → Tam burs (eğitim + yaşam giderleri)
- "A"  → Çoğunlukla burslu / yüksek ödüllü
- "B"  → Kısmen burslu / orta ödüllü
- "C"  → Küçük ödül / sembolik destek
- "D"  → Destek yok

Şema:
[
  {
    "title": "Etkinlik Adı",
    "description": "Türkçe açıklama...\n\n[English Summary]\nEnglish summary...",
    "category": "COMPETITION" | "SCHOLARSHIP" | "VOLUNTEER" | "SUMMER_PROGRAM" | "SCHOOL_PROGRAM" | "PLATFORM",
    "gradeLevels": [9, 10, 11, 12],
    "minAge": 13,
    "maxAge": 20,
    "financialSupport": "A+" | "A" | "B" | "C" | "D",
    "entryPrice": 0,
    "scholarshipAmount": "Tam burs + yasam gideri",
    "amountCurrency": "USD" | "TRY" | "EUR",
    "isPrestigious": true | false,
    "isClosed": false,
    "season": "SUMMER" | "WINTER" | "FALL" | "SPRING" | "YEAR_ROUND",
    "duration": "Yıllık / Dönemsel",
    "deadline": "YYYY-MM-DD",
    "location": "Küresel (Global)",
    "requirements": "• Şart 1\n• Şart 2\n• Şart 3",
    "link": "https://example.com"
  }
]

Gerçek örnek (bu formatı birebir taklit et):
\`\`\`json
[
  {
    "title": "Ayn Rand Essay Contests",
    "description": "Ayn Rand'in romanları (Anthem, The Fountainhead, Atlas Shrugged) üzerine kurulu, öğrencilerin felsefi ve psikolojik çözümleme ile argüman geliştirme yeteneklerini sınayan küresel bir kompozisyon yarışmasıdır. Makaleler İngilizce yazılmalı ve belirli kelime sınırlarına (800-1.600 kelime) uymalıdır.\n\n[English Summary]\nAn annual global essay competition based on Ayn Rand's novels that evaluates students' analytical writing, argumentation, and grasp of philosophical concepts.",
    "category": "SCHOLARSHIP",
    "gradeLevels": [8, 9, 10, 11, 12],
    "financialSupport": "A",
    "entryPrice": 0,
    "scholarshipAmount": "$25,000",
    "amountCurrency": "USD",
    "isPrestigious": true,
    "isClosed": false,
    "season": "YEAR_ROUND",
    "duration": "Yıllık / Dönemsel",
    "deadline": "2026-11-06",
    "location": "Küresel (Global)",
    "requirements": "• Anthem romanı için: 8-12. sınıf öğrencileri (13-18 yaş)\n• The Fountainhead için: 11-12. sınıf öğrencileri\n• Atlas Shrugged için: 12. sınıf, lisans ve lisansüstü öğrencileri\n• İngilizce olarak 800-1.600 kelime aralığında özgün makale hazırlamak",
    "link": "https://aynrand.org/students/essay-contests/"
  }
]
\`\`\`

İşte yapılandırmanı istediğim ham veri:
[VERİYİ BURAYA YAPIŞTIR]`

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(systemPrompt)
      setCopied(true)
      toast.success("Sistem istemi panoya kopyalandı!")
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      toast.error("Panoya kopyalanamadı.")
    }
  }

  const handleCopySlugs = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(existingSlugs));
      toast.success("Slug'lar panoya kopyalandı!");
    } catch (err) {
      toast.error("Slug'lar kopyalanamadı.");
    }
  };

  // Strip markdown link formatting [text](url) -> url
  const sanitizeMarkdownLinks = (str: string): string => {
    if (!str) return str
    return str.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$2')
  }

  // Sanitize all string/URL fields in a parsed activity
  const sanitizeActivity = (item: ParsedActivity): ParsedActivity => {
    return {
      ...item,
      link: item.link ? sanitizeMarkdownLinks(item.link) : item.link,
      website: item.website ? sanitizeMarkdownLinks(item.website) : item.website,
    }
  }

  // Fetch existing slugs for copy button
  useEffect(() => {
    const fetchSlugs = async () => {
      try {
        const res = await fetch("/api/admin/activities");
        const data = await res.json();
        const slugs = data.map((a: any) => a.slug).filter(Boolean);
        setExistingSlugs(slugs);
      } catch (e) {
        console.error("Slug fetch error", e);
      }
    };
    fetchSlugs();
  }, []);

  // Real-time JSON validation and parsing
  useEffect(() => {
    if (!jsonInput.trim()) {
      setParsedData([])
      setJsonError(null)
      return
    }

    try {
      // Remove possible markdown code block wraps
      let cleanInput = jsonInput.trim()
      const codeBlockMatch = cleanInput.match(/^```(?:json)?\s*([\s\S]*?)```\s*$/)
      if (codeBlockMatch) {
        cleanInput = codeBlockMatch[1].trim()
      }

      const parsed = JSON.parse(cleanInput)
      if (!Array.isArray(parsed)) {
        setJsonError("Veri kökü bir JSON dizisi (array) olmalıdır.")
        setParsedData([])
      } else {
        setJsonError(null)
        setParsedData(parsed.map(sanitizeActivity))
      }
    } catch (err: any) {
      setJsonError(err.message || "Geçersiz JSON formatı.")
      setParsedData([])
    }
  }, [jsonInput])

  const handleImport = async () => {
    if (parsedData.length === 0) {
      toast.error("Lütfen önce geçerli bir JSON verisi girin.")
      return
    }

    try {
      setStatus({ type: "loading", message: "Veriler işleniyor ve veritabanı ile senkronize ediliyor..." })
      
      const response = await fetch("/api/admin/bulk-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activities: parsedData }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Veritabanı senkronizasyonu sırasında hata oluştu.")
      }

      setStatus({ 
        type: "success", 
        message: `Başarıyla ${result.count} etkinlik veritabanına aktarıldı!` 
      })
      toast.success(`${result.count} etkinlik başarıyla aktarıldı!`)
      setJsonInput("")
      
      // Refresh page data and redirect to activities listing after short delay
      setTimeout(() => {
        router.push("/admin/bulk-import")
        router.refresh()
      }, 2000)
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Senkronizasyon başarısız oldu." })
      toast.error(err.message || "İçe aktarım sırasında hata oluştu.")
    }
  }

  const categoryColors: Record<string, string> = {
    COMPETITION: "bg-blue-100 text-blue-800 border-blue-200",
    VOLUNTEER: "bg-green-100 text-green-800 border-green-200",
    SUMMER_PROGRAM: "bg-purple-100 text-purple-800 border-purple-200",
    SCHOOL_PROGRAM: "bg-amber-100 text-amber-800 border-amber-200",
    SCHOLARSHIP: "bg-rose-100 text-rose-800 border-rose-200",
    PLATFORM: "bg-teal-100 text-teal-800 border-teal-200",
  }

  const categoryLabels: Record<string, string> = {
    COMPETITION: "Yarışma",
    VOLUNTEER: "Gönüllülük",
    SUMMER_PROGRAM: "Yaz Programı",
    SCHOOL_PROGRAM: "Okul Programı",
    SCHOLARSHIP: "Burs",
    PLATFORM: "Platform",
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#FFE5B4]/30 pb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-[#7B1B38] font-bold mb-1">
            <Link href="/admin" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Panele Dön
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold text-[#2B0510] tracking-tight">
            Toplu AI Etkinlik Yükleyici
          </h1>
          <p className="text-[#2B0510]/70 mt-1.5">
            Gemini tarafından üretilen JSON verilerini doğrudan veritabanına aktarın veya güncelleyin.
          </p>
        </div>
      </div>

      {/* Grid instructions and copy template */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Guide / Instructions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#F9EFE6] border border-[#FFE5B4] rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-[#2B0510] text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#7B1B38]" />
              Araştırma Ekibi Rehberi
            </h3>
            
            <ol className="list-decimal list-inside text-sm text-[#2B0510]/80 space-y-3.5">
              <li>
                Aşağıdaki butona basarak <strong className="text-[#7B1B38]">AI Sistem İstemini</strong> kopyalayın.
              </li>
              <li>
                Gemini (Flash yerine Pro daha iyi oluyo) (veya başka bir LLM) arayüzüne istemi yapıştırın.
              </li>
              <li>
                Hemen altına araştırdığınız etkinlik taslaklarını, ham metinleri veya linkleri ekleyin.
              </li>
              <li>
                AI'ın ürettiği temiz <strong className="font-mono bg-white/70 px-1 py-0.5 rounded border border-[#FFE5B4]">JSON</strong> dizisini kopyalayın.
              </li>
              <li>
                Sağdaki metin alanına yapıştırın ve verileri canlı olarak önizleyin.
              </li>
            </ol>

            <button
              onClick={handleCopyPrompt}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-bold rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-300" />
                  Kopyalandı!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Sistem İstemini Kopyala
                </>
              )}
            </button>
            <button
              onClick={handleCopySlugs}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-bold rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer mt-2"
            >
              <Copy className="w-5 h-5" />
              Slug'ları Kopyala
            </button>
          </div>

          {/* Quick tips */}
          <div className="bg-white rounded-2xl p-6 border border-[#2B0510]/10 shadow-xs space-y-3">
            <h4 className="font-bold text-[#2B0510] text-sm flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#7B1B38]" />
              Upsert Mantığı Nedir?
            </h4>
            <p className="text-xs text-[#2B0510]/70 leading-relaxed">
              Sistem etkinlikleri <strong className="text-[#7B1B38]">slug</strong> değerine göre eşleştirir. Eğer veritabanında aynı slug'a sahip bir etkinlik varsa onu <strong>günceller</strong> (update), yoksa <strong>yeni</strong> bir kayıt oluşturur (create). Bu sayede veri çoğaltma hatası olmadan güncellemeleri güvenle yapabilirsiniz.
            </p>
          </div>
        </div>

        {/* Input & JSON Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#2B0510]/10 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-base font-bold text-[#2B0510] flex items-center gap-2">
                <FileCode className="w-5 h-5 text-[#7B1B38]" />
                JSON Veri Alanı
              </label>
              
              {jsonInput.trim() && (
                <div className="flex items-center">
                  {jsonError ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                      <AlertCircle className="w-3.5 h-3.5" /> {jsonError}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full animate-pulse">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Geçerli JSON Dizisi ({parsedData.length} Etkinlik)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Prominent error retry banner */}
            {jsonInput.trim() && jsonError && (
              <div className="flex items-start gap-3 bg-red-50 border-2 border-red-300 rounded-xl px-4 py-3 animate-pulse">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-extrabold text-red-700">Geçersiz JSON — Gemini'ye geri dönüp tekrar dene!</p>
                  <p className="text-red-600 font-mono text-xs mt-1 break-all">{jsonError}</p>
                  <p className="text-red-500 text-xs mt-1">İpucu: Gemini'ye "JSON hatalı, düzelt ve tekrar ver" yaz.</p>
                </div>
              </div>
            )}

            <textarea
              className={`w-full h-96 p-4 font-mono text-xs border-2 rounded-xl focus:ring-2 focus:outline-none transition-all resize-y text-[#2B0510] ${
                jsonInput.trim() && jsonError
                  ? "border-red-300 bg-red-50/30 focus:ring-red-200 focus:border-red-400"
                  : "border-[#FFE5B4]/40 bg-[#F9EFE6]/10 focus:ring-[#7B1B38]/30 focus:border-[#7B1B38]"
              }`}
              placeholder={`\`\`\`json\n[\n  {\n    "title": "Jean Monnet Burs Programı",\n    "category": "SCHOLARSHIP",\n    "link": "https://jeanmonnet.org.tr/"\n  }\n]\n\`\`\``}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              disabled={status.type === "loading"}
            />

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleImport}
                disabled={status.type === "loading" || parsedData.length === 0}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:text-slate-500 disabled:scale-100 disabled:shadow-none cursor-pointer"
              >
                {status.type === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Veritabanı Senkronize Ediliyor...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Veritabanı Senkronizasyonunu Başlat
                  </>
                )}
              </button>

              {status.type !== "idle" && (
                <span className={`text-sm font-bold ${
                  status.type === "success" ? "text-green-600 animate-bounce" : 
                  status.type === "error" ? "text-red-600" : "text-[#7B1B38]"
                }`}>
                  {status.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Panel */}
      {parsedData.length > 0 && !jsonError && (
        <div className="bg-[#F9EFE6]/30 rounded-2xl p-6 border border-[#FFE5B4]/50 shadow-xs space-y-6">
          <div className="border-b border-[#FFE5B4]/50 pb-4">
            <h2 className="text-2xl font-extrabold text-[#2B0510] flex items-center gap-2">
              <ActivityIcon className="w-6 h-6 text-[#7B1B38]" />
              Yüklenecek Etkinliklerin Önizlemesi ({parsedData.length})
            </h2>
            <p className="text-sm text-[#2B0510]/70 mt-1">
              Veritabanına yazılacak verilerin canlı olarak çözümlenmiş önizlemesi. Lütfen onaylamadan önce inceleyin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parsedData.map((item, idx) => {
              const name = item.name || item.title || "İsimsiz Etkinlik"
              const category = item.category || "COMPETITION"
              const requirements = Array.isArray(item.requirements) 
                ? item.requirements 
                : item.requirements 
                  ? [item.requirements] 
                  : []

              return (
                <div 
                  key={idx}
                  className="bg-white border border-[#FFE5B4]/40 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${categoryColors[category] || "bg-slate-100 text-slate-800 border-slate-200"}`}>
                        {categoryLabels[category] || category}
                      </span>
                      {item.isPrestigious && (
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-[#7B1B38] text-white shadow-xs">
                          Prestijli
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-extrabold text-[#2B0510] text-base leading-snug line-clamp-1">
                        {name}
                      </h3>
                      {item.financialSupport && (
                        <p className="text-xs text-[#7B1B38] font-bold">
                          Destek Seviyesi: {item.financialSupport}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-[#2B0510]/70 leading-relaxed line-clamp-3">
                      {item.description || "Açıklama belirtilmemiş."}
                    </p>

                    {/* Meta info tags */}
                    <div className="flex flex-col gap-1.5 pt-1 border-t border-[#F9EFE6] text-[11px] text-[#2B0510]/75">
                      {item.deadline && (
                        <div className="flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#7B1B38]/70" />
                          <span>Son Tarih: {item.deadline}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#7B1B38]/70" />
                          <span>Konum: {item.location}</span>
                        </div>
                      )}
                      {(item.entryPrice !== undefined || item.scholarshipAmount !== undefined) && (
                        <div className="flex items-center gap-1.5 font-medium">
                          <DollarSign className="w-3.5 h-3.5 text-[#7B1B38]/70" />
                          <span>
                            {item.entryPrice !== undefined && `Ücret: ${item.entryPrice === 0 ? "Ücretsiz" : item.entryPrice}`}
                            {item.scholarshipAmount !== undefined && ` · Burs: ${item.scholarshipAmount}`}
                            {` (${item.amountCurrency || "TRY"})`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Requirements preview */}
                  <div className="bg-[#F9EFE6]/30 px-5 py-3 border-t border-[#FFE5B4]/30">
                    <div className="text-[11px] font-bold text-[#2B0510] mb-1">
                      Kriterler ({requirements.length}):
                    </div>
                    {requirements.length > 0 ? (
                      <ul className="list-disc list-inside text-[10px] text-[#2B0510]/70 space-y-0.5 truncate">
                        {requirements.slice(0, 2).map((req, rIdx) => (
                          <li key={rIdx} className="truncate">{req}</li>
                        ))}
                        {requirements.length > 2 && (
                          <li className="list-none italic font-bold">+{requirements.length - 2} daha fazlası</li>
                        )}
                      </ul>
                    ) : (
                      <span className="text-[10px] text-[#2B0510]/40 italic">Kriter girilmedi</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
