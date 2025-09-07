"use client";

import { DappExplorePage } from "../components/GamePanel";
import { ReferralFromURL } from "../components/UserReferral";

export default function ExplorePage() {
  return (
    <div>
      <DappExplorePage />
      
      {/* Add referral functionality to explore page */}
      <div className="container mx-auto p-6">
        <ReferralFromURL />
      </div>
    </div>
  );
}
