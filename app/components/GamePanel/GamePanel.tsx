import React, { useMemo, useState } from "react";
import { MarketItem, MARKET_ITEMS } from "./types";
import FilterToggleButton from "./FilterToggleButton";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Headers from "../Header";

export const DappExplorePage: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [onlyWithOther, setOnlyWithOther] = useState(false);
  const [levels, setLevels] = useState<{
    [K in MarketItem["difficulty"]]: boolean;
  }>({
    easy: true,
    medium: true,
    hard: true,
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const activeLevels = (
      Object.keys(levels) as MarketItem["difficulty"][]
    ).filter((k) => levels[k]);
    return MARKET_ITEMS.filter((item) => {
      if (onlyWithOther && !item.withOtherPlayer) return false;
      if (activeLevels.length && !activeLevels.includes(item.difficulty))
        return false;
      if (q && !`${item.title} ${item.description}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [query, onlyWithOther, levels]);

  const handleLevelChange = (
    level: MarketItem["difficulty"],
    value: boolean,
  ) => {
    setLevels((prev) => ({
      ...prev,
      [level]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white">
      {/* <PlaceholderHeader /> */}
      <Headers />

      <FilterToggleButton open={open} onOpen={() => setOpen(true)} />

      <div className="flex" style={{ height: "calc(100vh - 65px)" }}>
        <Sidebar
          open={open}
          onClose={() => setOpen(false)}
          query={query}
          onQueryChange={setQuery}
          onlyWithOther={onlyWithOther}
          onOnlyWithOtherChange={setOnlyWithOther}
          levels={levels}
          onLevelChange={handleLevelChange}
        />

        <MainContent open={open} filteredItems={filtered} />
      </div>
    </div>
  );
};
