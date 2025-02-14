"use client"

import { ConnectKitButton } from "connectkit"
import { Button } from "@/components/ui/button"

export function Connect() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        return (
          <Button
            className="h-9 rounded-[24px] bg-[#F29600] px-4 font-medium text-[14px] text-white hover:bg-[#F29600]/80 md:h-10 md:px-6 md:text-[16px]"
            onClick={show}
          >
            {isConnected
              ? (ensName ?? `${address?.slice(0, 6)}...${address?.slice(-4)}`)
              : "CONNECT"}
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
