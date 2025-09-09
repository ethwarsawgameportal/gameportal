"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { Button } from "@/src/components/ui/button";
import { Wallet } from "lucide-react";

const WalletConnect = () => {
  const { address } = useAccount();
  const { open } = useAppKit();
  const onConnect = () => {
    open?.();
  };

  const { data: balance } = useBalance({
    address,
  });

  const balanceFormatted = Number(
    formatUnits(balance?.value ?? BigInt(0), balance?.decimals ?? 18),
  ).toFixed(4);

  return (
    <Button
      variant="ghost"
      onClick={onConnect}
      className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <Wallet className="w-4 h-4 text-slate-600 dark:text-slate-400" />
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-slate-900 dark:text-white">
          {address
            ? `${address.slice(0, 4)}...${address.slice(-4)}`
            : "Connect Wallet"}
        </span>
        {address && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {balanceFormatted} ETH
          </span>
        )}
      </div>
    </Button>
  );
};

export default WalletConnect;
