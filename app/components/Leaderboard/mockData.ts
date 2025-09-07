import { LeaderboardEntry } from "./types";

export const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: "1",
    rank: 1,
    score: 2250,
    gamesPlayed: 3,
    winRate: 0,
    favoriteGame: "Tetris",
    walletAddress: "0xc71fd8C32415aAca51f22d7B809b932714912904",
    lastPlayed: new Date("2024-01-15"),
  },
  {
    id: "2",
    rank: 2,
    score: 1100,
    gamesPlayed: 1,
    winRate: 0,
    favoriteGame: "Tetris",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    lastPlayed: new Date("2024-01-14"),
  },
  {
    id: "3",
    rank: 3,
    score: 400,
    gamesPlayed: 1,
    winRate: 0,
    favoriteGame: "Tetris",
    walletAddress: "0x9876543210fedcba9876543210fedcba98765432",
    lastPlayed: new Date("2024-01-13"),
  },
  {
    id: "4",
    rank: 4,
    score: 200,
    gamesPlayed: 1,
    winRate: 0,
    favoriteGame: "Tetris",
    walletAddress: "0x8d13c78ff35bd63833565A7159D3F073157F3281",
    lastPlayed: new Date("2024-01-12"),
  },
];
