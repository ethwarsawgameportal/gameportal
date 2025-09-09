import React from "react";
import { Logo } from "../shared";

const Footer: React.FC = () => (
  <footer className="border-t border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Logo className="w-8 h-8" />
        <span className="text-sm text-slate-500">
          © 2025 Game Portal • All rights reserved
        </span>
      </div>
      {/* <div className="flex items-center gap-4 text-sm">
        <a className="hover:underline" href="#">
          Twitter
        </a>
        <a className="hover:underline" href="#">
          Discord
        </a>
        <a className="hover:underline" href="#">
          Docs
        </a>
      </div> */}
    </div>
  </footer>
);

export default Footer;
