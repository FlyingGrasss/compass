// app/admin/activities/[slug]/edit/page.tsx

"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import { ActivityCategory, ActivitySeason, Activity } from "@prisma/client"

export default function EditActivityPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "COMPETITION" as ActivityCategory,
    gradeLevels: [] as number[],
    financialSupport: "B",
    entryPrice: "",
    scholarshipAmount: "",
    amountCurrency: "TRY",
    isPrestigious: false,
    season: "YEAR_ROUND" as ActivitySeason,
    duration: "",
    deadline: "",
    location: "",
    requirements: "",
    website: "",
    imageUrl: "",
  })

  useEffect(() => {
    fetchActivity()
  }, [slug])

  const fetchActivity = async () => {
    try {
      const response = await fetch(`/api/admin/activities/${slug}`)
      if (!response.ok) throw new Error()

      const activity: Activity = await response.json()

      setFormData({
        name: activity.name,
        description: activity.description,
        category: activity.category,
        gradeLevels: activity.gradeLevels,
        financialSupport: activity.financialSupport,
        entryPrice:
          activity.entryPrice != null ? String(activity.entryPrice) : "",
        scholarshipAmount:
          activity.scholarshipAmount != null
            ? String(activity.scholarshipAmount)
            : "",
        amountCurrency: activity.amountCurrency || "TRY",
        isPrestigious: activity.isPrestigious,
        season: activity.season,
        duration: activity.duration,
        deadline: activity.deadline
          ? new Date(activity.deadline).toISOString().split("T")[0]
          : "",
        location: activity.location || "",
        requirements: activity.requirements || "",
        website: activity.website || "",
        imageUrl: activity.imageUrl || "",
      })
    } catch (error) {
      toast.error("Etkinlik yüklenemedi")
      router.push("/admin/activities")
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .replace(/İ/g, "i")
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const newSlug = generateSlug(formData.name)

      const response = await fetch(`/api/admin/activities/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          slug: newSlug,
          deadline: formData.deadline || null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      toast.success("Etkinlik güncellendi!")
      router.push("/admin/activities")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Etkinlik güncellenemedi"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleGradeLevel = (level: number) => {
    setFormData((prev) => ({
      ...prev,
      gradeLevels: prev.gradeLevels.includes(level)
        ? prev.gradeLevels.filter((l) => l !== level)
        : [...prev.gradeLevels, level].sort((a, b) => a - b),
    }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-[#2B0510]/70">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[#2B0510] mb-6">
        Etkinliği Düzenle
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
              Etkinlik Adı *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510]"
              required
            />
            <p className="mt-1 text-sm text-[#2B0510]/70">
              Yeni slug: {generateSlug(formData.name)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
              Açıklama *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
                Kategori *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as ActivityCategory,
                  })
                }
                className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] cursor-pointer"
                required
              >
                <option value="COMPETITION">Yarışma</option>
                <option value="VOLUNTEER">Gönüllülük</option>
                <option value="SUMMER_PROGRAM">Yaz Programı</option>
                <option value="PLATFORM">Platform</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
                Dönem *
              </label>
              <select
                value={formData.season}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    season: e.target.value as ActivitySeason,
                  })
                }
                className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] cursor-pointer"
                required
              >
                <option value="SUMMER">Yaz</option>
                <option value="WINTER">Kış</option>
                <option value="FALL">Sonbahar</option>
                <option value="SPRING">İlkbahar</option>
                <option value="YEAR_ROUND">Yıl Boyunca</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2B0510] mb-2">
              Sınıf Seviyeleri *
            </label>
            <div className="flex flex-wrap gap-2">
              {[9, 10, 11, 12].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => toggleGradeLevel(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                    formData.gradeLevels.includes(level)
                      ? "bg-[#7B1B38] text-white"
                      : "bg-[#F9EFE6] text-[#2B0510] hover:bg-[#FFE5B4]"
                  }`}
                >
                  {level}. Sınıf
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
                Finansal Destek Kategorisi *
              </label>
              <select
                value={formData.financialSupport}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    financialSupport: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] cursor-pointer"
                required
              >
                <option value="A+">A+ (Tam Burslu)</option>
                <option value="A">A (Çoğunlukla Burslu)</option>
                <option value="B">B (Kısmen Burslu)</option>
                <option value="C">C (Sınırlı Burs)</option>
                <option value="D">D (Burssuz)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
                Para Birimi
              </label>
              <select
                value={formData.amountCurrency}
                onChange={(e) =>
                  setFormData({ ...formData, amountCurrency: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] cursor-pointer"
              >
                <option value="TRY">TRY (₺)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
                Burs Miktarı
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.scholarshipAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    scholarshipAmount: e.target.value,
                  })
                }
                placeholder="örn. 25000"
                className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
                Katılım Ücreti / Fiyat
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.entryPrice}
                onChange={(e) =>
                  setFormData({ ...formData, entryPrice: e.target.value })
                }
                placeholder="0 = ücretsiz"
                className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
                Süre *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="örn. 2 hafta, 1 ay"
                className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510]"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="prestigious"
              checked={formData.isPrestigious}
              onChange={(e) =>
                setFormData({ ...formData, isPrestigious: e.target.checked })
              }
              className="w-5 h-5 rounded border-2 border-[#2B0510]/20 text-[#7B1B38] focus:ring-[#7B1B38] cursor-pointer"
            />
            <label
              htmlFor="prestigious"
              className="text-sm font-medium text-[#2B0510] cursor-pointer"
            >
              Prestijli/Yüksek Rekabet Olarak İşaretle
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
                Son Başvuru Tarihi
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
                Konum
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="örn. Online, İstanbul, ABD"
                className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
              Gereksinimler
            </label>
            <textarea
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              rows={4}
              placeholder="Uygunluk kriterleri, ön koşullar vs."
              className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
              Website URL
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2B0510] mb-1.5">
              Görsel URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-[#F9EFE6] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#7B1B38] transition-colors text-[#2B0510]"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#7B1B38] hover:bg-[#5A1127] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-white text-[#2B0510] font-medium rounded-lg border-2 border-[#2B0510]/20 hover:border-[#2B0510]/40 transition-colors cursor-pointer"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  )
}