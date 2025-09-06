import React from "react";

interface FilterToggleButtonProps {
  open: boolean;
  onOpen: () => void;
}

const FilterToggleButton: React.FC<FilterToggleButtonProps> = ({
  open,
  onOpen,
}) => {
  if (open) return null;

  return (
    <button
      onClick={onOpen}
      className="fixed left-3 top-20 sm:top-24 z-40 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-3 py-1.5 text-sm shadow-sm"
      aria-label="Otwórz filtry"
    >
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="22 3 2 3 10 12 10 19 14 21 14 12 22 3"></polygon>
      </svg>
      Filtry
    </button>
  );
};

export default FilterToggleButton;
