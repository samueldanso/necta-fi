"use client"

import { motion } from "framer-motion"
import { Logo } from "@/components/ui/logo"
import { Connect } from "@/components/app/connect"
import { NetworkSelector } from "@/components/app/network-selector"

export function AppHeader() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed inset-x-0 top-4 z-50 mx-auto max-w-[1200px] px-4"
    >
      <nav className="flex h-12 items-center justify-between rounded-[24px] border border-white/[0.1] bg-zinc-900/[0.65] backdrop-blur-md md:h-[56px]">
        <div className="flex items-center">
          <Logo className="px-4" />
        </div>

        <div className="flex items-center gap-2 px-2.5">
          <NetworkSelector />
          <Connect />
        </div>
      </nav>
    </motion.header>
  )
}
