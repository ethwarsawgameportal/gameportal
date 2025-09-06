import React from "react";
import { MarketItem } from "./types";

interface GameCardProps {
  item: MarketItem;
}

const GameCard: React.FC<GameCardProps> = ({ item }) => {
  return (
    <div
      key={item.id}
      className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
    >
      <div
        className="aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800"
        aria-hidden
      >
        <img
          src={`/${item.backgroud}`}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-base">{item.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
