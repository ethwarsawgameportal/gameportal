import React from "react";

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Project Logo"
  >
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#9AE6B4" />
        <stop offset="50%" stopColor="#90CDF4" />
        <stop offset="100%" stopColor="#B794F4" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="92" fill="url(#g)" />
    <path
      d="M60 120c0-22 18-40 40-40s40 18 40 40"
      fill="none"
      stroke="#0F172A"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <circle cx="100" cy="80" r="10" fill="#0F172A" />
  </svg>
);

export default Logo;
