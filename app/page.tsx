import type { Metadata } from "next";
import LandingDappOnBase from "./components/MainApp/MainApp";

export const metadata: Metadata = {
  title: "Vibeez Arcade - Home",
  description:
    "Welcome to Vibeez Arcade! Play classic arcade games on the blockchain. Experience Tetris, Chess, Checkers and more in the ultimate Web3 gaming platform.",
  keywords: [
    "arcade games",
    "blockchain gaming",
    "Web3",
    "Tetris",
    "Chess",
    "Checkers",
    "crypto games",
  ],
  openGraph: {
    title: "Vibeez Arcade - Home",
    description:
      "Welcome to Vibeez Arcade! Play classic arcade games on the blockchain.",
    type: "website",
  },
};

export default function App() {
  return <LandingDappOnBase />;
}
