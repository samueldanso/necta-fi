"use client"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { AgentStatusCard } from "@/components/dashboard/agent-status-card"
import { Button } from "@/components/ui/button"
import { WithdrawModal } from "@/components/dashboard/withdraw-modal"
import { DeactivateModal } from "@/components/dashboard/deactivate-modal"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const {
    agents,
    thoughts,
    walletData,
    isLoading,
    error,
    fetchAgentStatus,
    fetchThoughts,
    fetchWalletData,
  } = useAppStore()
  const router = useRouter()

  useEffect(() => {
    // Initial fetch
    fetchAgentStatus()
    fetchThoughts()
    fetchWalletData()

    // Set up polling intervals
    const statusInterval = setInterval(fetchAgentStatus, 10000) // Every 10s
    const thoughtsInterval = setInterval(fetchThoughts, 5000) // Every 5s
    const walletInterval = setInterval(fetchWalletData, 30000) // Every 30s

    return () => {
      clearInterval(statusInterval)
      clearInterval(thoughtsInterval)
      clearInterval(walletInterval)
    }
  }, [fetchAgentStatus, fetchThoughts, fetchWalletData])

  const handleWithdraw = async (amount: string) => {
    // TODO: Implement withdraw functionality
    console.log("Withdrawing amount:", amount)
  }

  const handleDeactivate = async () => {
    // TODO: Implement deactivate functionality
    console.log("Deactivating agents")
  }

  if (error) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-72px)] items-center justify-center px-4 pt-24">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (isLoading && !agents.length && !thoughts.length && !walletData) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-72px)] items-center justify-center px-4 pt-24">
        <p className="text-white/60">Loading dashboard data...</p>
      </div>
    )
  }

  // Get the first position for the main display
  const mainPosition = walletData?.positions[0]

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mx-auto w-full max-w-[1000px] space-y-6">
        {/* Main Position Value */}
        <Card className="border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-white/60">Position Value</h2>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="font-semibold text-3xl text-white">
                  ${mainPosition?.value || "0.00"}
                </p>
                <span className="text-green-500 text-sm">+0.00%</span>
              </div>
            </div>
            {mainPosition && (
              <div className="text-right">
                <p className="font-medium text-white">
                  {mainPosition.protocol}
                </p>
                <p className="text-sm text-white/60">
                  {mainPosition.amount} USDC
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-6 border-white/[0.08] border-t pt-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-white/60">Current APY</p>
              <p className="mt-1 font-medium text-white text-xl">
                {walletData?.averageApy.toFixed(2) || "0.00"}%
              </p>
            </div>
            <div>
              <p className="text-sm text-white/60">Initial Deposit</p>
              <p className="mt-1 font-medium text-white text-xl">
                {mainPosition?.amount || "0"} USDC
              </p>
            </div>
            <div>
              <p className="text-sm text-white/60">Activation Date</p>
              <p className="mt-1 font-medium text-white text-xl">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Agent Status Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {agents.map((agent) => (
            <AgentStatusCard key={agent.agent} agent={agent} />
          ))}
        </div>

        {/* Smart Account Management */}
        <Card className="border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-medium text-lg text-white">
                Brahma Safe Account
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Your self-custodial smart account for automated yield
                optimization
              </p>
            </div>
            <div className="flex gap-3">
              <DeactivateModal
                onDeactivate={handleDeactivate}
                trigger={
                  <Button
                    variant="outline"
                    className="border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  >
                    Deactivate Agents
                  </Button>
                }
              />
              <WithdrawModal
                maxAmount={mainPosition?.amount || "0"}
                onWithdraw={handleWithdraw}
                trigger={
                  <Button
                    variant="outline"
                    className="border-[#F29600]/20 bg-[#F29600]/10 text-[#F29600] hover:bg-[#F29600]/20"
                  >
                    Withdraw Funds
                  </Button>
                }
              />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Safe Account Address</p>
                  <p className="mt-1 font-medium text-white">
                    {walletData?.address || "Not deployed"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="text-white/60 hover:text-white"
                    onClick={() => {
                      navigator.clipboard.writeText(walletData?.address || "")
                    }}
                  >
                    Copy Address
                  </Button>
                  {walletData?.address && (
                    <Button
                      variant="ghost"
                      className="text-white/60 hover:text-white"
                      onClick={() => {
                        window.open(
                          `https://basescan.org/address/${walletData.address}`,
                          "_blank",
                        )
                      }}
                    >
                      View on Explorer
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Safe Account Balance</p>
                  <p className="mt-1 font-medium text-white">
                    {walletData?.balance || "0"} USDC
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-[#F29600]/20 bg-[#F29600]/10 text-[#F29600] hover:bg-[#F29600]/20"
                  onClick={() => router.push("/app/setup")}
                >
                  Deposit More
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Agent Execution History */}
        <Card className="border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
          <h2 className="mb-4 font-medium text-lg text-white">
            Agent Execution History
          </h2>
          <div className="space-y-3">
            {thoughts.slice(0, 3).map((thought) => (
              <div
                key={thought.id}
                className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.02] p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08]">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{thought.agent}</p>
                    <p className="text-sm text-white/60">{thought.message}</p>
                  </div>
                </div>
                <span className="text-sm text-white/40">
                  {new Date(thought.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
