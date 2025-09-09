"use client";

import { type ReactNode } from "react";
import { ink } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage, WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const wagmiAdapter = new WagmiAdapter({
  networks: [ink],
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }) as any,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [ink],
  projectId,
  themeMode: "light",
  metadata: {
    name: "Vibezz",
    description: "Vibezz",
    url: "https://vibeez.com",
    icons: ["https://vibeez.com/favicon.png"],
  },
});

export function Providers(props: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
