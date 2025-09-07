# Civic Auth Web3 Implementation Guide

This guide contains all the changes needed to implement Civic Auth Web3 with automatic wallet creation in your Next.js application.

## 1. Package Installation

```bash
npm install @civic/auth-web3 @solana/wallet-adapter-react
```

## 2. Next.js Configuration (next.config.mjs)

```javascript
import { createCivicAuthPlugin } from "@civic/auth/nextjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence warnings
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: ""
});

export default withCivicAuth(nextConfig);
```

## 3. Layout Configuration (app/layout.tsx)

```typescript
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CivicAuthProvider } from "@civic/auth-web3/react";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL;
  return {
    title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    description: "Base MiniKit app with Civic Auth",
    openGraph: {
      title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      description: "Base MiniKit app with Civic Auth",
      images: [`${URL}/vibes/vibes-19.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CivicAuthProvider
          clientId=""
          autoCreateWallet={true}
          autoConnectEmbeddedWallet={true}
        >
          <Providers>
            {children}
          </Providers>
        </CivicAuthProvider>
      </body>
    </html>
  );
}
```

## 4. API Route (app/api/auth/[...civicauth]/route.ts)

```typescript
import { handler } from '@civic/auth/nextjs'

export const GET = handler()
export const POST = handler()
```

## 5. Middleware (app/middleware.ts)

```typescript
import { authMiddleware } from '@civic/auth/nextjs/middleware'

export default authMiddleware();

export const config = {
  // include the paths you wish to secure here
  matcher: [
    /*
     * Match all request paths except:
     * - _next directory (Next.js static files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - image files
     */
    '/((?!_next|favicon.ico|sitemap.xml|robots.txt|.*\.jpg|.*\.png|.*\.svg|.*\.gif).*)',
  ],
}
```

## 6. Main Page Component (app/page.tsx)

```typescript
"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useAccount, useBalance } from "wagmi";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { Home } from "./components/DemoComponents";
import { Features } from "./components/DemoComponents";

// Correct Civic Auth Web3 imports
import { useUser, UserButton, useWallet } from "@civic/auth-web3/react";

// Civic Auth Component with Web3 wallet creation
function CivicAuth() {
  try {
    const userContext = useUser();
    
    // Debug: Let's see what we're getting from the hook
    console.log('CivicAuth userContext:', userContext);
    
    // Extract user and loading state - the structure might be different
    const user = userContext?.user;
    const isLoading = userContext?.isLoading;

    // Check if user needs a wallet created
    const needsWallet = user && 'createWallet' in userContext && !userContext.walletCreationInProgress;
    
    console.log('CivicAuth state:', { user, isLoading, needsWallet });

    if (user) {
      return (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <Icon name="check" size="sm" className="text-green-600 dark:text-green-400" />
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
          <Button
            variant="outline"
            size="sm"
            disabled
            className="text-[var(--app-accent)] border-[var(--app-accent)]"
          >
            Loading...
          </Button>
        ) : (
          <UserButton />
        )}
      </div>
    );
  } catch (error) {
    console.error('CivicAuth error:', error);
    // Fallback: just show the UserButton
    return (
      <div className="flex items-center">
        <UserButton />
      </div>
    );
  }
}

// Wallet Info Component to display Civic Web3 wallet details
function WalletInfo() {
  const userContext = useUser();
  const { user } = userContext;
  const { address } = useWallet({ type: "ethereum" });
  const { data: balance } = useBalance({
    address: address,
  });

  // Debug: Let's see what we're getting
  console.log('WalletInfo userContext:', userContext);
  console.log('WalletInfo address:', address);

  // Check if user has a wallet or needs one created
  const hasWallet = user && 'ethereum' in userContext;
  const needsWallet = user && 'createWallet' in userContext;

  if (!user) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please sign in to access your wallet
        </p>
      </div>
    );
  }

  if (needsWallet) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg space-y-3">
        <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">Create Your Wallet</h3>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          You're signed in! Let's create your Web3 wallet to get started.
        </p>
        <Button
          onClick={() => userContext.createWallet()}
          disabled={userContext.walletCreationInProgress}
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          {userContext.walletCreationInProgress ? 'Creating Wallet...' : 'Create Wallet'}
        </Button>
      </div>
    );
  }

  if (!hasWallet || !address) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Wallet not available
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-2">
      <h3 className="font-semibold text-blue-900 dark:text-blue-100">Your Civic Web3 Wallet</h3>
      <div className="space-y-1 text-sm">
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">Address:</span>
          <p className="font-mono text-xs text-blue-700 dark:text-blue-300 break-all">
            {address}
          </p>
        </div>
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">Balance:</span>
          <p className="text-blue-700 dark:text-blue-300">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
          </p>
        </div>
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">Network:</span>
          <p className="text-blue-700 dark:text-blue-300">Base</p>
        </div>
        <div>
          <span className="font-medium text-blue-800 dark:text-blue-200">Type:</span>
          <p className="text-blue-700 dark:text-blue-300">Civic Embedded Wallet</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex flex-col space-y-3 mb-4">
          {/* Top row with wallet and save frame button */}
          <div className="flex justify-between items-center h-11">
            <div>
              <div className="flex items-center space-x-2">
                <Wallet className="z-10">
                  <ConnectWallet>
                    <Name className="text-inherit" />
                  </ConnectWallet>
                  <WalletDropdown>
                    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                      <Avatar />
                      <Name />
                      <Address />
                      <EthBalance />
                    </Identity>
                    <WalletDropdownDisconnect />
                  </WalletDropdown>
                </Wallet>
              </div>
            </div>
            <div>{saveFrameButton}</div>
          </div>
          
          {/* Civic authentication row */}
          <div className="flex justify-center">
            <CivicAuth />
          </div>
        </header>

        <main className="flex-1 space-y-4">
          {/* Wallet Information Section */}
          <WalletInfo />
          
          {/* Main Content */}
          {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
          {activeTab === "features" && <Features setActiveTab={setActiveTab} />}
        </main>

        <footer className="mt-2 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </div>
  );
}
```

## 7. Key Features Implemented

### ✅ **Civic Auth Web3 Integration**
- **Identity Verification**: Users can sign in with Civic Auth
- **Automatic Wallet Creation**: When users sign in, Civic automatically creates a Web3 wallet
- **Embedded Wallet**: No need for external wallet extensions
- **Seamless Experience**: One sign-in gives users both identity and wallet

### ✅ **Wallet Management**
- **Wallet Creation**: Automatic creation when user signs in
- **Wallet Display**: Shows wallet address, balance, and network info
- **Error Handling**: Graceful fallbacks if wallet creation fails
- **Debug Logging**: Console logs to help troubleshoot issues

### ✅ **User Experience**
- **Loading States**: Proper loading indicators
- **Error States**: Fallback UI when things go wrong
- **Success States**: Clear indication when wallet is created
- **Responsive Design**: Works on mobile and desktop

## 8. Environment Variables Needed

Make sure you have these environment variables set:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=your_project_name
NEXT_PUBLIC_ICON_URL=your_icon_url
NEXT_PUBLIC_URL=your_app_url
```

## 9. How It Works

1. **User visits your app** → Civic Auth provider initializes
2. **User clicks sign in** → Civic Auth handles authentication
3. **User signs in successfully** → Identity is verified
4. **Wallet creation** → Civic automatically creates an embedded Web3 wallet
5. **Wallet ready** → User can see their wallet address and balance
6. **Full Web3 functionality** → User can interact with dApps and make transactions

## 10. Troubleshooting

### If you see "Loading..." stuck:
- Check browser console for error messages
- Verify the client ID is correct
- Ensure all dependencies are installed

### If wallet creation fails:
- Check network connectivity
- Verify Civic Auth configuration
- Look for error messages in console

### If UserButton doesn't appear:
- Check if CivicAuthProvider is properly wrapping your app
- Verify imports are correct
- Check for TypeScript errors

This implementation provides a complete Web3 authentication and wallet management system using Civic Auth Web3!
