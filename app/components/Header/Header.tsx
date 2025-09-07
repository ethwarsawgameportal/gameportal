import React from "react";
import { ArrowRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "../shared";
import { CivicAuth } from "../CivicAuth";
import { Profile } from "../Profile";
import { useUser } from "@civic/auth/react";

type HeaderProps = {
  isMainPage?: boolean;
};

const Header: React.FC<HeaderProps> = ({ isMainPage }) => {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-semibold tracking-tight">Game Portal</span>
        </div>

        <div className="flex items-center gap-3">
          {isMainPage ? (
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
          {user ? <Profile variant="compact" /> : <CivicAuth />}
        </div>
      </div>
    </header>
  );
};

export default Header;
