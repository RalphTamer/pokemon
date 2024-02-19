import "react-loading-skeleton/dist/skeleton.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

import Header from "@/components/Layouts/Header"
import ErrorPopup from "@/components/ErrorPopup"
import Provider from "@/lib/Provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pokedex interview challenge"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />
          <ErrorPopup />
          <div className="my-24">{children}</div>
        </Provider>
      </body>
    </html>
  )
}
