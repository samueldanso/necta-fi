import "@/styles/globals.css"
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { WalletProvider } from "@/components/providers/wallet-provider"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "NectaFi",
  description: "AI-Powered Yield Optimization",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-black font-sans antialiased",
          plusJakartaSans.variable,
          dmSans.variable,
        )}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}
