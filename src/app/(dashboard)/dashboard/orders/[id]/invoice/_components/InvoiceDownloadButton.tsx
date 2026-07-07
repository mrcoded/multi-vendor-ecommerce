"use client";

import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

function InvoiceDownloadButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="accent" size="sm" onClick={onClick} type="button">
      <Download className="size-4" />
      Download Invoice
    </Button>
  );
}

export default InvoiceDownloadButton;
