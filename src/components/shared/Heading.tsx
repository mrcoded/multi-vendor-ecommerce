import React from "react";

function Heading({ title }: { title: string }) {
  return <h2 className="text-2xl font-semibold text-slate-50">{title}</h2>;
}

export default Heading;
