"use client";

import { Suspense } from "react";
import { DappExplorePage } from "../components/GamePanel";
import { ReferralFromURL } from "../components/UserReferral";

export default function ExplorePage() {
  return (
    <div>
      <DappExplorePage />

      {/* Add referral functionality to explore page */}
      {/* <div className="container mx-auto p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <ReferralFromURL />
        </Suspense>
      </div> */}
    </div>
  );
}
