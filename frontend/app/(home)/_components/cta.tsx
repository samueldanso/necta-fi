"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container space-y-12 py-12 lg:py-24">
        <div className="relative z-10 mx-auto max-w-[1250px]">
          <div className="relative overflow-hidden rounded-[24px] bg-black px-4 py-32 text-center">
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary15 to-transparent" />

            <div className="relative z-10 mx-auto flex max-w-[58rem] flex-col items-center">
              <h2 className="font-heading font-semibold text-4xl text-background sm:text-5xl md:text-5xl">
                Ready to Maximize Your DeFi Returns?
              </h2>
              <p className="mt-6 max-w-[85%] text-lg text-muted leading-relaxed sm:text-xl">
                Deploy an agent that monitors and reallocates your assets for
                the highest APYs—24/7, with no custody required.
              </p>
              <div className="mt-8">
                <Link href="/app">
                  <Button className="relative rounded-full bg-gradient-to-t from-orange-600 via-orange-600 to-orange-500/80 px-8 py-6 font-medium text-lg text-white shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 ease-out before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-transparent before:to-white/20 hover:scale-[1.02] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.25)] hover:before:to-white/30 active:scale-[0.98]">
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
