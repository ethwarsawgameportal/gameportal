import React from "react";

const Step: React.FC<{ n: number; title: string; text: string }> = ({
  n,
  title,
  text,
}) => (
  <div className="flex items-start gap-4">
    <div className="shrink-0 rounded-full w-10 h-10 grid place-items-center bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold">
      {n}
    </div>
    <div className="space-y-1">
      <h4 className="text-lg font-semibold tracking-tight">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {text}
      </p>
    </div>
  </div>
);

export default Step;
