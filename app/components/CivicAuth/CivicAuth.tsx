"use client";

import React from "react";
import { useUser, UserButton } from "@civic/auth-web3/react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

// Civic Auth Component
export const CivicAuth: React.FC = () => {
  try {
    const userContext = useUser();

    // Debug: Let's see what we're getting from the hook
    console.log("CivicAuth userContext:", userContext);

    // Extract user and loading state
    const user = userContext?.user;
    const isLoading = userContext?.isLoading;

    console.log("CivicAuth state:", { user, isLoading });

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
    console.error("CivicAuth error:", error);
    // Fallback: just show the UserButton
    return (
      <div className="flex items-center">
        <UserButton />
      </div>
    );
  }
};

// Wallet Info Component - simplified for basic Civic Auth
export const WalletInfo: React.FC = () => {
  const userContext = useUser();
  const { user } = userContext;

  if (!user) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please sign in to access your profile
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-2">
      <h3 className="font-semibold text-blue-900 dark:text-blue-100">
        Your Civic Profile
      </h3>
      <div className="space-y-1 text-sm">
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">
            Email:
          </span>
          <p className="text-blue-700 dark:text-blue-300">
            {user.email || "Not provided"}
          </p>
        </div>
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">
            Name:
          </span>
          <p className="text-blue-700 dark:text-blue-300">
            {user.name || "Not provided"}
          </p>
        </div>
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">
            Status:
          </span>
          <p className="text-blue-700 dark:text-blue-300">Identity Verified</p>
        </div>
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">
            Provider:
          </span>
          <p className="text-blue-700 dark:text-blue-300">Civic Auth</p>
        </div>
      </div>
    </div>
  );
};
