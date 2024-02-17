import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Provider from "@/lib/Provider"
import Header from "@/components/Layouts/Header"
import ErrorPopup from "@/components/ErrorPopup"
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
