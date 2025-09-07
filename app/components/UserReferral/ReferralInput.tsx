import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTicketPurchaseWithReferral } from "@/lib/referral-api";
import { useUser } from "@civic/auth-web3/react";
import { Loader2 } from "lucide-react";

interface ReferralInputProps {
  onPurchaseComplete?: () => void;
}

export const ReferralInput = ({ onPurchaseComplete }: ReferralInputProps) => {
  const [referralCode, setReferralCode] = useState("");
  const { user } = useUser();
  const { purchaseTicketWithReferral, isLoading, error } = useTicketPurchaseWithReferral();

  const handlePurchase = async () => {
    if (!user?.id) return;
    
    try {
      await purchaseTicketWithReferral(user.id, referralCode || undefined);
      onPurchaseComplete?.();
      setReferralCode("");
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
      <h3 className="text-lg font-semibold">Purchase Ticket</h3>
      
      <div className="space-y-2">
        <label htmlFor="referral-code" className="text-sm font-medium">
          Referral Code (Optional)
        </label>
        <Input
          id="referral-code"
          type="text"
          placeholder="Enter referral code"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
          className="font-mono"
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">
          Error: {error.message}
        </div>
      )}

      <Button
        onClick={handlePurchase}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Processing...
          </>
        ) : (
          'Purchase Ticket'
        )}
      </Button>

      {referralCode && (
        <p className="text-xs text-slate-500">
          Using referral code: <span className="font-mono">{referralCode}</span>
        </p>
      )}
    </div>
  );
};
