import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-[2px] transition-all">
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800">
        {/* Animated Spinner with your brand color */}
        <Loader2 className="h-10 w-10 animate-spin text-lime-600" />

        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
