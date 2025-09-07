import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
export interface ReferralResponse {
  wallet_address: string;
  referral_code: string;
}

export interface ReferralStats {
  referral_code: string;
  total_referrals: number;
  wallet_address: string;
}

export interface UseReferralRequest {
  wallet_address: string;
  referral_code: string;
}

// API Base URL
const API_BASE_URL = 'https://referralgolemdbservice-production.up.railway.app';

// API Functions
const createReferralCode = async (walletAddress: string): Promise<ReferralResponse> => {
  const response = await fetch(`${API_BASE_URL}/referral/create`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      wallet_address: walletAddress,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create referral code');
  }

  return response.json();
};

const getReferralCode = async (walletAddress: string): Promise<ReferralResponse | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/referral/${walletAddress}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return undefined; // No referral code exists
      }
      throw new Error('Failed to get referral code');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching referral code:', error);
    return undefined;
  }
};

const useReferralCode = async (request: UseReferralRequest): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/referral/use`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to use referral code');
  }
};

const getReferralStats = async (referralCode: string): Promise<ReferralStats> => {
  const response = await fetch(`${API_BASE_URL}/referral/stats/${referralCode}`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get referral stats');
  }

  return response.json();
};

// React Query Hooks
export const useGetReferralCode = (walletAddress: string | undefined) => {
  return useQuery({
    queryKey: ['referral-code', walletAddress],
    queryFn: () => getReferralCode(walletAddress!),
    enabled: !!walletAddress,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

export const useCreateReferralCode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createReferralCode,
    onSuccess: (data) => {
      // Invalidate and refetch referral code query
      queryClient.invalidateQueries({ queryKey: ['referral-code', data.wallet_address] });
    },
  });
};

export const useReferralStats = (referralCode: string | undefined) => {
  return useQuery({
    queryKey: ['referral-stats', referralCode],
    queryFn: () => getReferralStats(referralCode!),
    enabled: !!referralCode,
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};

export const useUseReferralCode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: useReferralCode,
    onSuccess: (_, variables) => {
      // Invalidate stats for the used referral code
      queryClient.invalidateQueries({ queryKey: ['referral-stats', variables.referral_code] });
    },
  });
};

// Helper hook for ticket purchase with referral
export const useTicketPurchaseWithReferral = () => {
  const useReferralMutation = useUseReferralCode();
  
  const purchaseTicketWithReferral = async (walletAddress: string, referralCode?: string) => {
    // First use the referral code if provided
    if (referralCode) {
      await useReferralMutation.mutateAsync({
        wallet_address: walletAddress,
        referral_code: referralCode,
      });
    }
    
    // Here you would add your ticket purchase logic
    // This is just a placeholder - replace with your actual ticket purchase API call
    console.log('Purchasing ticket for wallet:', walletAddress);
    console.log('Used referral code:', referralCode);
  };
  
  return {
    purchaseTicketWithReferral,
    isLoading: useReferralMutation.isPending,
    error: useReferralMutation.error,
  };
};
