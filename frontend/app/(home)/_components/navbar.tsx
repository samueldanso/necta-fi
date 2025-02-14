"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import { Button, buttonVariants } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"
import { NAVBAR_MENU } from "@/lib/constants/home"
import { useWindow } from "@/hooks/use-window"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { isMobile } = useWindow()

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed inset-x-0 top-4 z-50 mx-auto px-4 transition-all duration-300",
        hasScrolled ? "max-w-[900px]" : "max-w-[1200px]",
      )}
    >
      <nav className="flex h-12 items-center justify-between rounded-[24px] bg-white/80 shadow-[0_4px_12px_0_rgba(0,0,0,0.08)] ring-1 ring-black/[0.08] backdrop-blur-md md:h-[56px] dark:bg-zinc-800/80 dark:ring-white/[0.08]">
        <div className="flex items-center">
          <Logo className="px-4" />
        </div>

        <div
          className={cn(
            "hidden flex-1 items-center md:flex",
            hasScrolled ? "justify-center" : "justify-end pr-8",
          )}
        >
          <ul className="flex items-center space-x-10">
            {NAVBAR_MENU.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className="font-medium text-[#23191A]/80 text-[16px] transition-colors hover:text-[#F29600]"
                >
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1 px-2.5">
          <Link
            href="/app"
            className={cn(
              buttonVariants({
                variant: "default",
                size: "default",
                className:
                  "md:h-12] hidden h-10 rounded-[24px] bg-[#F29600] px-4 font-medium text-[16px] text-white hover:bg-[#F29600]/80 md:inline-flex",
              }),
            )}
          >
            LAUNCH APP
          </Link>

          <Button
            size="icon"
            className="h-8 w-8 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isOpen && isMobile && <MobileNav onOpenChange={setIsOpen} />}
    </motion.header>
  )
}
