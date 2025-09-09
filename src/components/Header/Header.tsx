"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

import { Logo } from "../shared";
import { UserReferral } from "../UserReferral";
import { UserTicket } from "../UserTicket/UserTicket";
import WalletConnect from "../WalletConnect";

type HeaderProps = {
  pageType?: "main" | "explore" | "game";
};

const Header: React.FC<HeaderProps> = ({ pageType = "game" }) => {
  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 sm:h-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo className="w-8 h-8" />
            <span
              className="font-semibold tracking-tight cursor-pointer"
              onClick={() =>
                pageType === "explore" && (window.location.href = "/")
              }
            >
              Game Portal
            </span>
            {pageType === "main" ? (
              <span
                className="ml-2 gap-2 font-semibold tracking-tight cursor-pointer text-nowrap flex flex-nowrap"
                onClick={() => (window.location.href = "/explore")}
              >
                Launch App <ArrowRight className="w-4 h-4" />
              </span>
            ) : (
              <></>
            )}
          </div>

          <div className="flex items-center gap-3 sm:flex-row sm:flex-nowrap flex-wrap sm:items-end max-sm:justify-end">
            <UserReferral />
            <UserTicket />{" "}
            <div className="flex items-center gap-2">
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
