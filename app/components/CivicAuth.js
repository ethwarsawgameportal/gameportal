"use client";

import { useState, useEffect } from "react";
import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";

export function CivicAuth({ onSuccess, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gatekeeper, setGatekeeper] = useState(null);

  useEffect(() => {
    // Load the Civic SDK
    const loadCivicSDK = async () => {
      if (typeof window !== 'undefined' && !window.civicSdk) {
        const script = document.createElement('script');
        script.src = 'https://auth.civic.com/js/civic.sip.min.js';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = () => {
          // Initialize the gatekeeper
          const civic = new window.civic.sip({
            applicationId: process.env.NEXT_PUBLIC_CIVIC_APPLICATION_ID || 'your-civic-app-id',
          });
          setGatekeeper(civic);
        };
      } else if (window.civicSdk) {
        const civic = new window.civic.sip({
          applicationId: process.env.NEXT_PUBLIC_CIVIC_APPLICATION_ID || 'your-civic-app-id',
        });
        setGatekeeper(civic);
      }
    };

    loadCivicSDK();
  }, []);

  const handleCivicLogin = async () => {
    if (!gatekeeper) {
      setError('Civic SDK not loaded');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Start the Civic authentication process
      gatekeeper.signup({
        style: 'popup',
        scopeRequest: gatekeeper.ScopeRequests.BASIC_SIGNUP,
      });

      // Listen for the auth event
      gatekeeper.on('auth-code-received', async (event) => {
        try {
          // Exchange the auth code for user data
          const response = await fetch('/api/civic/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              authCode: event.response,
            }),
          });

          if (!response.ok) {
            throw new Error('Authentication failed');
          }

          const userData = await response.json();
          
          // Call the success callback with user data
          onSuccess(userData);
          setIsLoading(false);
        } catch (error) {
          console.error('Civic auth error:', error);
          setError('Authentication failed');
          setIsLoading(false);
        }
      });

      gatekeeper.on('user-cancelled', () => {
        setIsLoading(false);
        setError('Authentication cancelled');
      });

    } catch (error) {
      console.error('Civic login error:', error);
      setError('Failed to start authentication');
      setIsLoading(false);
    }
  };

  // Alternative Web3 Authentication using wallet signature
  const handleWeb3Auth = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if wallet is connected
      if (!window.ethereum) {
        throw new Error('No wallet found');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];

      // Create a message to sign
      const message = `Verify your identity with Civic\nTimestamp: ${Date.now()}`;
      
      // Request signature
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });

      // Send to your backend for verification
      const response = await fetch('/api/civic/web3-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          message,
          signature,
        }),
      });

      if (!response.ok) {
        throw new Error('Web3 authentication failed');
      }

      const userData = await response.json();
      onSuccess(userData);
      setIsLoading(false);

    } catch (error) {
      console.error('Web3 auth error:', error);
      setError(error.message || 'Web3 authentication failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Identity Verification</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            icon={<Icon name="x" size="sm" />}
          />
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <div className="mb-4">
              <Icon name="shield" size="lg" className="mx-auto text-blue-600" />
            </div>
            <p className="text-gray-600 mb-6">
              Verify your identity securely with Civic to access premium features.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <div className="flex items-center">
                <Icon name="alert-circle" size="sm" className="text-red-500 mr-2" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleCivicLogin}
              disabled={isLoading || !gatekeeper}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              icon={isLoading ? <Icon name="loader" size="sm" className="animate-spin" /> : <Icon name="shield" size="sm" />}
            >
              {isLoading ? 'Verifying...' : 'Verify with Civic'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button
              onClick={handleWeb3Auth}
              disabled={isLoading}
              variant="outline"
              className="w-full"
              icon={<Icon name="wallet" size="sm" />}
            >
              Web3 Signature Verification
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Your privacy is protected. Civic uses zero-knowledge proofs to verify your identity without sharing personal data.
          </div>
        </div>
      </div>
    </div>
  );
}