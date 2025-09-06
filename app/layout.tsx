import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CivicAuthProvider } from "@civic/auth/nextjs";

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
        <CivicAuthProvider>
          <Providers>
            {children}
          </Providers>
        </CivicAuthProvider>
      </body>
    </html>
  );
}