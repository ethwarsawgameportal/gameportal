"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Check, Zap, Crown, Ticket } from "lucide-react";
import Header from "../Header";
import { twMerge } from "tailwind-merge";
import { useAccount, useConfig, useWriteContract } from "wagmi";
import TICKET_ABI from "../../abi/TetrisGame.json";
import { TICKET_CONTRACT_ADDRESS } from "./contract";
import { waitForTransactionReceipt } from "viem/actions";
import { Toaster, toast } from "sonner";

interface TicketPlan {
  id: string;
  name: string;
  tokens: number;
  price: number;
  pricePerToken: number;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  features: string[];
  popular?: boolean;
}

const TICKET_PLANS: TicketPlan[] = [
  {
    id: "starter",
    name: "Starter Pack",
    tokens: 1,
    price: 0.00023,
    pricePerToken: 0.00023,
    icon: <Ticket className="w-6 h-6" />,
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    features: ["1 Game Token", "Access to all games", "Basic support"],
  },
  {
    id: "pro",
    name: "Pro Pack",
    tokens: 10,
    price: 0.0023,
    pricePerToken: 0.00023,
    icon: <Zap className="w-6 h-6" />,
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
    features: [
      "250 Game Tokens",
      "Access to all games",
      "Priority support",
      "Exclusive tournaments",
      "Advanced statistics",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Pack",
    tokens: 100,
    price: 0.023,
    pricePerToken: 0.00023,
    icon: <Crown className="w-6 h-6" />,
    color: "gold",
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "500 Game Tokens",
      "Access to all games",
      "VIP support",
      "Exclusive tournaments",
      "Advanced statistics",
    ],
  },
];

const TicketsPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { writeContract } = useWriteContract();
  const { address: wagmiAddress } = useAccount();
  const config = useConfig();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePurchase = async (plan: TicketPlan) => {
    if (!wagmiAddress) {
      toast.error("Please connect your wallet");
      return;
    }

    console.log("Starting ticket purchase:", {
      plan,
      walletAddress: wagmiAddress,
      contractAddress: TICKET_CONTRACT_ADDRESS,
    });

    setIsProcessing(true);
    try {
      const txHash = await writeContract({
        abi: TICKET_ABI,
        address: TICKET_CONTRACT_ADDRESS,
        functionName: "buyTickets",
        args: [plan.tokens],
      });

      console.log("Transaction hash:", txHash);
      toast.info("Transaction submitted, waiting for confirmation...");

      // @ts-ignore
      const receipt = await waitForTransactionReceipt(config, {
        hash: txHash,
      });

      console.log("Transaction receipt:", receipt);

      if (receipt.status !== "success") {
        toast.error("Transaction failed");
      } else {
        toast.success("Transaction successful! Tickets purchased.");
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(`Purchase failed: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-slate-50 dark:bg-slate-900/50",
          border: "border-slate-200 dark:border-slate-700",
          text: "text-slate-600 dark:text-slate-400",
          button: "bg-slate-700 hover:bg-slate-800 text-white",
        };
      case "purple":
        return {
          bg: "bg-slate-50 dark:bg-slate-900/50",
          border: "border-slate-200 dark:border-slate-700",
          text: "text-slate-600 dark:text-slate-400",
          button: "bg-slate-700 hover:bg-slate-800 text-white",
        };
      case "gold":
        return {
          bg: "bg-slate-50 dark:bg-slate-900/50",
          border: "border-slate-200 dark:border-slate-700",
          text: "text-slate-600 dark:text-slate-400",
          button: "bg-slate-700 hover:bg-slate-800 text-white",
        };
      default:
        return {
          bg: "bg-slate-50 dark:bg-slate-900/50",
          border: "border-slate-200 dark:border-slate-700",
          text: "text-slate-600 dark:text-slate-400",
          button: "bg-slate-700 hover:bg-slate-800 text-white",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white">
      <Header pageType="explore" />
      <Toaster richColors />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-4">
            Game Tokens
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Purchase tokens to play games
          </p>
          <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm">
            $1 per token
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {TICKET_PLANS.map((plan) => {
            const colors = getColorClasses(plan.color);
            const isSelected = selectedPlan === plan.id;

            return (
              <Card
                key={plan.id}
                className={`relative transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isSelected
                    ? `ring-2 ring-${plan.color}-500 shadow-lg`
                    : "hover:shadow-lg"
                } ${plan.popular ? "border-2 border-slate-300 dark:border-slate-600" : ""}`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-3 py-1 text-xs">
                      Popular
                    </Badge>
                  </div>
                )}

                <CardHeader
                  className={`text-center ${colors.bg} ${colors.border} border-b`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colors.bg} ${colors.border} border-2 mx-auto mb-4`}
                  >
                    <div className={colors.text}>{plan.icon}</div>
                  </div>

                  <CardTitle className="text-xl font-semibold">
                    {plan.name}
                  </CardTitle>

                  <div className="mt-4">
                    <div className="text-3xl font-semibold text-slate-900 dark:text-white">
                      {plan.price} ETH
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-500">
                      {plan.tokens} tokens
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <ul className="space-y-2 mb-6">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${colors.button} transition-all duration-200`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(plan);
                    }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div
                          className={twMerge(
                            "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin",
                            plan.tokens == 10 && "text-blue-600",
                          )}
                        />
                        Processing...
                      </div>
                    ) : (
                      <span
                        className={twMerge(
                          plan.tokens == 10 && "text-blue-600",
                        )}
                      >
                        {wagmiAddress
                          ? `Buy ${plan.tokens} Tokens`
                          : "Connect Wallet"}
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium text-slate-900 dark:text-white">
                How Tokens Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>• 1 token per game</li>
                <li>• Never expire</li>
                <li>• Use across all games</li>
              </ul>
            </CardContent>
          </Card>

          {/* <Card className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium text-slate-900 dark:text-white">
                Premium Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>• Exclusive tournaments</li>
                <li>• Early game access</li>
                <li>• Advanced statistics</li>
              </ul>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
