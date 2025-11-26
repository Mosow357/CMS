import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import TranslationProvider from "@/components/providers/translation-provider";
import Navbar from "@/components/landingpage/navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebApp",
  description: "WebApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Translation provider centraliza idioma */}
          <TranslationProvider>
          {/* 🔹 Navbar arriba */}
          <Navbar />

          {/* 🔹 Contenido principal */}
          <main className="min-h-screen">{children}</main>

          {/* 🔹 Toggle de tema e idioma abajo a la derecha */}
          <div className="fixed bottom-4 right-4 flex gap-2 z-50">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
