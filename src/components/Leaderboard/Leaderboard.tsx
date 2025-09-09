"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { LeaderboardProps, LeaderboardFilters } from "./types";

const Leaderboard: React.FC<LeaderboardProps> = ({
  entries,
  timeFilter = "all",
  onPlayerClick,
}) => {
  const [filters, setFilters] = useState<LeaderboardFilters>({
    timePeriod: timeFilter,
    sortBy: "score",
  });

  const filteredAndSortedEntries = useMemo(() => {
    let filtered = entries;

    // Filter by time period
    if (filters.timePeriod !== "all") {
      const now = new Date();
      const cutoffDate = new Date();

      if (filters.timePeriod === "week") {
        cutoffDate.setDate(now.getDate() - 7);
      } else if (filters.timePeriod === "month") {
        cutoffDate.setMonth(now.getMonth() - 1);
      }

      filtered = filtered.filter((entry) => entry.lastPlayed >= cutoffDate);
    }

    // Sort entries
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "score":
          return b.score - a.score;
        case "gamesPlayed":
          return b.gamesPlayed - a.gamesPlayed;
        case "winRate":
          return b.winRate - a.winRate;
        default:
          return b.score - a.score;
      }
    });

    // Update ranks
    return filtered.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  }, [entries, filters]);

  const getRankBadgeVariant = (rank: number) => {
    if (rank === 1) return "default";
    if (rank === 2) return "secondary";
    if (rank === 3) return "outline";
    return "outline";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
        <CardHeader>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <div className="flex gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Period:
              </label>
              <select
                value={filters.timePeriod}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    timePeriod: e.target.value as any,
                  }))
                }
                className="px-3 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                <option value="all">All</option>
                {/* <option value="week">Last week</option>
                <option value="month">Last month</option> */}
              </select>
            </div>
            <div className="flex gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Sort by:
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as any,
                  }))
                }
                className="px-3 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                <option value="score">Points</option>
                {/* <option value="gamesPlayed">Games played</option>
                <option value="winRate">Win rate</option> */}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Position
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Player
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Points
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">
                    Games
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => onPlayerClick?.(entry)}
                  >
                    <td className="py-4 px-4">
                      <Badge
                        variant={getRankBadgeVariant(entry.rank)}
                        className="text-sm font-bold"
                      >
                        {getRankIcon(entry.rank)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                            {formatWalletAddress(entry.walletAddress)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-bold text-lg text-slate-900 dark:text-slate-100">
                        {entry.score.toLocaleString("en-US")}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-slate-600 dark:text-slate-400">
                        {entry.gamesPlayed}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredAndSortedEntries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                No results
              </h3>
              <p className="text-slate-500 dark:text-slate-500">
                No players found matching the selected criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
