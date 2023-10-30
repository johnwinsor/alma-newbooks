import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Social from "@/components/Social";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Olin Library New Books',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="content flex flex-col">
          <Header />
          <Social />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}