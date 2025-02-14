"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NAVBAR_MENU } from "@/lib/constants/home"

interface MobileNavProps {
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ onOpenChange }: MobileNavProps) {
  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      className="fixed inset-x-0 top-[65px] z-50 p-4"
    >
      <nav className="rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-black/[0.08] backdrop-blur-md dark:bg-zinc-800/80 dark:ring-white/[0.08]">
        <ul className="space-y-1.5">
          {NAVBAR_MENU.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="block rounded-[24px] px-3 py-2 font-medium text-[#23191A]/80 text-[16px] hover:text-[#F29600]"
                onClick={() => onOpenChange(false)}
              >
                {route.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/app"
          className={cn(
            buttonVariants({
              variant: "default",
              size: "default",
              className:
                "mt-4 flex h-12 w-full items-center justify-center rounded-[24px] bg-[#F29600] font-medium text-[15px]",
            }),
          )}
          onClick={() => onOpenChange(false)}
        >
          Launch App
        </Link>
      </nav>
    </motion.div>
  )
}
