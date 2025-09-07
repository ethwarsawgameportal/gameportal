"use client";

import React from "react";
import { Leaderboard, mockLeaderboardData } from "../components/Leaderboard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LeaderboardPage: React.FC = () => {
  const handlePlayerClick = (player: any) => {
    console.log("Player clicked:", player);
    // Here you can add navigation to player profile or other actions
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white">
      <Header pageType="game" />
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Check out the best players in our community. Compete with others
              and climb up the ranks!
            </p>
          </div>
          <Leaderboard
            entries={mockLeaderboardData}
            onPlayerClick={handlePlayerClick}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
