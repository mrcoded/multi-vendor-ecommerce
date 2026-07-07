"use client";

import { useActionState } from "react";

import {
  subscribeToNewsletter,
  type NewsletterState,
} from "@/lib/actions/newsletter";
import { cn } from "@/lib/utils";

const initialState: NewsletterState = {
  success: false,
  message: "",
};

export default function FooterNewsletter() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  return (
    <div className="lg:col-span-5">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Stay updated
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Get product drops, seller tips, and exclusive deals in your inbox.
      </p>

      <form action={formAction} className="mt-4 space-y-2">
        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <label htmlFor="footer-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="johndoe@example.com"
            required
            disabled={isPending}
            className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Joining..." : "Subscribe"}
          </button>
        </div>

        {state.message ? (
          <p
            role="status"
            className={cn(
              "text-xs",
              state.success ? "text-primary" : "text-destructive",
            )}
          >
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
