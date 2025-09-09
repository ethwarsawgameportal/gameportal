import type { Metadata } from "next";
import { TicketsPage } from "../../components/Tickets";

export const metadata: Metadata = {
  title: "Vibeez Arcade - Tickets",
  description:
    "Manage your gaming tickets in Vibeez Arcade! View your ticket collection, purchase new tickets, and participate in exclusive blockchain gaming events.",
  keywords: [
    "tickets",
    "gaming tickets",
    "blockchain tickets",
    "arcade games",
    "Web3",
    "crypto gaming",
    "NFT tickets",
  ],
  openGraph: {
    title: "Vibeez Arcade - Tickets",
    description:
      "Manage your gaming tickets in Vibeez Arcade! View your collection and participate in exclusive events.",
    type: "website",
  },
};

export default function Tickets() {
  return <TicketsPage />;
}
