"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Share2, X } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function resolveShareUrl(urlToShare: string): string {
  if (typeof window === "undefined") {
    return urlToShare;
  }

  try {
    const parsed = new URL(urlToShare, window.location.origin);
    return `${window.location.origin}${parsed.pathname}${parsed.search}`;
  } catch {
    const path = urlToShare.startsWith("/") ? urlToShare : `/${urlToShare}`;
    return `${window.location.origin}${path}`;
  }
}

async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through
    }
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

function canUseNativeShare(shareUrl: string, title: string): boolean {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.share !== "function"
  ) {
    return false;
  }

  const payload = { title, url: shareUrl };

  try {
    return navigator.canShare ? navigator.canShare(payload) : true;
  } catch {
    return false;
  }
}

function ProductShareButton({
  urlToShare,
  title,
  className,
}: {
  urlToShare: string;
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const shareUrl = useMemo(() => resolveShareUrl(urlToShare), [urlToShare]);
  const nativeShareAvailable = canUseNativeShare(shareUrl, title);

  async function handleCopy() {
    const copiedOk = await copyToClipboard(shareUrl);

    if (copiedOk) {
      setCopied(true);
      toast.success("Link copied to clipboard");
      window.setTimeout(() => setCopied(false), 2000);
      return;
    }

    toast.error("Could not copy link. Select and copy it manually.");
  }

  async function handleNativeShare() {
    try {
      await navigator.share({ title, url: shareUrl });
      setSheetOpen(false);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      toast.error("Could not open share menu");
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => setSheetOpen(true)}
        className={cn("shrink-0", className)}
        aria-label="Share product"
      >
        {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      </Button>

      {sheetOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Share product link"
          onClick={() => setSheetOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border bg-card p-4 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-foreground">
                Share this product
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setSheetOpen(false)}
                aria-label="Close share dialog"
              >
                <X className="size-4" />
              </Button>
            </div>

            <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
              {title}
            </p>

            <div className="flex items-center gap-2">
              <input
                readOnly
                value={shareUrl}
                className="h-9 min-w-0 flex-1 rounded-md border border-input bg-muted/40 px-3 text-xs text-foreground"
                onFocus={(event) => event.currentTarget.select()}
              />
              <Button
                type="button"
                size="sm"
                onClick={handleCopy}
                className="shrink-0 gap-1.5"
              >
                <Copy className="size-3.5" />
                Copy
              </Button>
            </div>

            {nativeShareAvailable && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3 w-full gap-2"
                onClick={handleNativeShare}
              >
                <Share2 className="size-4" />
                Share via apps
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductShareButton;
