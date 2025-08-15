import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HEIC to PNG Converter - Free Online Image Converter",
  description: "Convert HEIC and HEIF images to PNG format instantly. Free, fast, and secure online converter. Upload single or multiple files at once. No registration required.",
  keywords: "HEIC converter, PNG converter, HEIF to PNG, image converter, online converter, free converter",
  authors: [{ name: "HEIC Converter" }],
  creator: "HEIC Converter",
  publisher: "HEIC Converter",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://heictopng.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "HEIC to PNG Converter - Free Online Image Converter",
    description: "Convert HEIC and HEIF images to PNG format instantly. Free, fast, and secure online converter.",
    url: 'https://heictopng.vercel.app',
    siteName: 'HEIC to PNG Converter',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HEIC to PNG Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "HEIC to PNG Converter - Free Online Image Converter",
    description: "Convert HEIC and HEIF images to PNG format instantly. Free, fast, and secure online converter.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
