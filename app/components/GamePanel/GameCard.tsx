import React, { useState } from "react";

import { MarketItem } from "./types";
import { twMerge } from "tailwind-merge";
import GameModal from "./GameModal";

interface GameCardProps {
  item: MarketItem;
}

const GameCard: React.FC<GameCardProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (!item.isComingSoon) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        key={item.id}
        onClick={handleCardClick}
        className={twMerge(
          "overflow-hidden cursor-not-allowed rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200",
          !item.isComingSoon &&
            "hover:shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        )}
      >
        <div
          className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800"
          aria-hidden
        >
          {!item.isComingSoon && (
            <div className="absolute top-2 left-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-sm font-medium text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.7)] animate-pulse">
                Live
              </span>
            </div>
          )}
          <img
            src={`/${item.backgroud}`}
            alt={item.title}
            className={`object-cover w-full h-full ${
              item.isComingSoon ? "grayscale-70" : ""
            }`}
          />
          {item.isComingSoon && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <span className="text-white text-lg font-semibold drop-shadow-lg">
                Coming Soon
              </span>
            </div>
          )}
        </div>
        <div className="p-4 ">
          <h3 className="font-semibold text-base">{item.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span className="ml-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                  5 players
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Difficulty:
              </span>
              <div className="flex">
                {item.difficulty === "easy" && (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 ml-0.5"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 ml-0.5"></div>
                  </>
                )}
                {item.difficulty === "medium" && (
                  <>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500 ml-0.5"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 ml-0.5"></div>
                  </>
                )}
                {item.difficulty === "hard" && (
                  <>
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-red-500 ml-0.5"></div>
                    <div className="w-2 h-2 rounded-full bg-red-500 ml-0.5"></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <GameModal item={item} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default GameCard;
