"use client";

import React, { useState } from "react";
import { useUser } from "@civic/auth-web3/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  CheckCircle,
  Wallet,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { useWallet } from "@civic/auth-web3/react";

interface ProfileProps {
  variant?: "compact" | "full";
  className?: string;
}

export const Profile: React.FC<ProfileProps> = ({
  variant = "full",
  className = "",
}) => {
  const userContext = useUser();
  const { user } = userContext;
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

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

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
            {isConnected && address ? (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {`${address.slice(0, 6)}...${address.slice(-4)}`}
              </span>
            ) : (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Identity Verified
              </span>
            )}
          </div>
        </div>
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      </div>
    );
  }

  return (
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
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Email
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-900 dark:text-white">
                {user.email || "Not provided"}
              </span>
              {user.email && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (user.email) {
                      navigator.clipboard.writeText(user.email);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }
                  }}
                  className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-600" />
                  )}
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Name
            </span>
            <span className="text-sm text-slate-900 dark:text-white">
              {user.name || "Not provided"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Status
            </span>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>

        {/* Identity Information */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="font-medium text-slate-900 dark:text-white">
              Identity Information
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Provider
              </span>
              <span className="text-sm text-slate-900 dark:text-white">
                Civic Auth
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Verification
              </span>
              <Badge variant="outline" className="text-xs">
                Identity Verified
              </Badge>
            </div>
          </div>
        </div>

        {/* Wallet Information */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-slate-900 dark:text-white">
              Wallet Information
            </span>
          </div>

          {isConnected && address ? (
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Address
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-blue-700 dark:text-blue-300">
                      {`${address.slice(0, 6)}...${address.slice(-4)}`}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyAddress}
                      className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-800"
                    >
                      {copied ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-blue-600" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open(
                          `https://basescan.org/address/${address}`,
                          "_blank",
                        )
                      }
                      className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-800"
                    >
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Network
                  </span>
                  <span className="text-sm text-blue-700 dark:text-blue-300">
                    Base
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Wallet Type
                  </span>
                  <span className="text-sm text-blue-700 dark:text-blue-300">
                    Civic Embedded
                  </span>
                </div>
                <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Full Address
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-blue-700 dark:text-blue-300 break-all">
                        {address}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyAddress}
                        className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-800 flex-shrink-0"
                      >
                        {copied ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-blue-600" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Wallet is being created automatically. Please wait...
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
