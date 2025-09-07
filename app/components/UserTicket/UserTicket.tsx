import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { TicketDropDown } from "./TiketDropDown";
import { useUser } from "@civic/auth-web3/react";

export const UserTicket = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        className="flex items-center gap-1 px-1 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center">
          <img src="/explorer/ticket.png" alt="Ticket" className="w-10 h-10" />
        </div>
        <span className="text-sm font-medium text-slate-900 dark:text-white">
          1
        </span>
        <ChevronDown className="w-4 h-4 text-slate-500" />
      </Button>

      {showProfileDropdown && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
          <TicketDropDown variant="full" className="border-0 shadow-none" />
        </div>
      )}
    </div>
  );
};
