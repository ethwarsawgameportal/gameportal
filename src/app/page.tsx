import type { Metadata } from "next";
import LandingDappOnWinfinity from "../components/MainApp/MainApp";

export const metadata: Metadata = {
  title: "Winfinity - Home",
  description:
    "Welcome to Winfinity! Play classic arcade games on the blockchain. Experience Tetris, Chess, Checkers and more in the ultimate Web3 gaming platform.",
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
    title: "Winfinity - Home",
    description:
      "Welcome to Winfinity! Play classic arcade games on the blockchain.",
    type: "website",
  },
};

export default function App() {
  return <LandingDappOnWinfinity />;
}
