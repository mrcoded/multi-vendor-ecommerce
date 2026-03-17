import React from "react";
import { LucideIcon } from "lucide-react";

interface SmallCardProps {
  data: {
    title: string;
    number: string;
    iconBg: string;
    icon: LucideIcon;
  };
}

function SmallCard({ data }: SmallCardProps) {
  const { title, number, iconBg, icon: Icon } = data;
  return (
    <div className="rounded-lg shadow-lg bg-slate-50 dark:bg-slate-700 p-4 dark:text-slate-50 text-slate-800">
      <div className="flex space-x-4 md:space-x-4 xl:space-x-4">
        <div
          className={`size-12 md:size-9 xl:size-12 ${iconBg} rounded-full items-center flex justify-center`}
        >
          <Icon className="size-7 md:size-4 xl:size-7 text-slate-50 dark:text-slate-50" />
        </div>
        <div className="">
          <p>{title}</p>
          <h3 className="text-2xl font-bold">{number}</h3>
        </div>
      </div>
    </div>
  );
}

export default SmallCard;
