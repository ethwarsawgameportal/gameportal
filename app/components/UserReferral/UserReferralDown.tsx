import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BadgePlus, ChevronDown } from "lucide-react";
import { useUser } from "@civic/auth-web3/react";

export const UserReferralDown = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showReferralDropdown, setShowReferralDropdown] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowReferralDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setShowReferralDropdown(!showReferralDropdown)}
        className="flex items-center gap-1 px-1 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center">
          <BadgePlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-sm font-medium text-slate-900 dark:text-white">
          Ref
        </span>
        <ChevronDown className="w-4 h-4 text-slate-500" />
      </Button>

      {showReferralDropdown && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">User Referrals</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Total Referrals</p>
                  <p className="text-xs text-slate-500">
                    Users you&apos;ve referred
                  </p>
                </div>
                <span className="text-lg font-bold text-blue-600">0</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Referral Code</p>
                  <p className="text-xs text-slate-500">Share this code</p>
                </div>
                <span className="text-sm font-mono bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                  {user.id?.slice(0, 8) || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Rewards Earned</p>
                  <p className="text-xs text-slate-500">From referrals</p>
                </div>
                <span className="text-lg font-bold text-green-600">0</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button
                className="w-full"
                onClick={() => {
                  // Copy referral code to clipboard
                  const referralCode = user.id?.slice(0, 8) || "N/A";
                  navigator.clipboard.writeText(referralCode);
                }}
              >
                Copy Referral Code
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
