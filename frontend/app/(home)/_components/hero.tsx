"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Waves } from "@/components/ui/waves-background"
import Link from "next/link"

function Hero() {
  const { theme } = useTheme()
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ["yield optimization", "portfolio rebalancing", "yield strategies"],
    [],
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <div className="relative w-full bg-[#101010]">
      <div className="absolute inset-0">
        <Waves
          lineColor={
            theme === "dark" ? "rgb(242 150 0 / 0.3)" : "rgb(242 150 0 / 0.2)"
          }
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>
      <div className="container relative mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-16 lg:py-32">
          <div className="flex flex-col gap-4">
            <h1 className="max-w-2xl text-center font-regular text-5xl text-white tracking-tighter md:text-7xl">
              <span className="text-spektr-cyan-50">
                The agentic platform for automated DeFi
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pt-1 md:pb-4">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={title}
                    className="absolute font-semibold text-[#F29600]"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="max-w-2xl text-center font-medium text-lg text-white/60 leading-relaxed tracking-tight md:text-xl">
              Necta automates and optimizes your stablecoin yield strategies
              across multiple DeFi protocols. Maximize returns 24/7 with no
              manual tracking – fully on-chain and self-custodial.
            </p>
          </div>
          <Button
            size="lg"
            className="gap-4 rounded-[24px] bg-[#F29600] px-8 py-6 font-medium text-[16px] text-white hover:bg-[#F29600]/80"
            asChild
          >
            <Link href="/app">
              START EARNING <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export { Hero }
