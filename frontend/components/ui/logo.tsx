import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "default" | "dark"
  className?: string
}

export function Logo({ variant = "default", className }: LogoProps) {
  return (
    <Link href="/" className={cn("block", className)}>
      <Image
        src={variant === "dark" ? "/logo/logo-dark.svg" : "/logo/logo.svg"}
        alt="Necta Finance Logo"
        width={120}
        height={32}
        priority
      />
    </Link>
  )
}
