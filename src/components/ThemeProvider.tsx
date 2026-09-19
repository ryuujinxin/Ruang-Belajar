"use client";

import { useEffect } from "react";

const THEME_KEY = "ruang-belajar-theme";

type Theme = "dark" | "light" | "system";

function getActualTheme(theme: Theme): "dark" | "light" {
  if (theme === "dark" || theme === "light") {
    return theme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const actualTheme = getActualTheme(theme);

  root.dataset.theme = theme;

  root.classList.remove("dark", "light");
  root.classList.add(actualTheme);

  root.style.colorScheme = actualTheme;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const savedTheme = localStorage.getItem(
      THEME_KEY
    ) as Theme | null;

    const theme: Theme =
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
        ? savedTheme
        : "dark";

    applyTheme(theme);

    const handleThemeChange = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<Theme>;

      if (
        customEvent.detail === "light" ||
        customEvent.detail === "dark" ||
        customEvent.detail === "system"
      ) {
        applyTheme(customEvent.detail);
      }
    };

    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemChange = () => {
      const currentTheme = localStorage.getItem(
        THEME_KEY
      ) as Theme | null;

      if (currentTheme === "system") {
        applyTheme("system");
      }
    };

    window.addEventListener(
      "ruang-belajar-theme-changed",
      handleThemeChange
    );

    media.addEventListener(
      "change",
      handleSystemChange
    );

    return () => {
      window.removeEventListener(
        "ruang-belajar-theme-changed",
        handleThemeChange
      );

      media.removeEventListener(
        "change",
        handleSystemChange
      );
    };
  }, []);

  return <>{children}</>;
}