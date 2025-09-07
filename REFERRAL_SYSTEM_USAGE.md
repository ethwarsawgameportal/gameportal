# Referral System Integration

This document explains how to use the integrated referral system in your React app.

## Components

### UserReferralDown
The main referral dropdown component that shows:
- User's referral code
- Total referrals count
- Rewards earned
- Copy referral code functionality
- Create referral code if none exists

```tsx
import { UserReferral } from "@/app/components/UserReferral";

// Use in your component
<UserReferral />
```

### ReferralInput
A component for entering referral codes when purchasing tickets:

```tsx
import { ReferralInput } from "@/app/components/UserReferral";

<ReferralInput onPurchaseComplete={() => console.log("Purchase completed!")} />
```

## API Hooks

### useGetReferralCode
Fetches the referral code for a wallet address:

```tsx
import { useGetReferralCode } from "@/lib/referral-api";

const { data: referralData, isLoading } = useGetReferralCode(walletAddress);
```

### useCreateReferralCode
Creates a new referral code:

```tsx
import { useCreateReferralCode } from "@/lib/referral-api";

const createReferralMutation = useCreateReferralCode();
createReferralMutation.mutate(walletAddress);
```

### useReferralStats
Gets statistics for a referral code:

```tsx
import { useReferralStats } from "@/lib/referral-api";

const { data: statsData, isLoading } = useReferralStats(referralCode);
```

### useUseReferralCode
Uses a referral code when purchasing:

```tsx
import { useUseReferralCode } from "@/lib/referral-api";

const useReferralMutation = useUseReferralCode();
useReferralMutation.mutate({
  wallet_address: "0x...",
  referral_code: "ABC123"
});
```

### useTicketPurchaseWithReferral
Helper hook that combines referral usage with ticket purchase:

```tsx
import { useTicketPurchaseWithReferral } from "@/lib/referral-api";

const { purchaseTicketWithReferral, isLoading } = useTicketPurchaseWithReferral();
await purchaseTicketWithReferral(walletAddress, referralCode);
```

## API Endpoints

The system integrates with these endpoints:

- **POST** `/referral/create` - Create referral code
- **GET** `/referral/{wallet_address}` - Get referral code
- **POST** `/referral/use` - Use referral code
- **GET** `/referral/stats/{referral_code}` - Get referral stats

## Features

- ✅ Automatic referral code creation
- ✅ Real-time stats updates
- ✅ Copy to clipboard functionality
- ✅ Loading states and error handling
- ✅ React Query integration with caching
- ✅ TypeScript support
- ✅ Responsive UI components

## Usage Example

```tsx
import { UserReferral, ReferralInput } from "@/app/components/UserReferral";

function MyComponent() {
  return (
    <div>
      {/* Show user's referral info */}
      <UserReferral />
      
      {/* Allow entering referral code for purchases */}
      <ReferralInput onPurchaseComplete={() => {
        console.log("Ticket purchased!");
      }} />
    </div>
  );
}
```

## Notes

- The system automatically handles wallet address extraction from the authenticated user
- Referral codes are cached and refreshed every 5 minutes
- Stats are refreshed every minute
- All API calls include proper error handling and loading states
- The system is fully integrated with React Query for optimal performance
