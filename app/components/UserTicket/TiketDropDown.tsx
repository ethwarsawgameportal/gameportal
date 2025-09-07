"use client";

import React from "react";
import { useUser } from "@civic/auth-web3/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Ticket } from "lucide-react";
import { useWallet } from "@civic/auth-web3/react";
import { Button } from "../DemoComponents";

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
      <CardHeader className="pb-0">
        <h3 className="text-lg font-semibold mb-4">User Tickets</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Referral Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div>
              <p className="text-sm font-medium">Total Tickets</p>
            </div>
            <span className="text-lg font-bold text-blue-600">0</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="border-t pt-4">
          <Button
            className="w-full text-white"
            onClick={() => (window.location.href = "/tickets")}
          >
            Buy more tickets
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
