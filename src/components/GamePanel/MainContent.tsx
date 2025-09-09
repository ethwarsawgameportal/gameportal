import React from "react";
import { cn } from "@/src/app/utils/utils";
import { MarketItem } from "./types";
import GameCard from "./GameCard";
import { useAccount } from "wagmi";
// import { WalletInfo } from "../CivicAuth";

interface MainContentProps {
  open: boolean;
  filteredItems: MarketItem[];
}

const MainContent: React.FC<MainContentProps> = ({ open, filteredItems }) => {
  const { address: wagmiAddress } = useAccount();

  return (
    <main
      className={cn(
        "flex-1 p-6 transition-[margin] overflow-y-auto h-full mb-5 custom-scroll",
        open ? "md:ml-0" : "md:ml-0",
      )}
    >
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 text-center">
        Explore Games
      </h1>

      {/* Wallet Information Section - Show when user is not logged in */}
      {!wagmiAddress && <div className="mb-6">{/* <WalletInfo /> */}</div>}

      {filteredItems.length === 0 ? (
        <div className="text-sm text-slate-500">
          No results — change filters or query.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 overflow-y-auto mb-10 custom-scroll">
          {filteredItems.map((item) => (
            <GameCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
};

export default MainContent;
