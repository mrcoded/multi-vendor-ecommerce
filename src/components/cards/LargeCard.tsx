import React from "react";
import { Layers } from "lucide-react";

interface LargeCardProps {
  data: {
    period: string;
    sales: number;
    color: string;
  };
}

function LargeCard({ data }: LargeCardProps) {
  return (
    <div
      className={`rounded-lg text-white shadow-md p-8 flex items-center flex-col gap-2 ${data.color}`}
    >
      <Layers />
      <h4>{data.period}</h4>
      <h2 className="text-2xl lg:text-3xl">{data.sales}</h2>
    </div>
  );
}

export default LargeCard;
