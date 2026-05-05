import type { Metadata, Viewport } from "next"
import { Public_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "安小居",
  description:
    "安小居是绍兴市越城区「码上安居」平台 AI 助手，提供物业投诉、建议、咨询等智能受理服务。",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#faf9f5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={publicSans.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <div className="mx-auto max-w-2xl">
          {children}
        </div>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
