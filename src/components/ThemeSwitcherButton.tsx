"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

function ThemeSwitcherButton() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="text-lime-700 dark:text-lime-500"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme == "light" ? <Moon /> : <Sun />}
    </button>
  );
}

export default ThemeSwitcherButton;
