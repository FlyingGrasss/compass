"use client"

import { createContext, useContext, useEffect, useMemo, useRef, useState, type InputHTMLAttributes } from "react"

export type Locale = "tr" | "en"

const STORAGE_KEY = "youthcompass-locale"

const messages: Record<Locale, Record<string, string>> = {
  tr: {
    "brand.name": "YouthCompass",
    "language.label": "Dil",
    "language.turkish": "Türkçe",
    "language.english": "English",
    "nav.activities": "Etkinlikler",
    "nav.scholarships": "Burslar",
    "nav.about": "Hakkımızda",
    "nav.profile": "Profil",
    "nav.panel": "Panel",
    "nav.signIn": "Giriş Yap",
    "nav.signUp": "Kaydol",
    "nav.signOut": "Çıkış Yap",
    "footer.description": "Türkiye'deki ve dünyadaki gençler için bağımsız, kâr amacı gütmeyen eğitim ve fırsat pusulası.",
    "footer.opportunities": "Fırsatlar",
    "footer.allActivities": "Tüm Etkinlikler",
    "footer.scholarshipOpportunities": "Burs Fırsatları",
    "footer.corporate": "Kurumsal",
    "footer.home": "Ana Sayfa",
    "footer.ageRange": "Yaş Aralığı",
    "footer.ageDescription": "13 - 20 yaş arasındaki tüm gençlere hitap eden fırsatlar.",
    "footer.copyright": "© 2026 YouthCompass. Tüm hakları saklıdır. Gençlik için bir pusula.",

    "home.badge": "Gençlik İçin Pusula",
    "home.titleStart": "Geleceğinizi Şekillendirecek",
    "home.titleEnd": "Fırsatları Keşfedin",
    "home.description": "13-20 yaş arasındaki gençler için yurt dışı eğitim rehberi, prestijli burslar, stajlar ve gönüllülük programları bir arada!",
    "home.allCategories": "Tüm Kategoriler",
    "home.competitions": "Yarışmalar",
    "home.volunteering": "Gönüllülük",
    "home.summerPrograms": "Yaz Programları",
    "home.schoolPrograms": "Okul Programları",
    "home.platforms": "Platformlar",
    "home.searchPlaceholder": "Burs, staj, yarışma veya okul programı ara...",
    "home.search": "Ara",
    "home.explore": "Fırsatları Keşfet",
    "home.viewScholarshipGuide": "Burs Rehberini Gör",
    "home.whatWeOffer": "YouthCompass Size Ne Sunuyor?",
    "home.scholarshipGuidance": "Burs Rehberliği",
    "home.scholarshipGuidanceDescription": "Dünyanın dört bir yanından, lise ve üniversite seviyesindeki öğrencilere özel yüzlerce burs fırsatına ücretsiz erişim.",
    "home.studyAbroad": "Yurt Dışında Okuma",
    "home.studyAbroadDescription": "Fırsat eşitsizliğini engellemek için tasarlanmış bağımsız rehberlik. Yurt dışında okuma imkanlarını kolayca öğrenin.",
    "home.nonProfit": "Kâr Amacı Gütmeyen Yapı",
    "home.nonProfitDescription": "YouthCompass, gençler için tamamen ücretsiz ve kâr amacı gütmeyen, gönüllülük esasıyla çalışan bir pusuladır.",
    "home.scholarshipsAndDrawings": "Burslar & Çekilişler",
    "home.featuredScholarships": "Öne Çıkan Burs Fırsatları",
    "home.viewAllScholarships": "Tüm 37+ Bursu İncele",
    "home.details": "Detaylar",
    "home.whoWeAre": "Biz Kimiz?",
    "home.aboutDescription": "YouthCompass, başta Türkiye olmak üzere 13-20 yaş arasındaki tüm gençlere yurt dışında okuma, staj programları ve gönüllülük projelerine katılma gibi konularda tamamen ücretsiz ve kâr amacı gütmeden rehberlik eder.",
    "home.aboutQuote": "YouthCompass is designed to act as a compass for young people, helping them on their journey to self-discovery.",
    "home.learnMore": "Daha Fazlasını Öğren",
    "home.joinUs": "Bize Katılın",
    "home.joinDescription": "Siz de ücretsiz bir şekilde üye olarak ilham verici yolculuğumuza katılın. Pusulanız hazır, sınırları aşmak için kaydolun!",
    "home.joinFree": "Ücretsiz Üye Ol",

    "about.title": "Pusulanız YouthCompass",
    "about.subtitle": "Gençlerin kendi yolculuklarını keşfetmeleri ve geleceğe güvenle adım atmaları için tasarlanmış bağımsız bir rehber.",
    "about.whoTitle": "Biz kimiz?",
    "about.whoTr1": "YouthCompass, 13-20 yaş arasındaki gençlere yurt dışında okuma, staj programları ve gönüllülük projelerine katılma gibi konularda rehber olmak için tasarlanmıştır. Kuruluş amacımız, başta Türkiye olmak üzere tüm gençlere okul ve iş hayatında bir pusula görevi görmek ve kendilerini bulma yolculuklarında onlara yardımcı olmaktır.",
    "about.whoEn1": "YouthCompass is designed to guide young people aged 13-20 in studying abroad, internship programs, and volunteering projects. Our purpose is to act as a compass for young people, starting in Turkey, throughout their education and working lives, and to support them on their journey of self-discovery.",
    "about.whoTr2": "Yüzlerce fırsatı bir web sitesinde toplayan YouthCompass, bunu yaparken kâr amacı gütmez. İlham verici yolculuğumuza siz de ücretsiz bir şekilde üye olarak katılabilirsiniz.",
    "about.whoEn2": "By bringing hundreds of opportunities together in one website, YouthCompass remains non-profit. You can join our inspiring journey by registering for free.",
    "about.shapeFuture": "Geleceğini Şekillendir",
    "about.abroadTitle": "Yurt Dışında Okuma",
    "about.abroadTr1": "Her yıl Türkiye'den binlerce genç yurt dışına üniversite okumaya gidiyor. Yüz binlercesi ise böyle bir seçenekleri olduğundan bile habersiz. YouthCompass, bu fırsat eşitsizliğini azaltmak için var.",
    "about.abroadEn1": "Every year, thousands of young people from Turkey go abroad for university. Hundreds of thousands more are not even aware that this option exists. YouthCompass exists to help reduce this inequality of opportunity.",
    "about.abroadTr2": "Yurt dışında okumayı hedefleyen ve yolculuğunun daha başında olan öğrencilerden, bunu yeni öğrenen öğrencilere kadar tüm hevesli gençlere yol göstermek için varız. Bu serüveni gençler için daha erişilebilir ve kolay hale getirmeyi amaçlıyoruz.",
    "about.abroadEn2": "We are here to guide every enthusiastic young person, from students just beginning their journey to those who have only recently discovered that studying abroad is possible. We aim to make this adventure more accessible and easier for young people.",
    "about.crossBorders": "Sınırları Aş",
    "about.ctaTitle": "İlham Verici Yolculuğumuza Katılın!",
    "about.ctaDescription": "YouthCompass tamamen ücretsiz ve kâr amacı gütmeyen bir platformdur. Kaydolarak yüzlerce eğitim, staj, burs ve gönüllülük projesine anında erişebilirsiniz.",
    "about.ctaDescriptionEn": "YouthCompass is a completely free, non-profit platform. Register to access hundreds of education, internship, scholarship, and volunteering opportunities.",

    "activities.badge": "Fırsat Kataloğu",
    "activities.title": "Tüm Fırsatlar & Etkinlikler",
    "activities.description": "Başvuru tarihleri yaklaşan fırsatları öncelikli olarak keşfedin ve hayalinizdeki programa zamanında başvurun.",
    "activities.searchPlaceholder": "Başlık, açıklama, gereksinim veya konum ara...",
    "activities.competition": "Yarışma",
    "activities.summerProgram": "Yaz Programı",
    "activities.schoolProgram": "Okul Programı",
    "activities.gradeWord": "Sınıf",
    "season.summer": "Yaz",
    "season.winter": "Kış",
    "season.fall": "Sonbahar",
    "season.spring": "İlkbahar",
    "season.yearRound": "Yıl Boyu",
    "activities.sort": "Sıralama",
    "activities.sortUpcoming": "⏰ Yaklaşan Son Başvuru",
    "activities.sortNewest": "✨ En Yeni Ekleme",
    "activities.sortLatest": "📅 İleri Tarihli",
    "activities.category": "Kategori",
    "activities.allCategories": "Tüm Kategoriler",
    "activities.season": "Sezon / Dönem",
    "activities.allSeasons": "Tüm Sezonlar",
    "activities.grade": "Sınıf Seviyesi",
    "activities.allGrades": "Tüm Sınıflar",
    "activities.prestige": "Prestij Seviyesi",
    "activities.all": "Tümü",
    "activities.prestigiousOnly": "Sadece Prestijli",
    "activities.standard": "Standart Fırsatlar",
    "activities.status": "Başvuru Durumu",
    "activities.open": "Başvurusu Açık",
    "activities.closed": "Tamamlandı / Kapalı",
    "activities.count": "Toplam {count} fırsat listeleniyor",
    "activities.clearFilters": "Filtreleri Temizle",
    "activities.applyFilters": "Filtreleri Uygula",
    "activities.noResults": "Aradığınız kriterlere uygun sonuç bulunamadı.",
    "activities.noResultsDescription": "Filtrelerinizi esneterek veya farklı arama kelimeleri deneyerek diğer fırsatlara göz atabilirsiniz.",
    "activities.showAll": "Tüm Fırsatları Göster",
    "activities.prestigious": "Prestijli",
    "activities.deadline": "Son Başvuru",
    "activities.notSpecified": "Belirtilmedi / Sürekli",
    "activities.details": "Detayları Gör →",
    "activities.closedBadge": "Başvurular Kapandı",
    "activities.alwaysOpen": "Sürekli / Açık",
    "activities.expired": "Süresi Doldu",
    "activities.today": "🔥 Bugüne Özel!",
    "activities.lastDays": "⚡ Son {days} Gün!",
    "activities.lastDaysPlain": "⏳ Son {days} Gün",

    "scholarships.title": "Burslar & Burs Rehberi",
    "scholarships.description": "Yurt dışında eğitim almak isteyen lise ve üniversite öğrencileri için en prestijli, güncel burs ve finansal destek fırsatları.",
    "scholarships.badge": "Burs & Finansal Destek Fırsatları",
    "scholarships.heroTitle": "Geleceğini Burslarla İnşa Et",
    "scholarships.heroDescription": "Dünyanın en prestijli üniversitelerinden ve vakıflarından 37'den fazla burs fırsatını derledik. YouthCompass ile kriterlerine uygun olanları filtrele ve hayallerine giden yolda destek bul!",
    "scholarships.searchPlaceholder": "Burs adı, gereksinimler veya anahtar kelimelerle ara...",
    "scholarships.allEligibility": "Tüm Uygunluklar",
    "scholarships.globalEligibility": "Küresel / Türkiye",
    "scholarships.usOnly": "Sadece ABD",
    "scholarships.allStatuses": "Tüm Durumlar",
    "scholarships.openApplications": "Açık Başvurular",
    "scholarships.closed": "Kapanmış",
    "scholarships.allLevels": "Tüm Dereceler",
    "scholarships.prestigiousOnly": "Sadece Prestijli",
    "scholarships.filter": "Filtrele",
    "scholarships.count": "Toplam {count} burs listeleniyor",
    "scholarships.clearFilters": "Filtreleri Temizle",
    "scholarships.noResults": "Sonuç Bulunamadı",
    "scholarships.noResultsDescription": "Belirttiğiniz kriterlere uygun burs fırsatı bulunmamaktadır. Farklı filtreler kullanmayı veya aramayı genişletmeyi deneyebilirsiniz.",
    "scholarships.requirements": "Gereksinimler:",
    "scholarships.prestigious": "Prestijli Fırsat",
    "scholarships.closedBadge": "Kapandı",
    "scholarships.openBadge": "Açık",
    "scholarships.deadline": "Son Tarih",
    "scholarships.rolling": "Sürekli (Rolling)",
    "scholarships.apply": "Başvur",
    "scholarships.viewDetails": "Detay Gör →",

    "detail.back": "← Tüm Fırsatlara Dön",
    "detail.closed": "Başvurular Kapalı",
    "detail.open": "Başvurular Açık",
    "detail.location": "Konum / Lokasyon",
    "detail.duration": "Süre / Süreç",
    "detail.season": "Dönem",
    "detail.deadline": "Son Başvuru Tarihi",
    "detail.scholarshipAmount": "Burs Miktarı",
    "detail.financialSupport": "Maddi Destek",
    "detail.entryFee": "Katılım Ücreti",
    "detail.free": "Ücretsiz",
    "detail.targetGrades": "Hedef Sınıflar",
    "detail.grades": "Sınıflar",
    "detail.description": "Açıklama / Detaylar",
    "detail.requirements": "Katılım Koşulları & Gereksinimler",
    "detail.visitOfficial": "Resmi Başvuru Sitesini Ziyaret Et",

    "auth.loading": "Yükleniyor...",
    "auth.signIn": "Giriş Yap",
    "auth.signInDescription": "Hesabınıza giriş yapın",
    "auth.email": "E-posta",
    "auth.password": "Şifre",
    "auth.signingIn": "Giriş yapılıyor...",
    "auth.signedIn": "Başarıyla giriş yapıldı!",
    "auth.invalidCredentials": "E-posta veya şifre hatalı",
    "auth.noAccount": "Hesabınız yok mu?",
    "auth.register": "Kayıt Ol",
    "auth.signUp": "Kayıt Ol",
    "auth.newAccount": "Yeni hesap oluşturun",
    "auth.fullName": "Ad Soyad",
    "auth.fullNamePlaceholder": "Adınız Soyadınız",
    "auth.passwordPlaceholder": "En az 8 karakter",
    "auth.confirmPassword": "Şifre Tekrar",
    "auth.confirmPasswordPlaceholder": "Şifrenizi tekrar girin",
    "auth.sendingCode": "Kod gönderiliyor...",
    "auth.continue": "Devam Et",
    "auth.haveAccount": "Zaten hesabınız var mı?",
    "auth.enterCode": "Kodu Girin",
    "auth.codeSent": "adresine gönderilen 6 haneli kodu girin",
    "auth.verifying": "Doğrulanıyor...",
    "auth.createAccount": "Hesabı Oluştur",
    "profile.title": "Profil",
    "profile.description": "Hesap bilgilerinizi görüntüleyin ve yönetin",
    "profile.editActivity": "Etkinlik Düzenle",
  },
  en: {
    "brand.name": "YouthCompass",
    "language.label": "Language",
    "language.turkish": "Türkçe",
    "language.english": "English",
    "nav.activities": "Opportunities",
    "nav.scholarships": "Scholarships",
    "nav.about": "About",
    "nav.profile": "Profile",
    "nav.panel": "Dashboard",
    "nav.signIn": "Sign in",
    "nav.signUp": "Sign up",
    "nav.signOut": "Sign out",
    "footer.description": "An independent, non-profit education and opportunity compass for young people in Turkey and around the world.",
    "footer.opportunities": "Opportunities",
    "footer.allActivities": "All Opportunities",
    "footer.scholarshipOpportunities": "Scholarship Opportunities",
    "footer.corporate": "Company",
    "footer.home": "Home",
    "footer.ageRange": "Age Range",
    "footer.ageDescription": "Opportunities for young people aged 13–20.",
    "footer.copyright": "© 2026 YouthCompass. All rights reserved. A compass for youth.",

    "home.badge": "A Compass for Youth",
    "home.titleStart": "Discover Opportunities",
    "home.titleEnd": "That Shape Your Future",
    "home.description": "A single place for study-abroad guidance, prestigious scholarships, internships, and volunteering programs for young people aged 13–20.",
    "home.allCategories": "All Categories",
    "home.competitions": "Competitions",
    "home.volunteering": "Volunteering",
    "home.summerPrograms": "Summer Programs",
    "home.schoolPrograms": "School Programs",
    "home.platforms": "Platforms",
    "home.searchPlaceholder": "Search scholarships, internships, competitions, or school programs...",
    "home.search": "Search",
    "home.explore": "Explore Opportunities",
    "home.viewScholarshipGuide": "View Scholarship Guide",
    "home.whatWeOffer": "What Does YouthCompass Offer?",
    "home.scholarshipGuidance": "Scholarship Guidance",
    "home.scholarshipGuidanceDescription": "Free access to hundreds of scholarship opportunities from around the world for high-school and university students.",
    "home.studyAbroad": "Study Abroad",
    "home.studyAbroadDescription": "Independent guidance designed to reduce inequality of opportunity. Learn about studying abroad with ease.",
    "home.nonProfit": "Non-Profit Mission",
    "home.nonProfitDescription": "YouthCompass is a completely free, non-profit compass for young people, powered by volunteers.",
    "home.scholarshipsAndDrawings": "Scholarships & Drawings",
    "home.featuredScholarships": "Featured Scholarship Opportunities",
    "home.viewAllScholarships": "Explore all 37+ scholarships",
    "home.details": "Details",
    "home.whoWeAre": "Who We Are",
    "home.aboutDescription": "YouthCompass is a free, non-profit guide for young people aged 13–20, helping them find study-abroad, internship, and volunteering opportunities, starting in Turkey.",
    "home.aboutQuote": "YouthCompass is designed to act as a compass for young people, helping them on their journey to self-discovery.",
    "home.learnMore": "Learn More",
    "home.joinUs": "Join Us",
    "home.joinDescription": "Join our inspiring journey for free. Your compass is ready—sign up and go beyond your limits!",
    "home.joinFree": "Join for Free",

    "about.title": "Your Compass: YouthCompass",
    "about.subtitle": "An independent guide designed to help young people discover their journeys and step confidently into the future.",
    "about.whoTitle": "Who are we?",
    "about.whoTr1": "YouthCompass is designed to guide young people aged 13–20 in studying abroad, internships, and volunteering projects. Our purpose is to act as a compass for young people, starting in Turkey, throughout their education and working lives, and to support them on their journey of self-discovery.",
    "about.whoEn1": "YouthCompass is designed to guide young people aged 13–20 in studying abroad, internships, and volunteering projects. Our purpose is to act as a compass for young people, starting in Turkey, throughout their education and working lives, and to support them on their journey of self-discovery.",
    "about.whoTr2": "By bringing hundreds of opportunities together in one website, YouthCompass remains non-profit. You can join our inspiring journey by registering for free.",
    "about.whoEn2": "By bringing hundreds of opportunities together in one website, YouthCompass remains non-profit. You can join our inspiring journey by registering for free.",
    "about.shapeFuture": "Shape Your Future",
    "about.abroadTitle": "Studying Abroad",
    "about.abroadTr1": "Every year, thousands of young people from Turkey go abroad for university. Hundreds of thousands more are not even aware that this option exists. YouthCompass exists to help reduce this inequality of opportunity.",
    "about.abroadEn1": "Every year, thousands of young people from Turkey go abroad for university. Hundreds of thousands more are not even aware that this option exists. YouthCompass exists to help reduce this inequality of opportunity.",
    "about.abroadTr2": "We are here to guide every enthusiastic young person, from students just beginning their journey to those who have only recently discovered that studying abroad is possible. We aim to make this adventure more accessible and easier for young people.",
    "about.abroadEn2": "We are here to guide every enthusiastic young person, from students just beginning their journey to those who have only recently discovered that studying abroad is possible. We aim to make this adventure more accessible and easier for young people.",
    "about.crossBorders": "Go Beyond Borders",
    "about.ctaTitle": "Join Our Inspiring Journey!",
    "about.ctaDescription": "YouthCompass is a completely free, non-profit platform. Register to access hundreds of education, internship, scholarship, and volunteering opportunities.",
    "about.ctaDescriptionEn": "YouthCompass is a completely free, non-profit platform. Register to access hundreds of education, internship, scholarship, and volunteering opportunities.",

    "activities.badge": "Opportunity Catalogue",
    "activities.title": "All Opportunities & Events",
    "activities.description": "Explore opportunities with approaching deadlines first and apply to your dream program on time.",
    "activities.searchPlaceholder": "Search by title, description, requirement, or location...",
    "activities.competition": "Competition",
    "activities.summerProgram": "Summer Program",
    "activities.schoolProgram": "School Program",
    "activities.gradeWord": "Grade",
    "season.summer": "Summer",
    "season.winter": "Winter",
    "season.fall": "Fall",
    "season.spring": "Spring",
    "season.yearRound": "Year-round",
    "activities.sort": "Sort by",
    "activities.sortUpcoming": "⏰ Upcoming deadlines",
    "activities.sortNewest": "✨ Newest additions",
    "activities.sortLatest": "📅 Latest deadlines",
    "activities.category": "Category",
    "activities.allCategories": "All Categories",
    "activities.season": "Season / Term",
    "activities.allSeasons": "All Seasons",
    "activities.grade": "Grade Level",
    "activities.allGrades": "All Grades",
    "activities.prestige": "Prestige Level",
    "activities.all": "All",
    "activities.prestigiousOnly": "Prestigious only",
    "activities.standard": "Standard opportunities",
    "activities.status": "Application Status",
    "activities.open": "Applications open",
    "activities.closed": "Completed / Closed",
    "activities.count": "{count} opportunities listed",
    "activities.clearFilters": "Clear filters",
    "activities.applyFilters": "Apply filters",
    "activities.noResults": "No results match your criteria.",
    "activities.noResultsDescription": "Try broadening your filters or using different search terms to explore more opportunities.",
    "activities.showAll": "Show All Opportunities",
    "activities.prestigious": "Prestigious",
    "activities.deadline": "Deadline",
    "activities.notSpecified": "Not specified / Ongoing",
    "activities.details": "View details →",
    "activities.closedBadge": "Applications closed",
    "activities.alwaysOpen": "Ongoing / Open",
    "activities.expired": "Expired",
    "activities.today": "🔥 Today only!",
    "activities.lastDays": "⚡ {days} days left!",
    "activities.lastDaysPlain": "⏳ {days} days left",

    "scholarships.title": "Scholarships & Scholarship Guide",
    "scholarships.description": "Current, prestigious scholarships and financial support opportunities for high-school and university students who want to study abroad.",
    "scholarships.badge": "Scholarship & Financial Support Opportunities",
    "scholarships.heroTitle": "Build Your Future with Scholarships",
    "scholarships.heroDescription": "We compiled more than 37 scholarship opportunities from prestigious universities and foundations around the world. Filter them by your criteria with YouthCompass and find support on your journey!",
    "scholarships.searchPlaceholder": "Search by scholarship name, requirements, or keywords...",
    "scholarships.allEligibility": "All eligibility",
    "scholarships.globalEligibility": "Global / Turkey",
    "scholarships.usOnly": "US only",
    "scholarships.allStatuses": "All statuses",
    "scholarships.openApplications": "Open applications",
    "scholarships.closed": "Closed",
    "scholarships.allLevels": "All levels",
    "scholarships.prestigiousOnly": "Prestigious only",
    "scholarships.filter": "Filter",
    "scholarships.count": "{count} scholarships listed",
    "scholarships.clearFilters": "Clear filters",
    "scholarships.noResults": "No Results Found",
    "scholarships.noResultsDescription": "There are no scholarship opportunities matching your criteria. Try different filters or broaden your search.",
    "scholarships.requirements": "Requirements:",
    "scholarships.prestigious": "Prestigious Opportunity",
    "scholarships.closedBadge": "Closed",
    "scholarships.openBadge": "Open",
    "scholarships.deadline": "Deadline",
    "scholarships.rolling": "Ongoing (Rolling)",
    "scholarships.apply": "Apply",
    "scholarships.viewDetails": "View details →",

    "detail.back": "← Back to all opportunities",
    "detail.closed": "Applications Closed",
    "detail.open": "Applications Open",
    "detail.location": "Location",
    "detail.duration": "Duration / Process",
    "detail.season": "Term",
    "detail.deadline": "Application Deadline",
    "detail.scholarshipAmount": "Scholarship Amount",
    "detail.financialSupport": "Financial Support",
    "detail.entryFee": "Entry Fee",
    "detail.free": "Free",
    "detail.targetGrades": "Target Grades",
    "detail.grades": "Grades",
    "detail.description": "Description / Details",
    "detail.requirements": "Participation Conditions & Requirements",
    "detail.visitOfficial": "Visit Official Application Site",

    "auth.loading": "Loading...",
    "auth.signIn": "Sign in",
    "auth.signInDescription": "Sign in to your account",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.signingIn": "Signing in...",
    "auth.signedIn": "Successfully signed in!",
    "auth.invalidCredentials": "Incorrect email or password",
    "auth.noAccount": "Don't have an account?",
    "auth.register": "Register",
    "auth.signUp": "Sign up",
    "auth.newAccount": "Create a new account",
    "auth.fullName": "Full name",
    "auth.fullNamePlaceholder": "Your full name",
    "auth.passwordPlaceholder": "At least 8 characters",
    "auth.confirmPassword": "Confirm password",
    "auth.confirmPasswordPlaceholder": "Enter your password again",
    "auth.sendingCode": "Sending code...",
    "auth.continue": "Continue",
    "auth.haveAccount": "Already have an account?",
    "auth.enterCode": "Enter the code",
    "auth.codeSent": "enter the 6-digit code sent to",
    "auth.verifying": "Verifying...",
    "auth.createAccount": "Create account",
    "profile.title": "Profile",
    "profile.description": "View and manage your account information",
    "profile.editActivity": "Manage Opportunities",
  },
}

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, values?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function resolveLocale(): Locale {
  if (typeof window === "undefined") return "tr"

  const savedLocale = window.localStorage.getItem(STORAGE_KEY)
  if (savedLocale === "en" || savedLocale === "tr") return savedLocale

  const systemLanguages = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language]

  for (const language of systemLanguages) {
    const baseLanguage = language.toLowerCase().split("-")[0]
    if (baseLanguage === "en") return "en"
    if (baseLanguage === "tr") return "tr"
  }

  return "tr"
}

function interpolate(message: string, values?: Record<string, string | number>) {
  if (!values) return message
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    message
  )
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("tr")
  const hasResolvedLocale = useRef(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      hasResolvedLocale.current = true
      setLocale(resolveLocale())
    }, 0)
    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (hasResolvedLocale.current) {
      window.localStorage.setItem(STORAGE_KEY, locale)
    }
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, values) => interpolate(messages[locale][key] ?? messages.tr[key] ?? key, values),
    }),
    [locale]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}

export function T({ k, values }: { k: string; values?: Record<string, string | number> }) {
  return useLanguage().t(k, values)
}

export function LocaleText({
  tr,
  en,
  values,
}: {
  tr: string
  en: string
  values?: Record<string, string | number>
}) {
  const { locale } = useLanguage()
  return interpolate(locale === "en" ? en : tr, values)
}

export function LocalizedDescription({ text }: { text: string }) {
  const { locale } = useLanguage()
  const [turkishText, englishText] = text.split(/\n\n\[(?:English Summary|English)\]\s*/i)
  return locale === "en" && englishText ? englishText.trim() : turkishText.trim()
}

export function LocalizedInput({
  trPlaceholder,
  enPlaceholder,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> & {
  trPlaceholder: string
  enPlaceholder: string
}) {
  const { locale } = useLanguage()
  return <input {...props} placeholder={locale === "en" ? enPlaceholder : trPlaceholder} />
}
