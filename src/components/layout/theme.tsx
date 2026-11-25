"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const themeKey = "portfolio-theme";
const themeEvent = "portfolio-theme-change";

function getTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(callback: () => void) {
  function syncStorage(event: StorageEvent) {
    if (event.key === themeKey || event.key === null) {
      document.documentElement.dataset.theme =
        event.newValue === "light" ? "light" : "dark";
      callback();
    }
  }
  window.addEventListener(themeEvent, callback);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener(themeEvent, callback);
    window.removeEventListener("storage", syncStorage);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");

  function toggleTheme() {
    const next = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(themeKey, next);
    } catch {}
    window.dispatchEvent(new Event(themeEvent));
  }

  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={toggleTheme}
      aria-label="Light theme"
      aria-pressed={theme === "light"}
    >
      <Sun className="theme-sun" size={18} aria-hidden="true" />
      <Moon className="theme-moon" size={18} aria-hidden="true" />
    </button>
  );
}
