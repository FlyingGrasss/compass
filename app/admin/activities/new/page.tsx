// app/admin/activities/new/page.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ActivityCategory, ActivitySeason } from "@prisma/client"

export default function NewActivityPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "COMPETITION" as ActivityCategory,
    gradeLevels: [] as number[],
    financialSupport: "B",
    isPrestigious: false,
    season: "YEAR_ROUND" as ActivitySeason,
    duration: "",
    deadline: "",
    location: "",
    requirements: "",
    website: "",
    imageUrl: "",
  })

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
      const slug = generateSlug(formData.name)

      const response = await fetch("/api/admin/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          slug,
          deadline: formData.deadline || null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      toast.success("Etkinlik başarıyla oluşturuldu!")
      router.push("/admin/activities")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Etkinlik oluşturulamadı"
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

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[#242F50] mb-6">
        Yeni Etkinlik Ekle
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#242F50] mb-1.5">
              Etkinlik Adı *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50]"
              required
            />
            <p className="mt-1 text-sm text-[#242F50]/70">
              Slug otomatik oluşturulacak: {generateSlug(formData.name)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#242F50] mb-1.5">
              Açıklama *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#242F50] mb-1.5">
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
                className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50] cursor-pointer"
                required
              >
                <option value="COMPETITION">Yarışma</option>
                <option value="VOLUNTEER">Gönüllülük</option>
                <option value="SUMMER_PROGRAM">Yaz Programı</option>
                <option value="SCHOOL_PROGRAM">Okul Programı</option>
                <option value="PLATFORM">Platform</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#242F50] mb-1.5">
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
                className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50] cursor-pointer"
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
            <label className="block text-sm font-medium text-[#242F50] mb-2">
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
                      ? "bg-[#2458B4] text-white"
                      : "bg-[#E6F1FB] text-[#242F50] hover:bg-[#AAD0F2]"
                  }`}
                >
                  {level}. Sınıf
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#242F50] mb-1.5">
                Finansal Destek *
              </label>
              <select
                value={formData.financialSupport}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    financialSupport: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50] cursor-pointer"
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
              <label className="block text-sm font-medium text-[#242F50] mb-1.5">
                Süre *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="örn. 2 hafta, 1 ay"
                className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50]"
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
              className="w-5 h-5 rounded border-2 border-[#242F50]/20 text-[#2458B4] focus:ring-[#2458B4] cursor-pointer"
            />
            <label
              htmlFor="prestigious"
              className="text-sm font-medium text-[#242F50] cursor-pointer"
            >
              Prestijli/Yüksek Rekabet Olarak İşaretle
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#242F50] mb-1.5">
                Son Başvuru Tarihi
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#242F50] mb-1.5">
                Konum
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="örn. Online, İstanbul, ABD"
                className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#242F50] mb-1.5">
              Gereksinimler
            </label>
            <textarea
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              rows={4}
              placeholder="Uygunluk kriterleri, ön koşullar vs."
              className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#242F50] mb-1.5">
              Website URL
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#242F50] mb-1.5">
              Görsel URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-[#E6F1FB] border-2 border-transparent rounded-lg focus:outline-none focus:border-[#2458B4] transition-colors text-[#242F50]"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#2458B4] hover:bg-[#1d4a95] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Oluşturuluyor..." : "Etkinlik Oluştur"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-white text-[#242F50] font-medium rounded-lg border-2 border-[#242F50]/20 hover:border-[#242F50]/40 transition-colors cursor-pointer"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  )
}