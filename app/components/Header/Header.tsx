import React, { useState } from "react";
import { ArrowRight, Wallet, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "../shared";
import { CivicAuth } from "../CivicAuth";
import { Profile } from "../Profile";
import { useUser } from "@civic/auth-web3/react";
import { useWallet } from "@civic/auth-web3/react";

type HeaderProps = {
  isMainPage?: boolean;
};

const Header: React.FC<HeaderProps> = ({ isMainPage }) => {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  
  // Safely get wallet info with error handling
  let address: string | undefined;
  let isConnected = false;
  
  try {
    const wallet = useWallet({ type: "ethereum" });
    address = wallet?.address;
    isConnected = !!wallet?.address;
  } catch (error) {
    console.log("Wallet not available yet:", error);
  }

  const handleCopyAddress = async () => {
    if (!address) return;
    
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-semibold tracking-tight">Game Portal</span>
        </div>

        <div className="flex items-center gap-3">
          {isMainPage ? (
            <Button
              className="gap-2"
              onClick={() => (window.location.href = "/explore")}
            >
              Launch App <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <></>
          )}

          {/* Show profile if user is logged in, otherwise show auth */}
          {user ? (
            <div className="flex items-center gap-3">
              {isConnected && address && (
                <div 
                  className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  onClick={handleCopyAddress}
                  title="Click to copy wallet address"
                >
                  <Wallet className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-mono text-blue-700 dark:text-blue-300">
                    {`${address.slice(0, 6)}...${address.slice(-4)}`}
                  </span>
                  {copied ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-blue-600" />
                  )}
                </div>
              )}
              <Profile variant="compact" />
            </div>
          ) : (
            <CivicAuth />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
