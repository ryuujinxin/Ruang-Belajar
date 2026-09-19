"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

type Theme = "dark" | "light" | "system";

const THEME_KEY = "ruang-belajar-theme";

const themes: {
  id: Theme;
  title: string;
  description: string;
  icon: typeof Sun;
}[] = [
  {
    id: "light",
    title: "Terang",
    description: "Gunakan tampilan terang di seluruh aplikasi",
    icon: Sun,
  },
  {
    id: "dark",
    title: "Gelap",
    description: "Gunakan tampilan gelap di seluruh aplikasi",
    icon: Moon,
  },
  {
    id: "system",
    title: "Mengikuti sistem",
    description: "Ikuti pengaturan tampilan perangkat",
    icon: Monitor,
  },
];

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  const actualTheme =
    theme === "system"
      ? getSystemTheme()
      : theme;

  /*
   * Simpan pilihan user di data-theme.
   *
   * Contoh:
   * data-theme="light"
   * data-theme="dark"
   * data-theme="system"
   */
  root.dataset.theme = theme;

  /*
   * Class light/dark adalah theme aktif sebenarnya.
   */
  root.classList.remove("light", "dark");
  root.classList.add(actualTheme);

  /*
   * Beritahu browser bahwa UI sedang light/dark.
   */
  root.style.colorScheme = actualTheme;
}

function readSavedTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const saved = localStorage.getItem(THEME_KEY);

  if (
    saved === "light" ||
    saved === "dark" ||
    saved === "system"
  ) {
    return saved;
  }

  return "dark";
}

export default function AppearancePage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  /*
   * Ambil theme yang tersimpan ketika halaman dibuka.
   */
  useEffect(() => {
    const savedTheme = readSavedTheme();

    setTheme(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);

    /*
     * Kalau user memilih "Mengikuti sistem",
     * perubahan OS juga langsung diterapkan.
     */
    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemChange = () => {
      const currentTheme = readSavedTheme();

      if (currentTheme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener(
      "change",
      handleSystemChange
    );

    /*
     * Sinkronisasi apabila theme diubah dari komponen lain.
     */
    const handleThemeChanged = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<Theme>;

      const nextTheme = customEvent.detail;

      if (
        nextTheme === "light" ||
        nextTheme === "dark" ||
        nextTheme === "system"
      ) {
        setTheme(nextTheme);
        applyTheme(nextTheme);
      }
    };

    window.addEventListener(
      "ruang-belajar-theme-changed",
      handleThemeChanged
    );

    return () => {
      media.removeEventListener(
        "change",
        handleSystemChange
      );

      window.removeEventListener(
        "ruang-belajar-theme-changed",
        handleThemeChanged
      );
    };
  }, []);

  /*
   * User memilih theme.
   */
  function handleThemeChange(nextTheme: Theme) {
    /*
     * Update UI sekarang juga.
     */
    setTheme(nextTheme);

    /*
     * Simpan permanen di browser.
     */
    localStorage.setItem(
      THEME_KEY,
      nextTheme
    );

    /*
     * Terapkan langsung.
     */
    applyTheme(nextTheme);

    /*
     * Beritahu seluruh aplikasi.
     */
    window.dispatchEvent(
      new CustomEvent(
        "ruang-belajar-theme-changed",
        {
          detail: nextTheme,
        }
      )
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -right-32 top-40 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto min-h-screen w-full max-w-2xl px-5 pb-12">
        {/* Header */}
        <header className="sticky top-0 z-30 -mx-5 border-b border-border bg-background/80 px-5 py-4 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <Link
              href="/profile/settings"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-foreground hover:bg-surface-3"
              aria-label="Kembali"
            >
              <ArrowLeft size={19} />
            </Link>

            <div>
              <h1 className="text-[17px] font-semibold tracking-tight">
                Tampilan
              </h1>

              <p className="text-xs text-muted">
                Atur tampilan Ruang Belajar
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="pt-7">
          {/* Intro */}
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Tema
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Pilih tampilan
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              Tema yang kamu pilih akan digunakan di
              seluruh aplikasi Ruang Belajar.
            </p>
          </div>

          {/* Theme options */}
          <div className="space-y-3">
            {themes.map((item) => {
              const Icon = item.icon;
              const active =
                mounted && theme === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleThemeChange(item.id)
                  }
                  className={[
                    "group flex w-full items-center gap-4 rounded-[24px] border p-4 text-left",
                    "transition-all duration-200",
                    active
                      ? "border-violet-500/40 bg-violet-500/10"
                      : "border-border bg-surface hover:bg-surface-2",
                  ].join(" ")}
                >
                  {/* Icon */}
                  <div
                    className={[
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                      active
                        ? "bg-violet-500/15 text-violet-500"
                        : "bg-surface-2 text-muted-strong",
                    ].join(" ")}
                  >
                    <Icon size={21} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm leading-5 text-muted">
                      {item.description}
                    </p>
                  </div>

                  {/* Check */}
                  <div
                    className={[
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                      active
                        ? "border-violet-500 bg-violet-500 text-white"
                        : "border-border bg-surface-2",
                    ].join(" ")}
                  >
                    {active && (
                      <Check size={15} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preview */}
          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Preview
            </p>

            <div className="overflow-hidden rounded-[28px] border border-border bg-surface p-5 shadow-sm">
              {/* Fake profile header */}
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />

                <div className="flex-1">
                  <div className="h-3 w-28 rounded-full bg-surface-3" />

                  <div className="mt-2 h-2.5 w-20 rounded-full bg-surface-2" />
                </div>

                <div className="h-9 w-9 rounded-full bg-surface-2" />
              </div>

              {/* Fake card */}
              <div className="mt-5 rounded-2xl bg-surface-2 p-4">
                <div className="h-3 w-24 rounded-full bg-surface-3" />

                <div className="mt-3 h-2.5 w-full rounded-full bg-surface-3" />

                <div className="mt-2 h-2.5 w-3/4 rounded-full bg-surface-3" />
              </div>
            </div>
          </div>

          {/* Active theme */}
          <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
            <p className="text-sm font-medium">
              Tema aktif
            </p>

            <p className="mt-1 text-sm text-muted">
              {theme === "light"
                ? "Terang"
                : theme === "dark"
                  ? "Gelap"
                  : "Mengikuti sistem"}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}