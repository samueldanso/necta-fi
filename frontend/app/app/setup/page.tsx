"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ChevronRight, Wallet } from "lucide-react";

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeposit = async () => {
    setIsLoading(true);
    // Simulate deposit
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    router.push("/app/dashboard");
  };

  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center px-4 pt-[72px]">
      <Card className="relative w-full max-w-[500px] overflow-hidden border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
        {/* Progress Bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-[#F29600]" />

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-2xl text-white">
              Initial Deposit
            </h1>
            <p className="mt-1 text-white/60">Deposit USDC to start earning</p>
          </div>
          <div className="rounded-full bg-white/[0.08] p-3">
            <Wallet className="h-6 w-6 text-[#F29600]" />
          </div>
        </div>

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
      </Card>
    </main>
  );
}
