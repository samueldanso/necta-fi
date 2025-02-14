"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, ChevronRight, Wallet, Shield } from "lucide-react"

type SetupStep = "deploy" | "deposit"

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState<SetupStep>("deploy")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDeploy = async () => {
    setIsLoading(true)
    // Simulate deployment
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setCurrentStep("deposit")
  }

  const handleDeposit = async () => {
    setIsLoading(true)
    // Simulate deposit
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    router.push("/app/dashboard")
  }

  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center px-4 pt-[72px]">
      <Card className="relative w-full max-w-[500px] overflow-hidden border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
        {/* Progress Bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-white/[0.08]">
          <div
            className="h-full bg-[#F29600] transition-all duration-300"
            style={{ width: currentStep === "deploy" ? "50%" : "100%" }}
          />
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-2xl text-white">
              {currentStep === "deploy"
                ? "Deploy Smart Account"
                : "Initial Deposit"}
            </h1>
            <p className="mt-1 text-white/60">
              Step {currentStep === "deploy" ? "1" : "2"} of 2
            </p>
          </div>
          <div className="rounded-full bg-white/[0.08] p-3">
            {currentStep === "deploy" ? (
              <Shield className="h-6 w-6 text-[#F29600]" />
            ) : (
              <Wallet className="h-6 w-6 text-[#F29600]" />
            )}
          </div>
        </div>

        {currentStep === "deploy" ? (
          <>
            <div className="space-y-4">
              <div className="rounded-lg bg-white/[0.05] p-4">
                <h3 className="font-medium text-white">Benefits</h3>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-[#F29600]" />
                    Full self-custody - only you control your funds
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-[#F29600]" />
                    No token approvals needed
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-[#F29600]" />
                    Gas-optimized operations
                  </li>
                </ul>
              </div>

              <Button
                className="w-full gap-2 bg-[#F29600] py-6 text-white hover:bg-[#F29600]/80"
                onClick={handleDeploy}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
                Deploy Smart Account
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-6">
              <div>
                <Input
                  type="number"
                  placeholder="Enter USDC amount"
                  className="h-14 border-white/[0.08] bg-white/[0.05] text-lg text-white placeholder:text-white/40"
                />
                <p className="mt-2 text-sm text-white/40">
                  Minimum deposit: 10 USDC
                </p>
              </div>

              <div className="rounded-lg bg-white/[0.05] p-4">
                <h3 className="font-medium text-white">What's Next?</h3>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-[#F29600]" />
                    Automatic yield optimization across protocols
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-[#F29600]" />
                    Withdraw your funds anytime
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-[#F29600]" />
                    24/7 automated management
                  </li>
                </ul>
              </div>

              <Button
                className="w-full gap-2 bg-[#F29600] py-6 text-white hover:bg-[#F29600]/80"
                onClick={handleDeposit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
                Deposit & Activate Agents
              </Button>
            </div>
          </>
        )}
      </Card>
    </main>
  )
}
