"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface WithdrawModalProps {
  maxAmount: string
  onWithdraw: (amount: string) => Promise<void>
  trigger: React.ReactNode
}

export function WithdrawModal({
  maxAmount,
  onWithdraw,
  trigger,
}: WithdrawModalProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleWithdraw = async () => {
    try {
      setError(null)
      setIsLoading(true)
      await onWithdraw(amount)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to withdraw funds")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            Withdraw Funds
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <div>
            <Input
              type="number"
              placeholder="Enter USDC amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-14 border-white/[0.08] bg-white/[0.05] text-lg text-white placeholder:text-white/40"
            />
            <p className="mt-2 text-sm text-white/40">
              Available: {maxAmount} USDC
            </p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="rounded-lg bg-white/[0.05] p-4">
            <h3 className="font-medium text-white">Important Note</h3>
            <p className="mt-2 text-sm text-white/60">
              Withdrawing funds will automatically deactivate agents for the
              withdrawn amount. Your remaining funds (if any) will continue to
              earn yield.
            </p>
          </div>

          <Button
            className="w-full gap-2 bg-[#F29600] py-6 text-white hover:bg-[#F29600]/80"
            onClick={handleWithdraw}
            disabled={
              isLoading ||
              !amount ||
              Number(amount) <= 0 ||
              Number(amount) > Number(maxAmount)
            }
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Confirm Withdrawal"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
