import React from "react";

function Heading({ title }: { title: string }) {
  return (
    <h2 className="text-lg sm:text-2xl font-semibold text-foreground">
      {title}
    </h2>
  );
}

export default Heading;
