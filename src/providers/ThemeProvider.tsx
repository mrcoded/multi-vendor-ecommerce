"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import AuthProvider from "./AuthProvider";

import { CartHydrator } from "./CartHydrator";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => ({ default: mod.Toaster })),
  { ssr: false },
);

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

type ThemeSnapshot = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
};

const listeners = new Set<() => void>();

let snapshot: ThemeSnapshot = {
  theme: "system",
  resolvedTheme: "light",
};

const SERVER_SNAPSHOT: ThemeSnapshot = {
  theme: "system",
  resolvedTheme: "light",
};

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const value = localStorage.getItem("theme");
    if (value === "light" || value === "dark" || value === "system") {
      return value;
    }
  } catch {
    // ignore
  }
  return "system";
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "dark") return "dark";
  if (theme === "light") return "light";
  return getSystemTheme();
}

function logTheme(
  location: string,
  message: string,
  data: Record<string, unknown>,
  hypothesisId: string,
) {
  // #region agent log
  fetch("/api/debug-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: "7c8a36",
      runId: "post-fix-v6",
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}

function samplePaint(resolved: ResolvedTheme, ms: number) {
  const header = document.querySelector("header");
  const card =
    document.querySelector("[data-product-card]") ??
    document.querySelector("main .rounded-lg.border");
  const cardStyle = card ? getComputedStyle(card) : null;
  logTheme(
    "ThemeProvider:samplePaint",
    `color sample +${ms}ms`,
    {
      resolved,
      delayMs: ms,
      htmlClass: document.documentElement.className,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      headerBg: header ? getComputedStyle(header).backgroundColor : null,
      cardBg: cardStyle?.backgroundColor ?? null,
      cardTransition: cardStyle?.transitionProperty ?? null,
    },
    "G1",
  );
}

function applyThemeToDocument(resolved: ResolvedTheme) {
  const root = document.documentElement;
  const shouldBeDark = resolved === "dark";
  const isDark = root.classList.contains("dark");

  if (isDark === shouldBeDark && !root.classList.contains("light")) {
    return;
  }

  root.classList.toggle("dark", shouldBeDark);
  root.classList.remove("light");
}

function applyThemeToDocumentWithTelemetry(resolved: ResolvedTheme) {
  applyThemeToDocument(resolved);
  logTheme(
    "ThemeProvider:applyTheme",
    "theme applied",
    {
      resolved,
      htmlClass: document.documentElement.className,
      hasDark: document.documentElement.classList.contains("dark"),
      hasLight: document.documentElement.classList.contains("light"),
    },
    "A",
  );
  samplePaint(resolved, 0);
  requestAnimationFrame(() => samplePaint(resolved, 16));
  setTimeout(() => samplePaint(resolved, 100), 100);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot(): ThemeSnapshot {
  return SERVER_SNAPSHOT;
}

export function setTheme(next: Theme) {
  try {
    localStorage.setItem("theme", next);
  } catch {
    // ignore
  }

  snapshot = {
    theme: next,
    resolvedTheme: resolveTheme(next),
  };
  applyThemeToDocumentWithTelemetry(snapshot.resolvedTheme);
  emit();
}

function initTheme() {
  const stored = readStoredTheme();
  snapshot = {
    theme: stored,
    resolvedTheme: resolveTheme(stored),
  };
  applyThemeToDocument(snapshot.resolvedTheme);
}

export function useTheme() {
  const state = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    theme: state.theme,
    resolvedTheme: state.resolvedTheme,
    setTheme,
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useLayoutEffect(() => {
    initTheme();

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (readStoredTheme() !== "system") return;
      snapshot = {
        theme: "system",
        resolvedTheme: getSystemTheme(),
      };
      applyThemeToDocument(snapshot.resolvedTheme);
      emit();
    };

    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <Provider store={store}>
          <CartHydrator />
          {children}
        </Provider>
      </AuthProvider>
    </>
  );
}
