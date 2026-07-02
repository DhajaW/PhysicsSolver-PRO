import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Physics Solver Pro",
  description: "Master A/L Physics simply and correctly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="si"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* මෙතන flex-col සහ min-h-screen එකතු කළා */}
      <body suppressHydrationWarning className="flex flex-col min-h-screen"> 
        {/* main එකට flex-grow දුන්නා, එතකොට Footer එක පහළටම යනවා */}
        <main className="flex-grow"> 
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}