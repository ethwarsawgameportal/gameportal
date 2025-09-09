export interface LeaderboardEntry {
  id: string;
  rank: number;
  score: number;
  gamesPlayed: number;
  winRate: number;
  favoriteGame: string;
  avatar?: string;
  walletAddress: string;
  lastPlayed: Date;
}

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
  timeFilter?: "all" | "week" | "month";
  onPlayerClick?: (player: LeaderboardEntry) => void;
}

export interface LeaderboardFilters {
  timePeriod: "all" | "week" | "month";
  sortBy: "score" | "gamesPlayed" | "winRate";
}
