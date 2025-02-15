"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NETWORKS } from "@/lib/constants/app";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useSwitchChain, useChainId } from "wagmi";
import { base, arbitrum, type Chain } from "viem/chains";

// Define Mantle chain
const mantle = {
  id: 5000,
  name: "Mantle",
  network: "mantle",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT",
  },
  rpcUrls: {
    default: { http: ["https://rpc.mantle.xyz"] },
    public: { http: ["https://rpc.mantle.xyz"] },
  },
  blockExplorers: {
    default: { name: "MantleScan", url: "https://mantlescan.xyz" },
  },
} as const;

interface NetworkData {
  name: string;
  icon: string;
  chain: Chain;
}

const chainData = new Map<number, NetworkData>([
  [mantle.id, { name: "Mantle", icon: "/protocols/mantle.svg", chain: mantle }],
  [base.id, { ...NETWORKS[1], chain: base }],
  [arbitrum.id, { ...NETWORKS[2], chain: arbitrum }],
]);

const defaultNetwork: NetworkData = {
  name: "Mantle",
  icon: "/protocols/mantle.svg",
  chain: mantle,
};

export function NetworkSelector() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const selectedNetwork = chainData.get(chainId) || defaultNetwork;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/10 px-3 text-[15px] text-white/90 shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm transition-colors hover:bg-black/20"
        >
          <div className="relative h-5 w-5">
            <Image
              src={selectedNetwork.icon}
              alt={`${selectedNetwork.name} icon`}
              fill
              className="rounded-full object-contain"
            />
          </div>
          {selectedNetwork.name}
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[140px] rounded-lg border border-white/[0.08] bg-black/10 p-1.5 text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm"
      >
        {Array.from(chainData.entries()).map(([_id, { name, icon, chain }]) => (
          <DropdownMenuItem
            key={chain.id}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[15px] text-white/90 transition-colors hover:bg-black/20"
            onClick={() => switchChain({ chainId: chain.id })}
          >
            <div className="relative h-5 w-5">
              <Image
                src={icon}
                alt={`${name} icon`}
                fill
                className="rounded-full object-contain"
              />
            </div>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
