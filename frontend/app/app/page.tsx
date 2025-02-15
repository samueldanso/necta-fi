"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ProtocolScroll } from "@/components/ui/protocol-scroll";
import { Connect } from "@/components/app/connect";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function AppPage() {
  const { isConnected } = useAccount();
  const router = useRouter();
  // Removed smart account check for MVP

  return (
    <main className="flex min-h-[calc(100vh-128px)] flex-col items-center justify-center px-4 pt-24">
      <div className="flex w-full max-w-[800px] flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="font-semibold text-2xl text-white md:text-3xl lg:text-[40px]">
            {!isConnected
              ? "The Best Way to Earn DeFi Yields In 2-Click"
              : "Ready to Start Earning"}
          </h1>
          <p className="max-w-[600px] text-base text-white/60 md:text-lg">
            {!isConnected
              ? "Welcome to the era of intelligent yield optimization."
              : "Your wallet is connected. Deposit USDC to activate agents."}
          </p>

          {!isConnected ? (
            <Connect />
          ) : (
            <Button
              className="gap-2 bg-[#F29600] px-8 text-white hover:bg-[#F29600]/80"
              onClick={() => router.push("/app/setup")}
            >
              <Rocket className="h-4 w-4" />
              Activate Agents
            </Button>
          )}
        </div>

        <div className="relative w-full">
          <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent" />
          <div className="w-full">
            <ProtocolScroll />
          </div>
          <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-[#111111] via-[#111111]/80 to-transparent" />
        </div>
      </div>
    </main>
  );
}
