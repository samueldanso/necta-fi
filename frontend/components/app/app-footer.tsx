"use client"

import Link from "next/link"
import { APP_LINKS, APP_SOCIALS } from "@/lib/constants/app"

export function AppFooter() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} NectaFi. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {APP_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[16px] text-white/60 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {APP_SOCIALS.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
