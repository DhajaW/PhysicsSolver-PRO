import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer"; // 1. Footer එක මෙතන Import කරන්න

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. මෙතන ඔයාගේ App එකට ගැලපෙන නම සහ විස්තරය දාන්න
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
      lang="si" // Language එක සිංහලට මාරු කළා
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning> 
        <main className="min-h-screen"> {/* children ටික මේ Main tag එක ඇතුළේ තියෙන්න ඕනේ */}
          {children}
        </main>
        <Footer /> {/* 3. මෙතනින් Footer එක පේන්න ඕනේ */}
      </body>
    </html>
  );
}