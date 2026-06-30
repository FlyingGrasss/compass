// prisma/data/competitions.ts

import { ActivityCategory, ActivitySeason } from "@prisma/client"

export type CompetitionSeed = {
  name: string
  slug: string
  description: string
  category: ActivityCategory
  gradeLevels: number[]
  financialSupport: string
  entryPrice?: number | null
  scholarshipAmount?: number | string | null
  amountCurrency?: string
  isPrestigious: boolean
  isClosed: boolean
  season: ActivitySeason
  duration: string
  deadline: Date | null
  location: string | null
  requirements: string | null
  website: string | null
  imageUrl: string | null
}

const tech =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60"
const hackathon =
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60"
const science =
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=60"
const space =
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&auto=format&fit=crop&q=60"
const community =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=60"
const creative =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=60"

export const competitions: CompetitionSeed[] = [
  // —— Platforms & directories ——
  {
    name: "TEKNOFEST Yarışmalar",
    slug: "teknofest-yarismalar",
    description:
      "TEKNOFEST kapsamında düzenlenen havacılık, uzay, teknoloji ve inovasyon yarışmalarının resmi listesi ve başvuru takvimi. İnsansız hava araçları, roket, yapay zeka, çevre teknolojileri ve daha onlarca kategoride takım veya bireysel başvuru yapılabilir.\n\n[English] Official hub for TEKNOFEST technology competitions across aerospace, AI, robotics, and innovation categories.",
    category: ActivityCategory.PLATFORM,
    gradeLevels: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Yıllık yarışma takvimi",
    deadline: null,
    location: "Türkiye",
    requirements:
      "• Yarışma kategorisine göre değişen yaş ve eğitim seviyesi\n• Çoğu kategori için takım oluşturma ve mentor desteği\n• Güncel şartlar için teknofest.org yarışmalar sayfasını inceleyin",
    website: "https://teknofest.org/tr/yarismalar/",
    imageUrl: tech,
  },
  {
    name: "Coderspace Etkinlikler",
    slug: "coderspace-etkinlikler",
    description:
      "Yazılım kariyeri için hackathon, kod yarışması, meet-up ve eğitim etkinliklerinin toplandığı Türkiye merkezli platform. Teknoloji şirketleri ve topluluklarla düzenlenen güncel fırsatlara tek yerden ulaşılır.\n\n[English] Turkish platform listing hackathons, coding contests, and developer community events.",
    category: ActivityCategory.PLATFORM,
    gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "D",
    isPrestigious: false,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Sürekli güncellenen etkinlikler",
    deadline: null,
    location: "Türkiye / Online",
    requirements: "• Etkinliğe göre değişen başvuru koşulları\n• Çoğu hackathon için temel programlama bilgisi\n• Coderspace hesabı ile başvuru",
    website: "https://coderspace.io/etkinlikler",
    imageUrl: hackathon,
  },
  {
    name: "Appcent",
    slug: "appcent-platform",
    description:
      "Mobil uygulama, e-ticaret ve web geliştirme odaklı dijital dönüşüm çözümleri sunan şirket; Hackathon Türkiye gibi ekosistemlerde sponsor veya iş ortağı olarak yer alabilir. Compass’ta, hackathon ve teknoloji etkinlikleri keşfi için yönlendirici bir kaynak olarak listelenmiştir.\n\n[English] Digital product studio; may appear as a partner in Turkish hackathon ecosystems rather than hosting its own recurring student contest.",
    category: ActivityCategory.PLATFORM,
    gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "D",
    isPrestigious: false,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Proje ve etkinlik bazlı",
    deadline: null,
    location: "Türkiye",
    requirements: "• Doğrudan öğrenci yarışması değil; ilgili hackathon sayfalarından başvuru\n• Yazılım ve ürün geliştirme ilgisi",
    website: "https://appcent.mobi/?ref=hackathonturkiye",
    imageUrl: tech,
  },
  {
    name: "Techcareer Hackathon",
    slug: "techcareer-hackathon",
    description:
      "Techcareer.net üzerinde yayınlanan güncel ve yaklaşan hackathon etkinlikleri. Ödüllü yarışmalar, şirket destekli maratonlar ve kariyer odaklı teknoloji challenge’ları listelenir.\n\n[English] Curated hackathon listings with prizes on Techcareer.net.",
    category: ActivityCategory.PLATFORM,
    gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "B",
    isPrestigious: false,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Dönemsel etkinlikler",
    deadline: null,
    location: "Türkiye",
    requirements: "• Her hackathon için ayrı başvuru formu\n• Genelde üniversite veya lise+ seviyesi\n• Techcareer profili",
    website: "https://www.techcareer.net/hackathon",
    imageUrl: hackathon,
  },
  {
    name: "MEB Ortaöğretim Yarışmaları",
    slug: "meb-ortaogretim-yarismalar",
    description:
      "Millî Eğitim Bakanlığı Ortaöğretim Genel Müdürlüğü’nün duyurduğu resmi yarışma ve proje platformu. Okul düzeyinde bilim, sanat ve spor yarışmalarına ilişkin duyurular burada yayınlanır (güncellenme sıklığı sınırlı olabilir).\n\n[English] Official MEB secondary education competitions announcement portal.",
    category: ActivityCategory.PLATFORM,
    gradeLevels: [9, 10, 11, 12],
    financialSupport: "D",
    isPrestigious: false,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Eğitim öğretim yılına göre",
    deadline: null,
    location: "Türkiye",
    requirements: "• Okul/kurum üzerinden başvuru\n• Yarışma türüne göre sınıf ve alan şartları",
    website: "https://ogm.meb.gov.tr/www/yarismalar/kategori/19",
    imageUrl: community,
  },
  {
    name: "TÜBİTAK Bilim Yarışmaları",
    slug: "tubitak-bilim-yarismalari",
    description:
      "TÜBİTAK tarafından yürütülen ulusal ve uluslararası bilim olimpiyatları, proje yarışmaları ve araştırma programlarına ilişkin resmi bilgi merkezi. IMO, IPhO, ISEF adaylığı ve TEKNOFEST iş birlikleri bu çatı altında yürütülür.\n\n[English] TÜBİTAK hub for national science olympiads, research competitions, and international delegation selection.",
    category: ActivityCategory.PLATFORM,
    gradeLevels: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Yıllık yarışma takvimi",
    deadline: null,
    location: "Türkiye",
    requirements:
      "• Yarışmaya göre okul türü, sınıf ve yaş sınırı\n• Çoğu ulusal yarışma için okul ön elemesi\n• tubitak.gov.tr yarışmalar bölümünden güncel takvim",
    website: "https://www.tubitak.gov.tr/tr/yarismalar",
    imageUrl: science,
  },
  {
    name: "Gençlik Hizmetleri Duyuruları",
    slug: "genclik-hizmetleri-duyurular",
    description:
      "Gençlik ve Spor Bakanlığı Gençlik Hizmetleri Genel Müdürlüğü’nün gençlere yönelik program, etkinlik, kamp ve proje duyuruları. Yerel gençlik merkezleri ve ulusal programlar bu kanaldan takip edilir.\n\n[English] Turkish Ministry youth programs and activity announcements.",
    category: ActivityCategory.PLATFORM,
    gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "D",
    isPrestigious: false,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Yıl boyu duyurular",
    deadline: null,
    location: "Türkiye",
    requirements: "• Programa özel yaş ve başvuru koşulları\n• e-Genç veya yerel gençlik merkezi üzerinden kayıt",
    website: "https://genclikhizmetleri.gov.tr/duyurular/",
    imageUrl: community,
  },
  {
    name: "TFSF Onaylı Fotoğraf Yarışmaları",
    slug: "tfsf-fotograf-yarismalari",
    description:
      "Türkiye Fotoğraf Sanatı Federasyonu onaylı ulusal ve uluslararası fotoğraf yarışmalarının listesi, sonuçları ve başvuru kuralları. Amatör ve genç fotoğrafçılar için güvenilir yarışma rehberi.\n\n[English] Federation-approved national and international photography contest listings in Turkey.",
    category: ActivityCategory.PLATFORM,
    gradeLevels: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "B",
    isPrestigious: false,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Sürekli açılan yarışmalar",
    deadline: null,
    location: "Türkiye / Uluslararası",
    requirements: "• Yarışma şartnamesindeki teknik ve konu kuralları\n• TFSF onaylı platform üzerinden başvuru",
    website: "https://tfsfonayliyarismalar.org/",
    imageUrl: creative,
  },
  {
    name: "AB Başkanlığı",
    slug: "ab-baskanligi-platform",
    description:
      "T.C. Dışişleri Bakanlığı Avrupa Birliği Başkanlığı’nın AB müktesebatı, gençlik programları ve Türkiye–AB ilişkilerine dair resmi bilgi platformu. Genç Çevirmenler Yarışması gibi programlar bu çatı altında duyurulur.\n\n[English] Turkish EU Directorate portal for EU affairs and youth programs.",
    category: ActivityCategory.PLATFORM,
    gradeLevels: [13, 14, 15, 16],
    financialSupport: "D",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Dönemsel programlar",
    deadline: null,
    location: "Türkiye",
    requirements: "• Program bazında üniversite veya gençlik kriterleri",
    website: "https://www.ab.gov.tr/",
    imageUrl: community,
  },
  {
    name: "Science Comes to Town",
    slug: "science-comes-to-town",
    description:
      "Avrupa Birliği araştırma ve inovasyon ekosistemindeki bilimsel etkinlikler, açık günler ve gençlere yönelik STEM programlarının listelendiği platform.\n\n[English] EU-focused science outreach and event discovery platform.",
    category: ActivityCategory.PLATFORM,
    gradeLevels: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "D",
    isPrestigious: false,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Takvim bazlı",
    deadline: null,
    location: "Avrupa / Online",
    requirements: "• Etkinliğe göre yaş ve dil şartları\n• Çoğu etkinlik ücretsiz veya AB projesi kapsamında",
    website: "https://sciencecomestotown.eu/events",
    imageUrl: science,
  },
  {
    name: "e-Genc",
    slug: "e-genc-platform",
    description:
      "Gençlik ve Spor Bakanlığı e-Genc portalı: gençlik merkezleri, genç ofisler, kamplar, faaliyetler ve online başvurular. Türkiye genelinde gençlere yönelik resmi etkinlik takvimi.\n\n[English] National e-Youth portal for youth centers, camps, and activities in Turkey.",
    category: ActivityCategory.PLATFORM,
    gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "D",
    isPrestigious: false,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Yıl boyu",
    deadline: null,
    location: "Türkiye",
    requirements: "• 14–30 yaş aralığı (faaliyete göre)\n• e-Genc hesabı ile başvuru",
    website: "https://e-genc.gsb.gov.tr/",
    imageUrl: community,
  },

  // —— Specific competitions & hackathons ——
  {
    name: "Anadolu Hackathon 2026",
    slug: "anadolu-hackathon-2026",
    description:
      "Yandex Türkiye ve Sivas Bilim ve Teknoloji Üniversitesi (SBTÜ) iş birliğiyle düzenlenen, çevrim içi yapay zekâ ve makine öğrenmesi hackathonu. Katılımcılar akıllı lojistik, toplu taşıma ve hava durumu temalarında gerçek dünya veri setleriyle ürün çözümleri geliştirir.\n\n[English] Online AI/ML hackathon by Yandex Turkey and SBTÜ; teams of 2–3 build data-driven product solutions.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [13, 14, 15, 16],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: true,
    season: ActivitySeason.SPRING,
    duration: "13–27 Nisan 2026 (çevrim içi + final)",
    deadline: new Date("2026-04-08T23:59:59.000Z"),
    location: "Türkiye (Online)",
    requirements:
      "• Üniversite öğrencileri; 2–3 kişilik takım\n• Yapay zekâ / veri bilimi ilgisi\n• Başvuru: hackaton.sivas.edu.tr",
    website: "https://hackaton.sivas.edu.tr/",
    imageUrl: hackathon,
  },
  {
    name: "TUA Astro Hackathon 2026",
    slug: "tua-astro-hackathon-2026",
    description:
      "Türkiye Uzay Ajansı (TUA) öncülüğünde 37 ilde eş zamanlı düzenlenen uzay teknolojileri hackathon serisinin 2026 etabı. Uydu sistemleri, uzay araştırmaları ve astrofizik temalarında 36 saatlik yarışma; mentorluk ve ücretsiz katılım.\n\n[English] Turkey Space Agency hackathon series on space tech, satellites, and astrophysics.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: true,
    season: ActivitySeason.SPRING,
    duration: "36 saat (28–29 Mart 2026)",
    deadline: new Date("2026-03-20T23:59:59.000Z"),
    location: "Türkiye (37 il, eş zamanlı)",
    requirements:
      "• 2–5 kişilik takım\n• Öğrenci, akademisyen veya girişimci olabilir\n• Önceki hackathon deneyimi şart değil",
    website: "https://tuaastrohackathon.com/",
    imageUrl: space,
  },
  {
    name: "FIRST Robotics Competition (FRC)",
    slug: "first-robotics-competition",
    description:
      "9–12. sınıf öğrencileri için küresel robotik yarışma programı. Takımlar mentorlarla robot tasarlar, üretir ve her sezon değişen oyun kurallarına göre sahada yarışır. Türkiye’de FRC takımları okul ve STK’lar aracılığıyla kurulur.\n\n[English] International high-school robotics league building competition robots with mentors.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Sezonluk (yaklaşık 6 ay)",
    deadline: null,
    location: "Küresel / Türkiye takımları",
    requirements:
      "• Lise seviyesi (grades 9–12)\n• Okul veya topluluk sponsorluğu\n• Mühendislik ve takım çalışması taahhüdü",
    website: "https://www.firstinspires.org/programs/frc/",
    imageUrl: tech,
  },
  {
    name: "International Mathematical Olympiad (IMO)",
    slug: "international-mathematical-olympiad",
    description:
      "Dünyanın en prestijli lise düzeyi matematik olimpiyatı. Türkiye adayları TÜBİTAK ulusal elemeleri ve kamp süreci sonunda uluslararası takıma seçilir.\n\n[English] World’s premier high-school mathematics olympiad; Turkish delegation via TÜBİTAK.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12],
    financialSupport: "A",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.SUMMER,
    duration: "Ulusal eleme + uluslararası final",
    deadline: null,
    location: "Küresel (ülke bazlı eleme)",
    requirements:
      "• TÜBİTAK Matematik Olimpiyatı ulusal aşamalarına katılım\n• Üstün matematik problem çözme becerisi\n• Lise öğrencisi olmak",
    website: "https://www.imo-official.org/",
    imageUrl: science,
  },
  {
    name: "International Physics Olympiad (IPhO)",
    slug: "international-physics-olympiad",
    description:
      "Teorik ve deneysel fizikte en üst düzey lise yarışması. Türkiye temsilcileri TÜBİTAK Fizik Olimpiyatı süreciyle belirlenir.\n\n[English] Premier physics olympiad testing advanced theoretical and experimental skills.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12],
    financialSupport: "A",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.SUMMER,
    duration: "Ulusal eleme + uluslararası final",
    deadline: null,
    location: "Küresel",
    requirements:
      "• TÜBİTAK Fizik Olimpiyatı elemeleri\n• İleri düzey fizik ve laboratuvar becerisi",
    website: "https://www.ipho-new.org/",
    imageUrl: science,
  },
  {
    name: "Trust for Sustainable Living — Uluslararası Okul Yarışması",
    slug: "trust-sustainable-living-competition",
    description:
      "7–18 yaş arası öğrenciler için ücretsiz sürdürülebilirlik temalı makale yarışması ve tartışma programı. Her öğrenci bir eser sunar; başvurular kayıtlı öğretmen veya veli (Teacher Champion) üzerinden yapılır.\n\n[English] Free global schools essay competition on sustainability for ages 7–18.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    financialSupport: "D",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.SPRING,
    duration: "Yıllık yarışma döngüsü",
    deadline: new Date("2026-12-31T23:59:59.000Z"),
    location: "Küresel",
    requirements:
      "• 7–18 yaş\n• Öğretmen/veli Teacher Champion hesabı ile tek eser gönderimi\n• Sürdürülebilirlik temasına uygun yazı",
    website:
      "https://trustforsustainableliving.org/take-part/international-schools-essay-competition-and-debate",
    imageUrl: creative,
  },
  {
    name: "Genç Çevirmenler Yarışması",
    slug: "genc-cevirmenler-yarismasi",
    description:
      "T.C. Dışişleri Bakanlığı AB Başkanlığı’nın üniversite çevirmenlik öğrencilerine yönelik düzenlediği yarışma. AB müktesebatı çevirisi ve Avrupa Birliği’ne uyum sürecine katkı amacı taşır; 2010’dan beri sürdürülmektedir.\n\n[English] Turkish EU Directorate translation contest for university translation students.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [13, 14, 15, 16],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Yıllık başvuru dönemi",
    deadline: null,
    location: "Türkiye",
    requirements:
      "• Üniversitede çevirmenlik eğitimi alan öğrenci\n• AB Başkanlığı duyurusundaki başvuru takvimi ve format",
    website: "https://www.ab.gov.tr/genc-cevirmenler-yarismasi_51697.html",
    imageUrl: creative,
  },
  {
    name: "Regeneron International Science and Engineering Fair (ISEF)",
    slug: "regeneron-isef",
    description:
      "Dünyanın en büyük lise öncesi bilim ve mühendislik fuarı. Türkiye’den finalistler TÜBİTAK/TÜBAFF bağlı bilim fuarları ve ulusal seçmeler üzerinden belirlenir. 2026 finali Phoenix, Arizona’da.\n\n[English] World’s largest pre-college science fair; Turkish finalists selected via affiliated fairs.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12],
    financialSupport: "A",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.SPRING,
    duration: "9–15 Mayıs 2026 (final haftası)",
    deadline: new Date("2026-05-01T23:59:59.000Z"),
    location: "Phoenix, Arizona, ABD",
    requirements:
      "• Bağlı ulusal/ bölgesel bilim fuarında derece\n• Orijinal araştırma projesi ve poster sunumu\n• Türkiye için TÜBİTAK/TÜBAFF süreçleri",
    website: "https://www.societyforscience.org/isef/",
    imageUrl: science,
  },
  {
    name: "Gençlerden Geleceğe Proje Yarışması",
    slug: "genclerden-gelecege",
    description:
      "14–18 yaş öğrenciler için sürdürülebilirlik ve sosyal sorumluluk odaklı proje yarışması. Uluslararası sertifika ve gençlik liderliği bileşenleri sunar.\n\n[English] Sustainability and social responsibility project contest for ages 14–18 with international certification.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12],
    financialSupport: "B",
    isPrestigious: false,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Proje geliştirme + jüri",
    deadline: null,
    location: "Türkiye / Online",
    requirements: "• 14–18 yaş\n• Sürdürülebilirlik veya sosyal etki projesi\n• Platform üzerinden kayıt",
    website: "https://www.genclerdengelecege.org/",
    imageUrl: community,
  },
  {
    name: "Yapay Zekâ Yıldızları Hackathonu",
    slug: "yapay-zeka-yildizlari-hackathon",
    description:
      "Habitat Derneği ve Vodafone Vakfı ortaklığında 14–18 yaş lise öğrencilerine dijital refah ve yapay zekâ çözümleri üretme fırsatı sunan hackathon. Kazanan takım Skills Upload Jr kapsamında Romanya’daki uluslararası finalde Türkiye’yi temsil edebilir.\n\n[English] AI for digital welfare hackathon for Turkish high-school students ages 14–18.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.WINTER,
    duration: "Kasım–Aralık (yıllık döngü)",
    deadline: new Date("2026-12-10T23:59:59.000Z"),
    location: "Türkiye → Uluslararası final",
    requirements:
      "• 14–18 yaş lise öğrencisi\n• 2–3 kişilik takım ve koordinatör (öğretmen)\n• Takım çalışması ve İngilizce tercih edilir",
    website: "https://www.yapayzekayildizlari.org/hackathon",
    imageUrl: hackathon,
  },
  {
    name: "DigiEduHack 2025",
    slug: "digieduhack-2025",
    description:
      "Dijital beceri çağında eğitimi yeniden düşünmeye odaklanan Avrupa çaplı hackathon ve challenge serisi. Okullar, üniversiteler ve eğitim paydaşları için inovasyon odaklı çözümler.\n\n[English] EU-wide hackathon on rethinking education in the digital skills era.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "B",
    isPrestigious: false,
    isClosed: true,
    season: ActivitySeason.FALL,
    duration: "2025 challenge sezonu",
    deadline: new Date("2025-11-30T23:59:59.000Z"),
    location: "Avrupa / Online",
    requirements: "• Challenge sayfasındaki takım ve tema şartları\n• Eğitim teknolojisi odaklı çözüm",
    website: "https://digieduhack.com/challenges/2025-i",
    imageUrl: hackathon,
  },
  {
    name: "Education for Innovation Hackathon",
    slug: "education-for-innovation-hackathon",
    description:
      "Eğitimde inovasyon temalı hackathon programı; öğrenci ve eğitimci topluluklarına yönelik çözüm geliştirme ve girişimcilik deneyimi.\n\n[English] Hackathon program focused on innovation in education.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "B",
    isPrestigious: false,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Dönemsel",
    deadline: null,
    location: "Uluslararası / Online",
    requirements: "• Resmi sitedeki başvuru ve takım kuralları",
    website: "https://www.educationforinnovation.org/hackathon",
    imageUrl: hackathon,
  },
  {
    name: "DataMedX Hackathon",
    slug: "datamedx-hackathon",
    description:
      "İstinye Üniversitesi’nin lise öğrencilerine yönelik sağlık–teknoloji hackathonu. Anonimleştirilmiş sağlık verileriyle yapay zekâ, veri analitiği ve dijital sağlık ürünleri geliştirilir. 2026 etabı 15–17 Mayıs.\n\n[English] Istinye University health-tech hackathon for high-school teams using real-world health data.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [10, 11, 12],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.SPRING,
    duration: "3 gün (15–17 Mayıs 2026)",
    deadline: new Date("2026-05-03T23:59:59.000Z"),
    location: "İstinye Üniversitesi, İstanbul",
    requirements:
      "• Lise öğrencisi (10–12. sınıf)\n• 3–5 kişilik takım\n• Sağlık teknolojisi veya veri bilimine ilgi\n• Ücretsiz katılım",
    website:
      "https://www.istinye.edu.tr/tr/etkinlikler/lise-ogrencileri-icin-essiz-bir-hackathon-deneyimi-datamedx-basliyor",
    imageUrl: science,
  },
  {
    name: "BTK Akademi Hackathon Yarışması 2025",
    slug: "btk-akademi-hackathon-2025",
    description:
      "BTK Akademi portalında duyurulan ulusal hackathon ve yazılım yarışması programı. Dijital becerileri geliştirmeyi hedefleyen öğrenci ve genç geliştiricilere yöneliktir.\n\n[English] National hackathon program announced on Turkey’s BTK Academy portal.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
    financialSupport: "B",
    isPrestigious: false,
    isClosed: true,
    season: ActivitySeason.YEAR_ROUND,
    duration: "2025 sezonu",
    deadline: new Date("2025-12-31T23:59:59.000Z"),
    location: "Türkiye",
    requirements: "• BTK Akademi hesabı\n• Portalda belirtilen takım ve proje formatı",
    website: "https://www.btkakademi.gov.tr/portal/public/hackathonyarismasi2025",
    imageUrl: hackathon,
  },
  {
    name: "Doodle for Google",
    slug: "doodle-for-google",
    description:
      "Google ana sayfası için doodle tasarlayan küresel sanat yarışması. 2025–26 sezonu için başvurular kapanmıştır; finalistler 2026 başında açıklanacaktır.\n\n[English] Global K-12 art contest to design a Google homepage doodle.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: true,
    season: ActivitySeason.WINTER,
    duration: "Yıllık (okul yılı)",
    deadline: new Date("2026-03-01T23:59:59.000Z"),
    location: "ABD (ülke bazlı)",
    requirements:
      "• Okul öncesi–12. sınıf (ülke kurallarına göre)\n• Orijinal doodle ve başvuru formu\n• Veli/okul onayı",
    website: "https://doodles.google.com/d4g/",
    imageUrl: creative,
  },
  {
    name: "LancerHacks IX",
    slug: "lancerhacks-ix",
    description:
      "12 saatlik yoğun hackathon deneyimi: yazılım projeleri geliştirme, iş birliği ve ödüller. Uluslararası katılım kuralları etkinlik duyurusunda belirtilir.\n\n[English] 12-hour student hackathon for building software projects in teams.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12],
    financialSupport: "B",
    isPrestigious: false,
    isClosed: false,
    season: ActivitySeason.SPRING,
    duration: "12 saat",
    deadline: null,
    location: "ABD (katılım şartlarına bağlı)",
    requirements:
      "• Lise öğrencisi\n• Takım veya bireysel katılım (etkinlik kuralları)\n• Programlama ve prototipleme",
    website: "https://www.lancerhacks.com/",
    imageUrl: hackathon,
  },
  {
    name: "National History Bowl",
    slug: "national-history-bowl",
    description:
      "Varsity ve Junior Varsity bölümlerinde tarih bilgisi yarışması. Takım halinde çok aşamalı turnuva formatında ABD merkezli prestijli akademik yarışma.\n\n[English] Team-based U.S. history quiz bowl tournament with varsity divisions.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [9, 10, 11, 12],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.WINTER,
    duration: "Sezonluk turnuvalar",
    deadline: null,
    location: "Amerika Birleşik Devletleri",
    requirements:
      "• Okul takımı\n• Tarih bilgisi buzzer formatı\n• Uluslararası katılım için organizasyon ile iletişim",
    website: "https://www.historybowl.com/hs/",
    imageUrl: creative,
  },
  {
    name: "Canadian Chemistry Contest (CCC)",
    slug: "canadian-chemistry-contest",
    description:
      "Kimya alanında güçlü öğrenciler için Kanada merkezli ulusal yarışma. Problem çözme ve teorik kimya bilgisini ölçer; uluslararası başvuru kuralları sitede yer alır.\n\n[English] National Canadian chemistry competition for advanced students.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [10, 11, 12],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.SPRING,
    duration: "Yıllık sınav",
    deadline: null,
    location: "Kanada / Uluslararası",
    requirements: "• Lise kimya düzeyi\n• Kayıtlı okul veya onaylı merkez üzerinden başvuru",
    website: "https://cemc.uwaterloo.ca/contests/canadian_chemistry_contest.html",
    imageUrl: science,
  },
  {
    name: "Odyssey of the Mind",
    slug: "odyssey-of-the-mind",
    description:
      "Yaratıcı problem çözme ve takım performansı odaklı küresel yarışma programı. Her sezon farklı “problem” senaryolarında mühendislik, tiyatro ve tasarım becerileri birleştirilir.\n\n[English] Creative problem-solving team competition combining STEM and performance.",
    category: ActivityCategory.COMPETITION,
    gradeLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    financialSupport: "B",
    isPrestigious: true,
    isClosed: false,
    season: ActivitySeason.YEAR_ROUND,
    duration: "Sezonluk + World Finals",
    deadline: null,
    location: "Küresel",
    requirements:
      "• Okul veya topluluk takımı\n• Üyelik ve problem paketi satın alma\n• Yaş bölümüne uygun takım",
    website: "https://www.odysseyofthemind.com/",
    imageUrl: creative,
  },
]
