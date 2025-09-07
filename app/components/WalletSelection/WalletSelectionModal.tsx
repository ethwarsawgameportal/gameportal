"use client";

import React from "react";
import { X, Wallet, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WalletSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCivic: () => void;
  onSelectCoinbase: () => void;
}

export const WalletSelectionModal: React.FC<WalletSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectCivic,
  onSelectCoinbase,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full transform transition-all animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">
              Choose Your Wallet
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select how you&apos;d like to connect to the Game Portal
            </p>

            <div className="space-y-3">
              {/* Civic Auth Web3 Option */}
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-start space-y-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={onSelectCivic}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-slate-900 dark:text-white">
                      Civic Auth Web3
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Sign in with Google + Auto wallet creation
                    </div>
                  </div>
                </div>
              </Button>

              {/* Coinbase Wallet Option */}
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-start space-y-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={onSelectCoinbase}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-slate-900 dark:text-white">
                      Coinbase Wallet
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Connect your existing Coinbase wallet
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
