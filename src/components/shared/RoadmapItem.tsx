import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";

const RoadmapItem: React.FC<{
  q: string;
  title: string;
  points: string[];
  done?: boolean;
}> = ({ q, title, points, done }) => (
  <div className="relative pl-8 pb-8 last:pb-0">
    <div className="absolute left-1 top-1 w-1 h-full bg-slate-200 dark:bg-slate-700" />
    <div className="absolute -left-1 top-0 w-6 h-6 rounded-full grid place-items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
      {done ? (
        <CheckCircle2 className="w-4 h-4" />
      ) : (
        <div className="w-2 h-2 rounded-full bg-slate-400" />
      )}
    </div>
    <Badge variant="secondary" className="mb-2">
      {q}
    </Badge>
    <h4 className="text-lg font-semibold">{title}</h4>
    <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
      {points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

export default RoadmapItem;
