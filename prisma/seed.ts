// prisma/seed.ts

import "dotenv/config"
import { PrismaClient, ActivityCategory, ActivitySeason } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import { competitions } from "./data/competitions"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding scholarships...")

  const scholarships = [
    // 1. Vectra AI
    {
      name: "Vectra AI Scholars Program",
      slug: "vectra-ai-scholars-program",
      description: "Vectra AI Scholars Program, siber güvenlik alanında yapay zekanın (AI) yenilikçi uygulamalarını geliştirmek isteyen öğrencileri teşvik etmeyi amaçlayan bir programdır. Katılımcıların, yapay zekayı siber tehditleri tespit etme ve nötralize etme amacıyla nasıl kullanabileceklerine dair özgün projeler sunması beklenir.\n\n[English Summary]\nAn initiative designed to encourage students to develop innovative applications of artificial intelligence in cybersecurity, requiring a project proposal highlighting a novel approach to AI in cybersecurity.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [11, 12, 13, 14, 15, 16],
      financialSupport: "A", // Çoğunlukla Burslu ($10,000)
      isPrestigious: true,
      isClosed: true,
      season: ActivitySeason.YEAR_ROUND,
      duration: "1 Yıl Mentörlük & Ödül",
      deadline: new Date("2026-03-31T23:59:59.000Z"),
      location: "Avustralya, Avusturya, Belçika, Kanada, Fransa, Almanya, Hindistan, İrlanda, Japonya, Hollanda, Yeni Zelanda, Singapur, İspanya, İsviçre, Tayland, Birleşik Krallık, ABD",
      requirements: "• Yapay zeka, makine öğrenimi ve siber güvenliğe ilgi duymak\n• Lise, lisans veya lisansüstü öğrencisi olmak\n• Yapay zekanın siber güvenlikte kullanımına yönelik 500-2500 kelimelik özgün proje teklifi veya prototip sunmak",
      website: "https://www.vectra.ai/ai-scholars",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60",
    },
    // 2. L. Ron Hubbard
    {
      name: "L. Ron Hubbard's Writers of the Future Contest",
      slug: "writers-of-the-future-contest",
      description: "Amatör ve yeni bilim kurgu ile fantezi yazarlarını teşvik etmek amacıyla düzenlenen, üç ayda bir tekrarlanan prestijli bir yazım yarışmasıdır. Katılımcıların bilim kurgu, fantezi veya karanlık fantezi türünde 1.000 ile 17.000 kelime arasında orijinal bir düzyazı göndermesi gerekir.\n\n[English Summary]\nA recurring quarterly science fiction and fantasy story writing competition for new and amateur writers.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
      financialSupport: "B", // Kısmen Burslu / Ödül ($500 - $5,000)
      isPrestigious: true,
      isClosed: false,
      season: ActivitySeason.YEAR_ROUND,
      duration: "Çeyreklik (Quarterly)",
      deadline: new Date("2026-06-30T23:59:59.000Z"),
      location: "Küresel (Global)",
      requirements: "• 13 yaş ve üzeri olmak\n• Amatör yazar olmak (profesyonel roman veya birden fazla kısa öykü yayınlamamış olmak)\n• Bilim kurgu, fantezi veya karanlık fantezi türünde 1.000 - 17.000 kelimelik özgün, insan yapımı eser sunmak (Yapay zeka kullanımı yasaktır)",
      website: "https://writersofthefuture.com/enter-writer-contest/",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=60",
    },
    // 3. Oxford Clarendon
    {
      name: "Clarendon Fund Scholarships",
      slug: "clarendon-fund-scholarships",
      description: "Oxford Üniversitesi'nde lisansüstü (Yüksek Lisans veya Doktora/DPhil) düzeyde eğitim almak isteyen, dünyanın her yerinden akademik olarak olağanüstü başarılı öğrencilere sunulan prestijli ve başarı odaklı bir burs programıdır. Program, tüm akademik alanlardaki dereceli programları kapsar.\n\n[English Summary]\nA prestigious, merit-based graduate scholarship program at the University of Oxford supporting outstanding graduate students from around the world for Master's and DPhil courses.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [15, 16], // Lisansüstü seviye
      financialSupport: "A+", // Tam Burslu (Eğitim ücreti + yaşam giderleri)
      isPrestigious: true,
      isClosed: false,
      season: ActivitySeason.FALL,
      duration: "Eğitim Süresi Boyunca",
      deadline: new Date("2027-01-15T23:59:59.000Z"),
      location: "Oxford Üniversitesi, İngiltere",
      requirements: "• Üstün akademik başarı ve potansiyel (Yüksek not ortalaması, referanslar)\n• Oxford'da yeni bir tam zamanlı veya yarı zamanlı Yüksek Lisans veya Doktora programına başvurmak\n• Ayrı bir burs başvurusu gerekmez; Aralık veya Ocak ayı başvuru döneminde programa başvuran adaylar otomatik olarak değerlendirilir",
      website: "https://www.ox.ac.uk/clarendon",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60",
    },
    // 4. Ayn Rand
    {
      name: "Ayn Rand Essay Contests",
      slug: "ayn-rand-essay-contests",
      description: "Ayn Rand'in romanları (Anthem, The Fountainhead, Atlas Shrugged) üzerine kurulu, öğrencilerin felsefi ve psikolojik çözümleme ile argüman geliştirme yeteneklerini sınayan küresel bir kompozisyon yarışmasıdır. Makaleler İngilizce yazılmalı ve belirli kelime sınırlarına (800-1,600 kelime) uymalıdır.\n\n[English Summary]\nAn annual global essay competition based on Ayn Rand's novels that evaluates students' analytical writing, argumentation, and grasp of philosophical concepts.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [8, 9, 10, 11, 12, 13, 14, 15, 16],
      financialSupport: "A", // Çoğunlukla Burslu / Yüksek Ödüllü ($500 - $25,000)
      isPrestigious: true,
      isClosed: false,
      season: ActivitySeason.YEAR_ROUND,
      duration: "Yıllık / Dönemsel",
      deadline: new Date("2026-11-06T23:59:59.000Z"),
      location: "Küresel (Global)",
      requirements: "• Anthem romanı için: 8-12. sınıf öğrencileri (13-18 yaş)\n• The Fountainhead için: 11-12. sınıf öğrencileri\n• Atlas Shrugged için: 12. sınıf, lisans ve lisansüstü öğrencileri\n• İngilizce olarak 800 - 1.600 kelime aralığında özgün makale hazırlamak",
      website: "https://aynrand.org/students/essay-contests/",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=60",
    },
    // 5. Optimist International
    {
      name: "Optimist International Essay Contest",
      slug: "optimist-international-essay-contest",
      description: "Gençlerin yazma becerilerini geliştirmelerini ve önceden belirlenmiş bir tema üzerine görüşlerini ifade etmelerini teşvik eden küresel bir kompozisyon yarışmasıdır. Yarışma yerel kulüplerden başlayarak bölge (District) düzeyine kadar aşamalı olarak ilerler.\n\n[English Summary]\nAn essay contest designed to encourage youth to develop writing skills and express their views on a pre-assigned topic, structured in local Club and District levels.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [9, 10, 11, 12],
      financialSupport: "B", // $2,500 yükseköğretim bursu
      isPrestigious: false,
      isClosed: false,
      season: ActivitySeason.WINTER,
      duration: "Tek Seferlik",
      deadline: new Date("2027-02-28T23:59:59.000Z"),
      location: "Küresel / Bölgesel",
      requirements: "• Yarışma yılının 1 Ekim tarihi itibarıyla 19 yaşından küçük olmak\n• Henüz liseden mezun olmamış olmak\n• Belirlenen tema üzerine 700-800 kelimelik özgün bir İngilizce kompozisyon yazmak",
      website: "https://www.optimist.org/member/scholarships3.cfm",
      imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=60",
    },
    // 6. Society of Women Engineers
    {
      name: "Society of Women Engineers Scholarships",
      slug: "swe-scholarships",
      description: "Mühendislik, teknoloji ve bilgisayar bilimleri alanlarında lisans veya lisansüstü eğitim (ABET akredite programlarda) almak isteyen kadın öğrencilere sunulan küresel bir burs programıdır. Tek bir başvuru ile uygun olunan yüzlerce bursa aynı aday olunabilir.\n\n[English Summary]\nA global scholarship program supporting women pursuing ABET-accredited degrees in engineering, engineering technology, and computer science at undergraduate or graduate levels.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [12, 13, 14, 15, 16],
      financialSupport: "A", // Çoğunlukla Burslu ($1,000 - $20,000)
      isPrestigious: true,
      isClosed: true,
      season: ActivitySeason.SPRING,
      duration: "Yıllık",
      deadline: new Date("2026-05-15T23:59:59.000Z"),
      location: "Küresel (Global / ABET akredite kurumlar)",
      requirements: "• Kadın kimliğine sahip olmak\n• ABET akredite bir mühendislik, bilgisayar bilimi veya teknoloji bölümüne kayıtlı veya kayıt planı olmak\n• Üniversite öğrencileri için min 3.0, lise son sınıf öğrencileri için min 3.5 GPA",
      website: "https://swe.org/scholarships/",
      imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&auto=format&fit=crop&q=60",
    },
    // 7. Skechers Athletic Performance Scholarship
    {
      name: "Skechers Athletic Performance Scholarship",
      slug: "skechers-athletic-performance-scholarship",
      description: "Hem akademik olarak başarılı hem de spor alanında yetenekli ve liderlik özellikleri gösteren lise son sınıf öğrencilerine yönelik bir burs programıdır. Skechers Pier to Pier Friendship Walk tarafından desteklenen Skechers Foundation, başarılı öğrencilerin yükseköğrenim masraflarını karşılamayı amaçlar.\n\n[English Summary]\nA scholarship program for high-achieving high school senior student-athletes who demonstrate leadership, athletic ability, and academic excellence, funded by the Skechers Foundation.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [12],
      financialSupport: "B", // Kısmen Burslu (Maksimum $5,000)
      isPrestigious: false,
      isClosed: true,
      season: ActivitySeason.SPRING,
      duration: "Tek Seferlik Ödül",
      deadline: new Date("2026-04-15T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri",
      requirements: "• Lise son sınıf öğrencisi olmak\n• 2 veya 4 yıllık akredite bir yükseköğretim kurumunda tam zamanlı eğitim planlamak\n• Lise 11. sınıf sonunda en az 3.0 GPA'ya sahip olmak\n• Öğrenci-sporcu olmak (Liderlik ve spor yeteneğini gösteren, koçtan alınmış tavsiye mektubu sunmak)",
      website: "https://secure.skechersfriendshipwalk.com/site/SPageServer/?pagename=scholarshipprogram_walk",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=60",
    },
    // 8. Too cool to pay for school scholarship
    {
      name: "\"Too Cool to Pay for School\" Scholarship",
      slug: "too-cool-to-pay-for-school-scholarship",
      description: "Kompozisyon (essay) gerektirmeyen, başvuru sürecinin son derece basit olduğu ve kazananın her çeyrekte kura ile belirlendiği popüler bir burs programıdır. Yükseköğrenim masraflarını karşılamak isteyen öğrencilere ek bir destek sunar.\n\n[English Summary]\nA popular, recurring quarterly \"no-essay\" scholarship where the winner is selected via a random drawing, designed to help students pay for their higher education.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
      financialSupport: "B", // $1,000 çeyreklik burs
      isPrestigious: false,
      isClosed: false,
      season: ActivitySeason.YEAR_ROUND,
      duration: "Tek Seferlik Ödül",
      deadline: new Date("2026-06-30T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri (DACA, undocumented ve uluslararası öğrenciler dahil)",
      requirements: "• Lise, üniversite veya lisansüstü öğrencisi olmak veya önümüzdeki 24 ay içinde bir okula kaydolmayı planlamak\n• Kompozisyon veya GPA şartı bulunmaz; kazanan rastgele çekilişle belirlenir",
      website: "https://accessscholarships.com/1k-too-cool-to-pay-for-school/",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=60",
    },
    // 9. Abbott & Fenner Scholarship
    {
      name: "Abbott & Fenner Scholarship",
      slug: "abbott-and-fenner-scholarship",
      description: "Öğrencilerin eğitim ve kariyer hedeflerini, bu hedeflere ulaşma planlarını ve seçtikleri bölümün hedeflerine nasıl katkı sağlayacağını anlatan 500-1.000 kelimelik bir kompozisyon (essay) yazarak başvurdukları yıllık bir burs programıdır.\n\n[English Summary]\nAn annual essay scholarship program requiring a 500-1,000 word essay describing educational/life goals and plans for achieving them.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [11, 12, 13, 14, 15, 16],
      financialSupport: "B", // $1,000 yıllık ödül
      isPrestigious: false,
      isClosed: false,
      season: ActivitySeason.SPRING,
      duration: "Tek Seferlik Ödül",
      deadline: new Date("2026-06-10T23:59:59.000Z"),
      location: "Küresel (Akredite yükseköğretim kurumları)",
      requirements: "• Tüm lise 11. ve 12. sınıf öğrencileri ile akredite edilmiş herhangi bir yükseköğretim kurumuna kayıtlı tüm öğrencilere açıktır\n• Eğitim hedefleri, kariyer planları ve seçilen bölümün hedeflere katkısı üzerine 500-1000 kelimelik özgün İngilizce essay hazırlamak\n• Başvurular e-posta yoluyla 'scholarships@abbottandfenner.com' adresine iletilir",
      website: "https://abbottandfenner.com/scholarships.php",
      imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=60",
    },
    // 10. Around the corner from college scholarship
    {
      name: "\"Around the Corner from College\" Scholarship",
      slug: "around-the-corner-from-college-scholarship",
      description: "Lise öğrencilerinin üniversiteye hazırlık süreçlerini desteklemek amacıyla yılda iki kez düzenlenen bir burs programıdır. Başvuru süreci genellikle öğrencilerin kişiselleştirilmiş bir üniversite hazırlık listesi (checklist) oluşturmasını içerir.\n\n[English Summary]\nA semi-annual scholarship designed to help high school students prepare for college by having them create a college preparation checklist.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [9, 10, 11, 12],
      financialSupport: "B", // $1,000 dönemlik burs
      isPrestigious: false,
      isClosed: false,
      season: ActivitySeason.YEAR_ROUND,
      duration: "Dönemlik Ödül",
      deadline: new Date("2026-06-30T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri (DACA ve uluslararası öğrenciler dahil)",
      requirements: "• Güncel lise öğrencisi olmak (9, 10, 11 veya 12. sınıf)\n• Amerika'da bir üniversiteye gitmeyi planlıyor olmak\n• Başvuru sürecinde en fazla 10 maddeden oluşan kişiselleştirilmiş bir üniversite hazırlık listesi (checklist) oluşturmak",
      website: "https://accessscholarships.com/around-the-corner-from-college-scholarship/",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=60",
    },
    // 11. Jack Kent Cooke Foundation
    {
      name: "Cooke College Scholarship Program",
      slug: "cooke-college-scholarship-program",
      description: "Yüksek akademik başarıya sahip ancak maddi desteğe ihtiyacı olan lise son sınıf öğrencilerine yönelik, ABD'nin en cömert burs programlarından biridir. Burs, öğrencilerin lisans eğitimleri boyunca okul ücreti, barınma, kitap ve diğer zorunlu masraflarını karşılamanın yanı sıra akademik danışmanlık ve geniş bir bursiyer ağına erişim sağlar.\n\n[English Summary]\nOne of the most generous undergraduate scholarship programs in the U.S. for high-achieving high school seniors with significant financial need. It covers tuition, living expenses, books, and fees.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [12],
      financialSupport: "A+", // Yılda $55,000'a kadar tam burs
      isPrestigious: true,
      isClosed: true,
      season: ActivitySeason.FALL,
      duration: "4 Yıl Boyunca",
      deadline: new Date("2026-11-15T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri",
      requirements: "• Ağırlıksız kümülatif GPA derecesinin 3.75 veya üzerinde olması\n• Belirgin bir finansal ihtiyaç göstermek (Aile yıllık düzeltilmiş brüt geliri genellikle $95.000'a kadar)\n• ABD'de ikamet etmek veya bir ABD bölgesinde yaşayıp lisenin tüm 4 yılını ABD'de okumak\n• Başvurular Common App üzerinden transkript, kompozisyonlar ve tavsiye mektuplarıyla yapılır",
      website: "https://www.jkcf.org/our-scholarships/college-scholarship-program/",
      imageUrl: "https://images.unsplash.com/photo-1525921429624-479b6c294520?w=600&auto=format&fit=crop&q=60",
    },
    // 12. Cameron impact Scholarships
    {
      name: "Cameron Impact Scholarship",
      slug: "cameron-impact-scholarship",
      description: "Akademik başarı, liderlik, topluluk hizmeti ve okul dışı aktivitelerde olağanüstü performans gösteren lise son sınıf öğrencilerine yönelik prestijli, başarı odaklı bir burs programıdır. Bursiyerlere dört yıllık üniversite eğitimi boyunca okul ücreti, kitap ve zorunlu masrafların tamamını karşılayan tam burs imkanı sunulur.\n\n[English Summary]\nA highly competitive, merit-based four-year full-tuition scholarship for high school seniors who excel in academics, leadership, community service, and extracurricular activities.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [12],
      financialSupport: "A+", // 4 yıllık tam burs
      isPrestigious: true,
      isClosed: true,
      season: ActivitySeason.SPRING,
      duration: "4 Yıl Boyunca",
      deadline: new Date("2026-05-01T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri",
      requirements: "• Amerika Birleşik Devletleri vatandaşı olmak\n• Kümülatif ağırlıksız not ortalamasının en az 3.7 / 4.0 olması\n• ABD'deki 4 yıllık akredite bir üniversitede tam zamanlı eğitime başlamayı planlamak\n• Olağanüstü liderlik yeteneği, okul dışı aktiviteler ve aktif topluluk hizmeti katılımı göstermek\n• Başvurular 3.000 adet tamamlanmış başvuru sınırı (cap) ile sınırlandırılmıştır",
      website: "https://www.bryancameroneducationfoundation.org/scholarship",
      imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=60",
    },
    // 13. Letters to strangers
    {
      name: "Letters to Strangers Mental Health Scholarships",
      slug: "letters-to-strangers-scholarships",
      description: "Ruh sağlığı odaklı iki farklı burs sunan küresel bir programdır. Mental Health Changemaker bursu, ruh sağlığı alanında eğitim almayı planlayan veya bu alanda savunuculuk projeleri yürüten 13 yaş ve üzeri öğrencilere yöneliktir. Mental Health Warrior bursu ise ruh sağlığı hizmetlerine erişimde (maddi, coğrafi vb.) engellerle karşılaşmış 18 yaş ve üzeri bireylerin tedavi ve tıbbi masraflarını karşılamaya yardımcı olur.\n\n[English Summary]\nA global mental health-focused scholarship program offering two awards: the Changemaker Scholarship (13+) for advocacy/studies, and the Warrior Scholarship (18+) for offsetting treatment costs.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
      financialSupport: "B", // Ruh sağlığı projelerine ve tedavilerine destek
      isPrestigious: false,
      isClosed: true,
      season: ActivitySeason.SPRING,
      duration: "Tek Seferlik",
      deadline: new Date("2026-04-01T23:59:59.000Z"),
      location: "Küresel (Global)",
      requirements: "• Changemaker Bursu için: 13 yaş ve üzeri olmak, ruh sağlığı savunuculuğu alanında proje teklifi sunmak\n• Warrior Bursu için: 18 yaş ve üzeri olmak, tedavi/tıbbi destek ihtiyaçlarını belgelemek ve engellerle karşılaşmış olmak\n• Tüm ülkelerden katılıma açıktır",
      website: "https://www.letterstostrangers.org/scholarship",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=60",
    },
    // 14. Sallie Mae No Essay
    {
      name: "Sallie Mae $2,000 \"No Essay\" Scholarship",
      slug: "sallie-mae-no-essay-scholarship",
      description: "Kompozisyon yazma şartı aramayan, başvuru sürecinin son derece kolay olduğu ve her ay çekilişle kazananın belirlendiği aylık bir burs/çekiliş programıdır. Hem öğrenciler hem de üniversiteye giden çocukları olan veliler başvurabilir.\n\n[English Summary]\nA monthly no-essay scholarship sweepstakes that awards $2,000 to students or parents of students via a random monthly drawing.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [11, 12, 13, 14, 15, 16],
      financialSupport: "B", // $2,000 aylık burs
      isPrestigious: false,
      isClosed: false,
      season: ActivitySeason.YEAR_ROUND,
      duration: "Aylık Çekiliş",
      deadline: new Date("2026-05-31T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri",
      requirements: "• 50 ABD eyaleti, Washington DC veya ABD bölgelerinde yasal ikamet sahibi olmak\n• En az 16 veya 17 yaşında olmak\n• Lise 11. ve 12. sınıf öğrencisi (önümüzdeki yıl üniversiteye başlayacak), güncel üniversite öğrencisi veya velisi olmak\n• Kompozisyon yazılması gerekmez; kazanan aylık çekilişle belirlenir",
      website: "https://www.sallie.com/scholarships/no-essay",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60",
    },
    // 15. Be bold no essay
    {
      name: "The \"Be Bold\" No-Essay Scholarship",
      slug: "be-bold-no-essay-scholarship",
      description: "Kompozisyon yazma şartı aramayan, Bold.org platformunda oluşturulan profiller arasında \"en cesur\" (en kararlı, içten ve ilham verici) profile sahip olan öğrenciye verilen büyük miktarlı bir burs programıdır. Her ay tekrarlanan ve başvuru zamanlamasının önemli olduğu bir yapıya sahiptir.\n\n[English Summary]\nA generous monthly no-essay scholarship on Bold.org awarded to the student with the \"boldest\" profile—earnest, determined, and moving.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [9, 10, 11, 12, 13, 14, 15, 16],
      financialSupport: "A", // $25,000 ödül
      isPrestigious: true,
      isClosed: false,
      season: ActivitySeason.YEAR_ROUND,
      duration: "Aylık",
      deadline: new Date("2026-06-01T23:59:59.000Z"),
      location: "Küresel (Bold.org platformu)",
      requirements: "• Herhangi bir eğitim seviyesinde, not ortalamasında ve bölümde okuyan öğrencilere açıktır\n• Kompozisyon yazmak gerekmez. Bold.org'da profil oluşturulmalı ve profil en 'cesur' özellikleri yansıtmalıdır\n• Platformdaki görevleri tamamlayarak Bold Puanı biriktirmek avantaj sağlayabilir",
      website: "https://bold.org/scholarships/the-be-bold-no-essay-scholarship/",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=60",
    },
    // 16. Encourage 500$
    {
      name: "Encourage for Students Sweepstakes",
      slug: "encourage-for-students-sweepstakes",
      description: "Öğrencileri üniversite ve kariyer yollarını keşfetmeye teşvik eden, Encourage platformu üzerinden ücretsiz üyelik oluşturup platform kaynaklarıyla etkileşime girerek başvurulan aylık bir çekiliş programıdır. Kompozisyon yazma veya minimum GPA şartı bulunmaz.\n\n[English Summary]\nA monthly no-essay, no-GPA student sweepstakes designed to encourage students to explore college and career paths by engaging with the Encourage platform.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [9, 10, 11, 12],
      financialSupport: "C", // $500 aylık burs çekilişi
      isPrestigious: false,
      isClosed: false,
      season: ActivitySeason.YEAR_ROUND,
      duration: "Aylık Çekiliş",
      deadline: new Date("2026-05-31T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri",
      requirements: "• Lise öğrencisi olmak (Genellikle 14-18 yaş arası)\n• Encourage platformunda ücretsiz bir öğrenci profili oluşturmak\n• Kompozisyon veya GPA şartı bulunmaz; kazanan her ay çekilişle belirlenir",
      website: "https://app.encourageme.com/optin/sweepstakes",
      imageUrl: "https://images.unsplash.com/photo-1552581230-c01591d3c99a?w=600&auto=format&fit=crop&q=60",
    },

    // ADDITIONAL SCHOLARSHIPS (Burs Listeleri)
    {
      name: "CollegeVine Monthly Scholarship",
      slug: "collegevine-monthly-scholarship",
      description: "CollegeVine platformundaki aktiviteler aracılığıyla kazanılan 'karma' puanlarını kullanarak teklif verilen veya doğrudan no-essay çekilişleri ile kazanılan aylık bir burs programıdır.\n\n[English Summary]\nMonthly no-essay scholarship based on platform participation and karma points.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [9, 10, 11, 12],
      financialSupport: "B", // $2,500 aylık
      isPrestigious: false,
      isClosed: false,
      season: ActivitySeason.YEAR_ROUND,
      duration: "Aylık",
      deadline: new Date("2027-01-15T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri",
      requirements: "• Lise öğrencisi olmak\n• CollegeVine platformunda profil oluşturup puan toplamak",
      website: "https://www.collegevine.com",
      imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Edvisors Monthly Scholarship",
      slug: "edvisors-monthly-scholarship",
      description: "Öğrencilerin yükseköğrenim masraflarını karşılamalarına yardımcı olmak amacıyla her ay düzenlenen kolay başvurulu bir no-essay burs programıdır.\n\n[English Summary]\nEasy-entry monthly no-essay scholarship by Edvisors.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [11, 12, 13, 14, 15, 16],
      financialSupport: "B", // $1,000 - $2,500
      isPrestigious: false,
      isClosed: false,
      season: ActivitySeason.YEAR_ROUND,
      duration: "Aylık",
      deadline: new Date("2027-01-15T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri",
      requirements: "• En az 16 yaşında olmak\n• Yükseköğretime kayıtlı veya kayıt planı bulunmak\n• Kompozisyon yazmak gerekmez",
      website: "https://www.edvisors.com",
      imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "ScholarshipPoints Monthly Scholarship",
      slug: "scholarshippoints-monthly-scholarship",
      description: "Üyelerin anket doldurma, makale okuma ve çeşitli online aktiviteleri gerçekleştirerek kazandıkları puanlarla burs çekilişlerine katıldığı popüler bir programdır.\n\n[English Summary]\nPoint-based monthly and quarterly scholarship drawings.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [11, 12, 13, 14, 15, 16],
      financialSupport: "B", // $1,000 - $2,500 aylık ve $10,000 çeyreklik
      isPrestigious: false,
      isClosed: false,
      season: ActivitySeason.YEAR_ROUND,
      duration: "Aylık / Çeyreklik",
      deadline: new Date("2027-01-31T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri",
      requirements: "• En az 13 yaşında olmak\n• Yükseköğrenim planı olmak veya kayıtlı olmak\n• ScholarshipPoints platformu üzerinden aktiviteleri tamamlayarak puan toplamak",
      website: "https://www.scholarshippoints.com",
      imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Bezos Scholars Program",
      slug: "bezos-scholars-program",
      description: "Lise 11. sınıf (junior) öğrencileri ile bir okuldaki eğitimciye yönelik, liderlik gelişimini destekleyen son derece prestijli bir programdır. Bursiyerler, topluluklarında uygulamak üzere 'Community Change Project' projesi başlatırlar.\n\n[English Summary]\nA highly selective leadership development program for high school juniors offering project funding and a trip to Aspen Ideas Festival.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [11],
      financialSupport: "B", // $1,000 proje fonu + tüm masraflar dahil seyahat ve danışmanlık
      isPrestigious: true,
      isClosed: false,
      season: ActivitySeason.YEAR_ROUND,
      duration: "1 Yıl Liderlik Eğitimi",
      deadline: new Date("2027-01-15T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri (Aspen Ideas Festival dahil)",
      requirements: "• Lise 11. sınıf öğrencisi olmak\n• Devlet okulunda okumak ve yüksek akademik başarı sergilemek\n• Toplumsal değişim projesi yürütmeye istekli olmak",
      website: "https://www.bezosfamilyfoundation.org/bezos-scholars",
      imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Mensa Foundation Scholarship",
      slug: "mensa-foundation-scholarship",
      description: "Mensa Vakfı tarafından öğrencilerin akademik başarılarından ziyade hayat ve kariyer hedeflerini, kompozisyon yazarak anlattıkları yıllık bir başarı bursu programıdır. Mensa üyesi olma zorunluluğu yoktur.\n\n[English Summary]\nAn annual essay scholarship based on career and educational goals, open to non-Mensa members.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [12, 13, 14, 15, 16],
      financialSupport: "B", // $600 - $2,500 (özel bazı burslarda $7,000)
      isPrestigious: true,
      isClosed: false,
      season: ActivitySeason.FALL,
      duration: "Yıllık",
      deadline: new Date("2027-01-15T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri (Mensa yerel şubeleri)",
      requirements: "• Bir ABD yükseköğretim kurumunda tam zamanlı eğitim alıyor veya alacak olmak\n• Eğitim ve kariyer amaçlarını anlatan en fazla 550 kelimelik bir İngilizce kompozisyon yazmak",
      website: "https://www.mensafoundation.org",
      imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Dell Scholars Program",
      slug: "dell-scholars-program",
      description: "Michael & Susan Dell Vakfı tarafından, maddi olarak zor durumda olan ancak yüksek öğrenime devam etmek için azim gösteren öğrencilere yönelik kapsamlı bir destek programıdır. Sadece maddi destek sağlamakla kalmaz, aynı zamanda laptop ve mentörlük desteği de sunar.\n\n[English Summary]\nA comprehensive program for low-income, highly motivated students providing tuition, laptop, and mentoring.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [12],
      financialSupport: "A", // $20,000 + Laptop + kitap kredileri
      isPrestigious: true,
      isClosed: false,
      season: ActivitySeason.WINTER,
      duration: "Lisans Eğitimi Boyunca",
      deadline: new Date("2027-02-15T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri",
      requirements: "• Onaylı bir üniversite hazırlık programına katılmış olmak (AVID, Upward Bound vb.)\n• Pell Grant uygunluğu ve belirgin finansal ihtiyaç göstermek\n• Lise son sınıf öğrencisi olmak ve en az 2.4 GPA derecesine sahip olmak",
      website: "https://www.dellscholars.org",
      imageUrl: "https://images.unsplash.com/photo-1496181130204-7552cc145cd6?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Horatio Alger Scholarship",
      slug: "horatio-alger-scholarship",
      description: "Karşılaştıkları büyük kişisel ve ekonomik zorluklara rağmen akademik başarılarını sürdüren ve topluma katkı sağlamak isteyen azimli gençlere yönelik, ABD'nin en köklü burs programlarından biridir.\n\n[English Summary]\nScholarships for resilient high school seniors who have overcome significant personal adversities.",
      category: ActivityCategory.SCHOLARSHIP,
      gradeLevels: [12],
      financialSupport: "A", // $10,000 - $25,000
      isPrestigious: true,
      isClosed: false,
      season: ActivitySeason.WINTER,
      duration: "Lisans Eğitimi Boyunca",
      deadline: new Date("2027-03-01T23:59:59.000Z"),
      location: "Amerika Birleşik Devletleri",
      requirements: "• Karşılaşılan kişisel zorlukları/engelleri aşmak için azim sergilemek\n• Aile yıllık düzeltilmiş brüt gelirinin $55.000 veya altında olması\n• ABD vatandaşı olmak ve lise son sınıfta bulunmak\n• Topluluk hizmeti ve güçlü bir not ortalaması (en az 2.0 GPA)",
      website: "https://scholars.horatioalger.org",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop&q=60",
    },
  ]

  for (const scholarship of scholarships) {
    await prisma.activity.upsert({
      where: { slug: scholarship.slug },
      update: {
        name: scholarship.name,
        description: scholarship.description,
        category: scholarship.category,
        gradeLevels: scholarship.gradeLevels,
        financialSupport: scholarship.financialSupport,
        entryPrice: null,
        scholarshipAmount: null,
        amountCurrency: "TRY",
        isPrestigious: scholarship.isPrestigious,
        isClosed: scholarship.isClosed,
        season: scholarship.season,
        duration: scholarship.duration,
        deadline: scholarship.deadline,
        location: scholarship.location,
        requirements: scholarship.requirements,
        website: scholarship.website,
        imageUrl: scholarship.imageUrl,
      },
      create: {
        name: scholarship.name,
        slug: scholarship.slug,
        description: scholarship.description,
        category: scholarship.category,
        gradeLevels: scholarship.gradeLevels,
        financialSupport: scholarship.financialSupport,
        entryPrice: null,
        scholarshipAmount: null,
        amountCurrency: "TRY",
        isPrestigious: scholarship.isPrestigious,
        isClosed: scholarship.isClosed,
        season: scholarship.season,
        duration: scholarship.duration,
        deadline: scholarship.deadline,
        location: scholarship.location,
        requirements: scholarship.requirements,
        website: scholarship.website,
        imageUrl: scholarship.imageUrl,
      },
    })
  }

  console.log(`Seeded ${scholarships.length} scholarships successfully!`)

  console.log("Seeding competitions & platforms...")

  for (const entry of competitions) {
    await prisma.activity.upsert({
      where: { slug: entry.slug },
      update: {
        name: entry.name,
        description: entry.description,
        category: entry.category,
        gradeLevels: entry.gradeLevels,
        financialSupport: entry.financialSupport,
        entryPrice: entry.entryPrice ?? null,
        scholarshipAmount:
          entry.scholarshipAmount != null ? String(entry.scholarshipAmount) : null,
        amountCurrency: entry.amountCurrency ?? "TRY",
        isPrestigious: entry.isPrestigious,
        isClosed: entry.isClosed,
        season: entry.season,
        duration: entry.duration,
        deadline: entry.deadline,
        location: entry.location,
        requirements: entry.requirements,
        website: entry.website,
        imageUrl: entry.imageUrl,
      },
      create: {
        name: entry.name,
        slug: entry.slug,
        description: entry.description,
        category: entry.category,
        gradeLevels: entry.gradeLevels,
        financialSupport: entry.financialSupport,
        entryPrice: entry.entryPrice ?? null,
        scholarshipAmount:
          entry.scholarshipAmount != null ? String(entry.scholarshipAmount) : null,
        amountCurrency: entry.amountCurrency ?? "TRY",
        isPrestigious: entry.isPrestigious,
        isClosed: entry.isClosed,
        season: entry.season,
        duration: entry.duration,
        deadline: entry.deadline,
        location: entry.location,
        requirements: entry.requirements,
        website: entry.website,
        imageUrl: entry.imageUrl,
      },
    })
  }

  console.log(
    `Seeded ${competitions.length} competitions/platforms successfully!`
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
