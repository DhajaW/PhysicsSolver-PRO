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
      {/* 1. Body එකට Grid Layout එකක් දෙමු */}
      <body suppressHydrationWarning className="min-h-screen grid grid-rows-[1fr_auto]"> 
        
        {/* 2. Main එකට 1fr ඉඩක් දෙමු */}
        <main> 
          {children}
        </main>
        
        {/* 3. Footer එක අන්තිමටම වැටේවි */}
        <Footer />
      </body>
    </html>
  );
}