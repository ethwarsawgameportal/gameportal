import React from "react";
import { MarketItem } from "./types";
import { twMerge } from "tailwind-merge";
import { useUser } from "@civic/auth/react";

interface GameModalProps {
  item: MarketItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ item, isOpen, onClose }) => {
  const { user } = useUser();

  if (!isOpen || !item) return null;

  // Mock user tickets - in real app this would come from user data
  const userTickets = user ? 5 : 0;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePlayClick = () => {
    // Check if user has enough tickets
    if (!user) {
      alert("Please sign in to play games!");
      return;
    }

    if (userTickets < item.ticketCost) {
      alert(
        `You need ${item.ticketCost} ticket(s) to play this game. You have ${userTickets} ticket(s).`,
      );
      return;
    }

    // Navigate to game or show coming soon message
    if (item.isComingSoon) {
      alert("This game is coming soon!");
    } else {
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
              <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                <img
                  src={`/${item.backgroud}`}
                  alt={item.title}
                  className={`object-cover w-full h-full ${item.isComingSoon ? "grayscale-70" : ""
                    }`}
                />
              </div>

              {/* Game Description */}
              <div className="space-y-4">
                {/* Ticket Information */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        {/* <svg
                          className="w-4 h-4 text-blue-600 dark:text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg> */}
                        <img
                          src="/explorer/ticket.png"
                          alt="Ticket"
                          className="w-10 h-10"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          Game Cost
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Tickets required to play
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

                  {user && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-green-600 dark:text-green-400"
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
                          className={`text-lg font-bold ${userTickets >= item.ticketCost ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                        >
                          {userTickets}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {userTickets >= item.ticketCost
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
                  : !user
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    : userTickets < item.ticketCost
                      ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0",
              )}
              disabled={
                item.isComingSoon || !user || userTickets < item.ticketCost
              }
            >
              {item.isComingSoon
                ? "Coming Soon"
                : !user
                  ? "Sign In Required"
                  : userTickets < item.ticketCost
                    ? `Need ${item.ticketCost - userTickets} More Ticket${item.ticketCost - userTickets !== 1 ? "s" : ""}`
                    : `Play Game (${item.ticketCost} ticket${item.ticketCost !== 1 ? "s" : ""})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
