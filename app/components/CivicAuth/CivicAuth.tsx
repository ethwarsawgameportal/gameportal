"use client";

import React from "react";
import { useUser, UserButton, useWallet } from "@civic/auth-web3/react";
import { useBalance } from "wagmi";
import { Button } from "@/components/ui/button";
import { Check, Wallet, Loader2 } from "lucide-react";

// Civic Auth Component with Web3 wallet creation
export const CivicAuth: React.FC = () => {
  try {
    const userContext = useUser();
    
    // Debug: Let's see what we're getting from the hook
    console.log('CivicAuth userContext:', userContext);
    
    // Extract user and loading state - the structure might be different
    const user = userContext?.user;
    const isLoading = userContext?.isLoading;

    // Check if user needs a wallet created
    const needsWallet = user && 'createWallet' in userContext && !userContext.walletCreationInProgress;
    
    console.log('CivicAuth state:', { user, isLoading, needsWallet });

    if (user) {
      return (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-800 dark:text-green-300">
              Identity Verified
            </span>
          </div>
          <UserButton />
        </div>
      );
    }

    return (
      <div className="flex items-center">
        {isLoading ? (
          <Button variant="outline" size="sm" disabled className="gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading...
          </Button>
        ) : (
          <UserButton />
        )}
      </div>
    );
  } catch (error) {
    console.error('CivicAuth error:', error);
    // Fallback: just show the UserButton
    return (
      <div className="flex items-center">
        <UserButton />
      </div>
    );
  }
};

// Wallet Info Component to display Civic Web3 wallet details
export const WalletInfo: React.FC = () => {
  const userContext = useUser();
  const { user } = userContext;
  const { address } = useWallet({ type: "ethereum" });
  const { data: balance } = useBalance({
    address: address,
  });

  // Debug: Let's see what we're getting
  console.log('WalletInfo userContext:', userContext);
  console.log('WalletInfo address:', address);

  // Check if user has a wallet or needs one created
  const hasWallet = user && 'ethereum' in userContext;
  const needsWallet = user && 'createWallet' in userContext;

  if (!user) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please sign in to access your wallet
        </p>
      </div>
    );
  }

  if (needsWallet) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg space-y-3">
        <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">Create Your Wallet</h3>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          You're signed in! Let's create your Web3 wallet to get started.
        </p>
        <Button
          onClick={() => userContext.createWallet()}
          disabled={userContext.walletCreationInProgress}
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          {userContext.walletCreationInProgress ? 'Creating Wallet...' : 'Create Wallet'}
        </Button>
      </div>
    );
  }

  if (!hasWallet || !address) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Wallet not available
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-2">
      <h3 className="font-semibold text-blue-900 dark:text-blue-100">Your Civic Web3 Wallet</h3>
      <div className="space-y-1 text-sm">
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">Address:</span>
          <p className="font-mono text-xs text-blue-700 dark:text-blue-300 break-all">
            {address}
          </p>
        </div>
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">Balance:</span>
          <p className="text-blue-700 dark:text-blue-300">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
          </p>
        </div>
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">Network:</span>
          <p className="text-blue-700 dark:text-blue-300">Base</p>
        </div>
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">Type:</span>
          <p className="text-blue-700 dark:text-blue-300">Civic Embedded Wallet</p>
        </div>
      </div>
    </div>
  );
};
