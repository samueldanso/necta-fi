"use client"
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="h-10 w-10" />
    </div>
  )
}
