import React, { useState, useEffect } from "react";
import { MarketItem } from "./types";
import { twMerge } from "tailwind-merge";
import { TICKET_CONTRACT_ADDRESS } from "../Tickets/contract";
import { useAccount, useReadContract } from "wagmi";
import TICKET_ABI from "../../abi/TetrisGame.json";

interface GameModalProps {
  item: MarketItem | null;
  isOpen: boolean;
  onClose: () => void;
}

// Simple cookie utility functions
const setCookie = (name: string, value: string, days: number = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const GameModal: React.FC<GameModalProps> = ({ item, isOpen, onClose }) => {
  const { address: wagmiAddress } = useAccount();
  const [hasUsedFreeGame, setHasUsedFreeGame] = useState(false);

  const result = useReadContract({
    abi: TICKET_ABI,
    address: TICKET_CONTRACT_ADDRESS,
    functionName: "weekTickets",
  });

  // Check if user has used their free game
  useEffect(() => {
    if (wagmiAddress) {
      const freeGameUsed = getCookie(`freeGameUsed2_${wagmiAddress}`);
      setHasUsedFreeGame(!!freeGameUsed);
    }
  }, [wagmiAddress]);

  if (!isOpen || !item) return null;

  // Mock user tickets - in real app this would come from user data
  const userTickets = wagmiAddress ? Number(result.data?.toString() ?? 0) : 0;

  // Check if user can play for free
  const canPlayForFree = wagmiAddress && !hasUsedFreeGame;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePlayClick = () => {
    // Check if user is signed in
    if (!wagmiAddress) {
      alert("Please sign in to play games!");
      return;
    }

    // Check if user can play for free or has enough tickets
    if (!canPlayForFree && userTickets < item.ticketCost) {
      alert(
        `You need ${item.ticketCost} ticket(s) to play this game. You have ${userTickets} ticket(s).`,
      );
      return;
    }

    // Navigate to game or show coming soon message
    if (item.isComingSoon) {
      alert("This game is coming soon!");
    } else {
      // Mark free game as used if this is their first game
      if (canPlayForFree) {
        setCookie(`freeGameUsed2_${wagmiAddress}`, "true", 365); // Expires in 1 year
        setHasUsedFreeGame(true);
      }

      // Navigate to game page
      window.location.href = `/tetris`; // For now, redirect to tetris
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md mx-auto animate-fade-in">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {item.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Game Image */}
              {/* <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                <img
                  src={`/${item.backgroud}`}
                  alt={item.title}
                  className={`object-cover w-full h-full ${
                    item.isComingSoon ? "grayscale-70" : ""
                  }`}
                  style={item.isComingSoon ? { filter: "grayscale(0.7)" } : {}}
                />
              </div> */}

              {/* Game Description */}
              <div className="space-y-4">
                {/* Ticket Information */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-3">
                  {/* Free Game Banner */}
                  {canPlayForFree && (
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg p-3 border border-green-200 dark:border-green-700">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-500 rounded-full p-1">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                            Free Game Available!
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-300">
                            Play your first game for free
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <img
                          src="/explorer/ticket.png"
                          alt="Ticket"
                          className="w-10 h-10"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {canPlayForFree ? "Regular Cost" : "Game Cost"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {canPlayForFree
                            ? "After free game"
                            : "Tickets required to play"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {item.ticketCost}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        ticket{item.ticketCost !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {wagmiAddress && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-green-600 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          Your Tickets
                        </span>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            canPlayForFree
                              ? "text-green-600 dark:text-green-400"
                              : userTickets >= item.ticketCost
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {userTickets}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {canPlayForFree
                            ? "Free game available"
                            : userTickets >= item.ticketCost
                              ? "Sufficient"
                              : "Insufficient"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 pb-6">
            <button
              onClick={handlePlayClick}
              className={twMerge(
                "w-full py-3 px-4 rounded-xl font-medium transition-all duration-200",
                item.isComingSoon
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                  : !wagmiAddress
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    : canPlayForFree
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:from-green-800 active:to-emerald-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                      : userTickets < item.ticketCost
                        ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0",
              )}
              disabled={
                item.isComingSoon ||
                !wagmiAddress ||
                (!canPlayForFree && userTickets < item.ticketCost)
              }
            >
              {item.isComingSoon
                ? "Coming Soon"
                : !wagmiAddress
                  ? "Sign In Required"
                  : canPlayForFree
                    ? "🎮 Play Free Game!"
                    : userTickets < item.ticketCost
                      ? `Need ${item.ticketCost - userTickets} More Ticket${item.ticketCost - userTickets !== 1 ? "s" : ""}`
                      : `Play Game (${item.ticketCost} ticket${item.ticketCost !== 1 ? "s" : ""})`}
            </button>
            <div
              className="text-sm text-slate-500 dark:text-slate-400 pt-5 text-center cursor-pointer"
              onClick={() => (window.location.href = "/tickets")}
            >
              Buy tickets
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
