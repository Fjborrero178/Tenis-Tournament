import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './provider'
import {Navbar} from "./components/navbar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Liga de Tenis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body> 
      <Navbar/>
      <Providers>{children}</Providers> 
      </body>
      
    </html>
  )
}
