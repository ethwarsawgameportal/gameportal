import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTicketPurchaseWithReferral } from "@/src/lib/referral-api";
import { useAccount } from "wagmi";

export const ReferralFromURL = () => {
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    // Get referral code from URL parameter
    const refFromURL = searchParams.get("ref");
    if (refFromURL) {
      setReferralCode(refFromURL);
    }
  }, [searchParams]);

  return (
    <div>
      {referralCode && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            🎉 You&apos;re using referral code:{" "}
            <span className="font-mono font-bold">{referralCode}</span>
          </p>
        </div>
      )}
      <EnhancedReferralInput defaultReferralCode={referralCode} />
    </div>
  );
};

// Enhanced ReferralInput with default value support
interface EnhancedReferralInputProps {
  defaultReferralCode?: string;
  onPurchaseComplete?: () => void;
}

export const EnhancedReferralInput = ({
  defaultReferralCode = "",
  onPurchaseComplete,
}: EnhancedReferralInputProps) => {
  const [referralCode, setReferralCode] = useState(defaultReferralCode);
  const { address: wagmiAddress } = useAccount();
  const { purchaseTicketWithReferral, isLoading, error } =
    useTicketPurchaseWithReferral();

  // Update when default changes
  useEffect(() => {
    setReferralCode(defaultReferralCode);
  }, [defaultReferralCode]);

  const handlePurchase = async () => {
    if (!wagmiAddress) return;

    try {
      await purchaseTicketWithReferral(wagmiAddress, referralCode || undefined);
      onPurchaseComplete?.();
      setReferralCode("");
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  if (!wagmiAddress) {
    return null;
  }

  return (
    <div>
      {/* <h3 className="text-lg font-semibold">Purchase Ticket</h3>

      <div className="space-y-2">
        <label htmlFor="referral-code" className="text-sm font-medium">
          Referral Code {defaultReferralCode && "(Pre-filled from link)"}
        </label>
        <input
          id="referral-code"
          type="text"
          placeholder="Enter referral code"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">
          Error: {error.message}
        </div>
      )}

      <button
        onClick={handlePurchase}
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md font-medium transition-colors"
      >
        {isLoading ? (
          <>
            <span className="inline-block animate-spin mr-2">⏳</span>
            Processing...
          </>
        ) : (
          "Purchase Ticket"
        )}
      </button>

      {referralCode && (
        <p className="text-xs text-slate-500">
          Using referral code:{" "}
          <span className="font-mono font-bold">{referralCode}</span>
        </p>
      )} */}
    </div>
  );
};
