"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FEATURES } from "@/lib/constants/home"

export function FeaturesSection() {
  return (
    <section className="relative bg-[#101010] py-24 sm:py-32">
      <div className="container mx-auto max-w-[1150px] px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-bold text-4xl text-white tracking-tight sm:text-5xl">
            Intelligent yield optimization machine
          </h2>
          <p className="text-gray-400 text-lg">
            Experience the future of automated DeFi yield optimiztion and
            portfolio management
          </p>
        </div>

        <div className="relative mt-16">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex justify-between">
            <div className="w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div className="w-px translate-x-[200%] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((FEATURE) => (
              <Card
                key={FEATURE.id}
                className="group relative overflow-hidden border-[#F29600]/50 bg-black/50 p-6 transition-colors hover:border-white/10"
              >
                <div className="mb-4 text-white">{FEATURE.icon}</div>
                <Badge
                  variant="outline"
                  className="mb-3 border-[#F29600]/30 text-[#F29600]"
                >
                  {FEATURE.badge}
                </Badge>
                <h3 className="mb-2 font-bold text-white text-xl">
                  {FEATURE.title}
                </h3>
                <p className="text-base text-gray-400">{FEATURE.description}</p>

                {/* Hover Effect */}
                <div className="-z-10 absolute inset-0 bg-gradient-to-br from-[#F29600]/10 via-[#F29600]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
