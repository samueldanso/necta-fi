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
import { Loader2 } from "lucide-react"

interface DeactivateModalProps {
  onDeactivate: () => Promise<void>
  trigger: React.ReactNode
}

export function DeactivateModal({
  onDeactivate,
  trigger,
}: DeactivateModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDeactivate = async () => {
    try {
      setError(null)
      setIsLoading(true)
      await onDeactivate()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to deactivate agents",
      )
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
            Deactivate Agents
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <div className="rounded-lg bg-white/[0.05] p-4">
            <h3 className="font-medium text-white">Warning</h3>
            <p className="mt-2 text-sm text-white/60">
              Deactivating agents will stop all automated yield optimization
              activities. Your funds will remain in their current positions
              until you manually withdraw them.
            </p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            className="w-full gap-2 bg-red-500 py-6 text-white hover:bg-red-500/80"
            onClick={handleDeactivate}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Confirm Deactivation"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
