"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export const MiniAppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    // Initialize the Mini App SDK when the app is ready
    const initializeMiniApp = async () => {
      try {
        // Call ready() to hide the splash screen and display your content
        // This is critical - without it, users will see an infinite loading screen
        await sdk.actions.ready();
        console.log("Mini App SDK initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Mini App SDK:", error);
      }
    };

    // Only initialize if we're in a Farcaster client
    if (
      typeof window !== "undefined" &&
      window.location !== window.parent.location
    ) {
      initializeMiniApp();
    }
  }, []);

  return <>{children}</>;
};
