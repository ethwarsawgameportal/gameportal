"use client";

import React from "react";
import { useUser, useWallet } from "@civic/auth-web3/react";
import { useBalance } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Wallet, 
  Copy, 
  ExternalLink, 
  CheckCircle,
  Coins,
  Network
} from "lucide-react";
import { useState } from "react";

interface ProfileProps {
  variant?: "compact" | "full";
  className?: string;
}

export const Profile: React.FC<ProfileProps> = ({ variant = "full", className = "" }) => {
  const userContext = useUser();
  const { user } = userContext;
  const { address } = useWallet({ type: "ethereum" });
  const { data: balance } = useBalance({
    address: address,
  });
  const [copied, setCopied] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  const handleCopyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setShowCopiedMessage(true);
        setTimeout(() => {
          setCopied(false);
          setShowCopiedMessage(false);
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setShowCopiedMessage(true);
        setTimeout(() => {
          setCopied(false);
          setShowCopiedMessage(false);
        }, 2000);
      }
    }
  };

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (balance: any) => {
    if (!balance) return "0.0000 ETH";
    return `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`;
  };

  if (variant === "compact") {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {user.email || user.name || "User"}
            </span>
            {address && (
              <button
                onClick={handleCopyAddress}
                className="text-xs text-slate-500 dark:text-slate-400 font-mono hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                title="Click to copy full address"
              >
                {formatAddress(address)}
              </button>
            )}
          </div>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Toast notification for copy feedback */}
      {showCopiedMessage && (
        <div className="absolute top-0 right-0 z-50 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-2 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-top-2 duration-300">
          Address copied to clipboard!
        </div>
      )}
      
      <Card className={`w-full ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </CardTitle>
        </CardHeader>
      <CardContent className="space-y-4">
        {/* User Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</span>
            <span className="text-sm text-slate-900 dark:text-white">
              {user.email || "Not provided"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Name</span>
            <span className="text-sm text-slate-900 dark:text-white">
              {user.name || "Not provided"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Status</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>

        {/* Wallet Info */}
        {address && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-slate-900 dark:text-white">Wallet Information</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Address</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyAddress}
                    className="text-sm font-mono text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                    title="Click to copy full address"
                  >
                    {formatAddress(address)}
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyAddress}
                    className="h-6 w-6 p-0"
                    title="Copy address"
                  >
                    {copied ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Balance</span>
                <div className="flex items-center space-x-1">
                  <Coins className="w-3 h-3 text-yellow-600" />
                  <span className="text-sm text-slate-900 dark:text-white">
                    {formatBalance(balance)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Network</span>
                <div className="flex items-center space-x-1">
                  <Network className="w-3 h-3 text-blue-600" />
                  <span className="text-sm text-slate-900 dark:text-white">Base</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Type</span>
                <Badge variant="outline" className="text-xs">
                  Civic Embedded
                </Badge>
              </div>
            </div>

            {/* Full Address Display */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Full Address</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="h-6 px-2 text-xs"
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <p className="text-xs font-mono text-slate-700 dark:text-slate-300 break-all mt-1">
                {address}
              </p>
            </div>

            {/* External Links */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => window.open(`https://basescan.org/address/${address}`, '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View on BaseScan
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
};
