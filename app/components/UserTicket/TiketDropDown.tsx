"use client";

import React from "react";
import { useUser } from "@civic/auth-web3/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ShoppingBasket, Ticket } from "lucide-react";
import { useWallet } from "@civic/auth-web3/react";

interface TicketDropDownProps {
  variant?: "compact" | "full";
  className?: string;
}

export const TicketDropDown: React.FC<TicketDropDownProps> = ({
  variant = "full",
  className = "",
}) => {
  const userContext = useUser();
  const { user } = userContext;

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

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Ticket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
          <Ticket className="w-5 h-5" />
          <span>Your Tickets</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* User Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Ticket
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-900 dark:text-white">1</span>
            </div>
          </div>
        </div>

        {/* Identity Information */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <ShoppingBasket className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-slate-900 dark:text-white">
              Buy more tickets
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
