// app/layout.tsx

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Compass - Staj ve Fırsatlar Platformu",
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
  authors: [{ name: "Compass" }],
  metadataBase: new URL("https://snowday-flax.vercel.app"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://snowday-flax.vercel.app",
    title: "Compass - Staj ve Fırsatlar Platformu",
    description:
      "Türkiye'deki lise ve üniversite öğrencileri için staj, yarışma, gönüllülük ve gelişim fırsatları platformu.",
    siteName: "Compass",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Compass",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compass - Staj ve Fırsatlar Platformu",
    description:
      "Türkiye'deki lise ve üniversite öğrencileri için staj, yarışma, gönüllülük ve gelişim fırsatları platformu.",
    images: ["/icon.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}