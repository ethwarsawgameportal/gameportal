export interface MarketItem {
  id: number;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  withOtherPlayer: boolean;
  gradient: string;
  backgroud: string;
  isComingSoon: boolean;
  ticketCost: number;
}

export const MARKET_ITEMS: MarketItem[] = [
  {
    id: 1,
    title: "Tetris",
    description:
      "Classic puzzle game with falling blocks. Arrange shapes and score points.",
    difficulty: "medium",
    withOtherPlayer: false,
    gradient: "from-emerald-200 via-cyan-200 to-blue-200",
    backgroud: "explorer/Tetris.png",
    isComingSoon: false,
    ticketCost: 1,
  },
  {
    id: 2,
    title: "Tic Tac Toe",
    description:
      "Simple strategic game for two players. Line up three symbols to win.",
    difficulty: "easy",
    withOtherPlayer: true,
    gradient: "from-violet-200 via-purple-200 to-fuchsia-200",
    backgroud: "explorer/TicTacToe.png",
    isComingSoon: true,
    ticketCost: 1,
  },
  {
    id: 3,
    title: "Chess",
    description:
      "The royal game of strategy. Develop tactics and defeat your opponent.",
    difficulty: "hard",
    withOtherPlayer: true,
    gradient: "from-indigo-200 via-blue-200 to-cyan-200",
    backgroud: "explorer/Chess.png",
    isComingSoon: true,
    ticketCost: 1,
  },
  {
    id: 4,
    title: "Checkers",
    description:
      "Classic board game. Capture opponent's pieces and reach the other side.",
    difficulty: "medium",
    withOtherPlayer: true,
    gradient: "from-rose-200 via-pink-200 to-purple-200",
    backgroud: "explorer/Checkers.png",
    isComingSoon: true,
    ticketCost: 1,
  },
  {
    id: 5,
    title: "Go",
    description:
      "Ancient strategic board game. Surround territory and capture enemy stones.",
    difficulty: "hard",
    withOtherPlayer: true,
    gradient: "from-amber-200 via-yellow-200 to-orange-200",
    backgroud: "explorer/Go.png",
    isComingSoon: true,
    ticketCost: 1,
  },
];
