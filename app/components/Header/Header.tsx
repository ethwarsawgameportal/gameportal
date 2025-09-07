import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Wallet,
  Copy,
  Check,
  User,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "../shared";
import { CivicAuth } from "../CivicAuth";
import { Profile } from "../Profile";
import { useUser } from "@civic/auth-web3/react";
import { useWallet } from "@civic/auth-web3/react";

type HeaderProps = {
  pageType?: "main" | "explore" | "game";
};

const Header: React.FC<HeaderProps> = ({ pageType = "game" }) => {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span
            className="font-semibold tracking-tight cursor-pointer"
            onClick={() =>
              pageType === "explore" && (window.location.href = "/")
            }
          >
            Game Portal
          </span>
        </div>

        <div className="flex items-center gap-3">
          {pageType === "main" ? (
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
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {user.email || user.name || "User"}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </Button>

              {showProfileDropdown && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
                  <Profile variant="full" className="border-0 shadow-none" />
                </div>
              )}
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
