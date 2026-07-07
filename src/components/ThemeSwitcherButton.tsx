"use client";

import React from "react";

import { useTheme } from "@/providers/ThemeProvider";

import { Moon, Sun } from "lucide-react";

import { useIsMounted } from "@/hooks/useIsMounted";

function ThemeSwitcherButton() {
  const mounted = useIsMounted();

  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="inline-flex size-9 items-center justify-center rounded-md text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      suppressHydrationWarning
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )
      ) : (
        <Moon className="size-5 opacity-40" aria-hidden />
      )}
    </button>
  );
}

export default ThemeSwitcherButton;
