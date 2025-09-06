import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/app/utils/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (query: string) => void;
  onlyWithOther: boolean;
  onOnlyWithOtherChange: (value: boolean) => void;
  levels: {
    [K in "easy" | "medium" | "hard"]: boolean;
  };
  onLevelChange: (level: "easy" | "medium" | "hard", value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  query,
  onQueryChange,
  onlyWithOther,
  onOnlyWithOtherChange,
  levels,
  onLevelChange,
}) => {
  return (
    <>
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 w-80 md:w-72 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur p-4 space-y-6 transition-transform",
          open ? "translate-x-0" : "-translate-x-80 md:-translate-x-72 !w-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Panel filtrów"
      >
        <div className="h-12 flex items-center justify-between mb-4">
          <span className="font-semibold">Filtry</span>
          <button
            aria-label="Zamknij"
            onClick={onClose}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          <label htmlFor="search" className="text-sm font-medium">
            Wyszukaj
          </label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <Input
              id="search"
              placeholder="Szukaj zadań, trybów…"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-sm font-medium">Tryb</span>
          <label className="flex items-center gap-3 text-sm">
            <Checkbox
              checked={onlyWithOther}
              onChange={(e) => onOnlyWithOtherChange(e.target.checked)}
            />
            with other player
          </label>
        </div>

        <div className="space-y-3">
          <span className="text-sm font-medium">Poziom trudności</span>
          <div className="space-y-2">
            {(["easy", "medium", "hard"] as const).map((lvl) => (
              <label key={lvl} className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={levels[lvl]}
                  onChange={(e) => onLevelChange(lvl, e.target.checked)}
                />
                {lvl}
              </label>
            ))}
          </div>
        </div>
      </aside>

      <button
        onClick={onClose}
        aria-label="Zamknij panel"
        className={cn(
          "fixed inset-0 z-40 bg-black/30 md:hidden transition-opacity",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />
    </>
  );
};

export default Sidebar;
