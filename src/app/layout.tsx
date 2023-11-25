import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from './components/Auth/ToastProvider'
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "TaskSwift",
  description: 'Created By Padmanabh Malwade',
  icons: '/Images/favicon.png'
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={` select-none ${inter.className}`}>

        <ToastProvider>
          {children}
        </ToastProvider>

      </body>

    </html>
  )
}
