import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Providers from '@/providers'
import AuthButton from '@/components/auth-button'
import Image from 'next/image'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Heavy Helms',
  description: 'A blockchain-based PvP combat game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Background with reduced opacity */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/parchment_bkg6.jpg"
          alt="Background"
          fill
          className="object-cover opacity-30 object-top"
          priority
        />
      </div>
        <Providers>
        <div className="flex flex-col from-slate-900 to-indigo-900">
                {/* Header */}
                <header className="w-full flex justify-center ">
          <div className="w-full max-w-[960px]">
            <Image
              src="/heavy_helms_header_drop_shadow.png"
              alt="Heavy Helms Header"
              width={960}
              height={320}
              className="w-full opacity-100"
              priority
            />
          </div>
        </header>
          <main className="flex flex-col flex-1">
            {children}
          </main>
          <Footer />
        </div>
        </Providers>
      </body>
    </html>
  )
} 