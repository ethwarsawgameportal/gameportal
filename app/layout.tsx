import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { MiniAppProvider } from "./components/MiniAppProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL;
  return {
    title: "Vibeez Arcade",
    description:
      "Play classic arcade games on the blockchain. Experience Tetris, Chess, Checkers and more in the ultimate Web3 gaming platform.",
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
        button: {
          title: "Launch Vibeez Arcade",
          action: {
            type: "launch_frame",
            name: "Vibeez Arcade",
            url: URL,
            splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE,
            splashBackgroundColor:
              process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background">
        <CivicAuthProvider
          clientId={
            process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID ||
            "e21eb711-8a2b-493c-aaee-d5db5561a5a7"
          }
          autoCreateWallet={true}
          autoConnectEmbeddedWallet={true}
        >
          <MiniAppProvider>
            <Providers>{children}</Providers>
          </MiniAppProvider>
        </CivicAuthProvider>
      </body>
    </html>
  );
}
