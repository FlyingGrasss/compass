// app/layout.tsx

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { LanguageProvider } from "@/lib/i18n"
import { ThemeProvider } from "@/components/ThemeProvider"

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "YouthCompass - Staj ve Fırsatlar Platformu",
  description:
    "Türkiye'deki lise ve üniversite öğrencileri için staj, yarışma, gönüllülük ve gelişim fırsatları platformu. Binlerce fırsat keşfet!",
  keywords: [
    "staj",
    "internship",
    "türkiye",
    "öğrenci",
    "kariyer",
    "yarışma",
    "gönüllülük",
  ],
  authors: [{ name: "YouthCompass" }],
  metadataBase: new URL(appUrl),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: appUrl,
    title: "YouthCompass - Staj ve Fırsatlar Platformu",
    description:
      "Türkiye'deki lise ve üniversite öğrencileri için staj, yarışma, gönüllülük ve gelişim fırsatları platformu.",
    siteName: "YouthCompass",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "YouthCompass",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouthCompass - Staj ve Fırsatlar Platformu",
    description:
      "Türkiye'deki lise ve üniversite öğrencileri için staj, yarışma, gönüllülük ve gelişim fırsatları platformu.",
    images: ["/opengraph-image.jpg"],
  },
  icons: {
    icon: "/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("youthcompass-theme");if(t==="dark"||(t==null&&matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background flex flex-col min-h-screen`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
