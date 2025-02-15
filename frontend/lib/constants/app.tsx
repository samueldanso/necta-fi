import { Github, Twitter } from "lucide-react";

interface AppMenuItem {
  href: string;
  title: string;
  icon?: React.ReactNode;
}

export const APP_MENU: AppMenuItem[] = [];

export const APP_LINKS = [
  {
    name: "Blog",
    href: "http://blog.nectafi.xyz",
  },
  {
    name: "Docs",
    href: "http://blog.nectafi.xyz/docs",
  },
] as const;

export const APP_SOCIALS = [
  {
    name: "X",
    href: "https://x.com/nectalabs",
    icon: Twitter,
  },
  {
    name: "GitHub",
    href: "https://github.com/nectalabs",
    icon: Github,
  },
] as const;

export const NETWORKS = [
  {
    name: "Mantle",
    icon: "/protocols/mantle.svg",
  },
  {
    name: "Base",
    icon: "/protocols/base.svg",
  },
  {
    name: "Arbitrum",
    icon: "/protocols/arbitrum.svg",
  },
] as const;

export const PROTOCOLS = [
  {
    name: "AAVE",
    apy: "5.02%",
    icon: "/protocols/aave.svg",
  },
  {
    name: "Compound",
    apy: "5.87%",
    icon: "/protocols/compound.svg",
  },
  {
    name: "Morpho",
    apy: "10.78%",
    icon: "/protocols/morpho.png",
  },
] as const;
