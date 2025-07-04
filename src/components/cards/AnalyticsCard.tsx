import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function AnalyticsCard({
  data,
}: {
  data: { title: string; count: string; link: string };
}) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-400 p-4">
      <h3 className="text-xl text-center">{data.title}</h3>
      <h4 className="text-3xl text-center">{data.count}</h4>
      <div className="mx-2 my-3 h-px bg-slate-200" />
      <Link
        className="flex items-center gap-3 mx-2 text-center text-slate-300 underline"
        href={data.link}
      >
        View More
        <ArrowRight className="size-4 " />
      </Link>
    </div>
  );
}

export default AnalyticsCard;
