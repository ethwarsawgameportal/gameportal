import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";

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
  clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || "e21eb711-8a2b-493c-aaee-d5db5561a5a7",
});

export default withCivicAuth(nextConfig);
