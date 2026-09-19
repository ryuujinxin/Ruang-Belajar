"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  Globe2,
  Languages,
  Search,
} from "lucide-react";

import {
  useLanguage,
  type LanguageCode,
} from "../../../../components/LanguageProvider";

type Language = {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
};

const languages: Language[] = [
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
  },
  {
    code: "zh-CN",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    flag: "🇨🇳",
  },
  {
    code: "zh-TW",
    name: "Chinese (Traditional)",
    nativeName: "繁體中文",
    flag: "🇹🇼",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
  },
  {
    code: "pt-BR",
    name: "Portuguese (Brazil)",
    nativeName: "Português (Brasil)",
    flag: "🇧🇷",
  },
  {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    flag: "🇳🇱",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
  },
  {
    code: "th",
    name: "Thai",
    nativeName: "ไทย",
    flag: "🇹🇭",
  },
  {
    code: "ms",
    name: "Malay",
    nativeName: "Bahasa Melayu",
    flag: "🇲🇾",
  },
  {
    code: "fil",
    name: "Filipino",
    nativeName: "Filipino",
    flag: "🇵🇭",
  },
  {
    code: "pl",
    name: "Polish",
    nativeName: "Polski",
    flag: "🇵🇱",
  },
  {
    code: "uk",
    name: "Ukrainian",
    nativeName: "Українська",
    flag: "🇺🇦",
  },
  {
    code: "sv",
    name: "Swedish",
    nativeName: "Svenska",
    flag: "🇸🇪",
  },
  {
    code: "da",
    name: "Danish",
    nativeName: "Dansk",
    flag: "🇩🇰",
  },
  {
    code: "no",
    name: "Norwegian",
    nativeName: "Norsk",
    flag: "🇳🇴",
  },
  {
    code: "fi",
    name: "Finnish",
    nativeName: "Suomi",
    flag: "🇫🇮",
  },
  {
    code: "cs",
    name: "Czech",
    nativeName: "Čeština",
    flag: "🇨🇿",
  },
  {
    code: "el",
    name: "Greek",
    nativeName: "Ελληνικά",
    flag: "🇬🇷",
  },
  {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
    flag: "🇮🇱",
  },
];

export default function LanguagePage() {
  const {
    language,
    setLanguage,
  } = useLanguage();

  const [search, setSearch] =
    useState("");

  const selectedLanguage =
    languages.find(
      (item) => item.code === language
    ) ?? languages[0];

  const filteredLanguages = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return languages;
    }

    return languages.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(query) ||
        item.nativeName
          .toLowerCase()
          .includes(query) ||
        item.code
          .toLowerCase()
          .includes(query)
    );
  }, [search]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-600/[0.07] blur-[110px]" />

        <div className="absolute -right-40 top-32 h-96 w-96 rounded-full bg-blue-500/[0.05] blur-[120px]" />

        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto min-h-screen w-full max-w-2xl px-4 pb-10 sm:px-6">
        {/* Header */}
        <header className="sticky top-0 z-40 -mx-4 flex h-[72px] items-center border-b border-border bg-background/85 px-4 backdrop-blur-2xl sm:-mx-6 sm:px-6">
          <Link
            href="/profile/settings"
            className="flex items-center gap-1 text-muted-strong transition hover:text-foreground active:scale-95"
          >
            <ChevronLeft
              size={22}
              strokeWidth={1.8}
            />

            <span className="text-[15px]">
              Pengaturan
            </span>
          </Link>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold">
            Bahasa
          </h1>
        </header>

        <div className="space-y-7 pt-7">
          {/* Current language */}
          <section>
            <div className="relative overflow-hidden rounded-[28px] border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.10] to-blue-500/[0.05] p-5">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/[0.10] blur-3xl" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-violet-500/10 text-violet-500">
                  <Languages
                    size={27}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[12px] text-muted">
                    Bahasa saat ini
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-2xl">
                      {selectedLanguage.flag}
                    </span>

                    <p className="truncate text-[17px] font-semibold">
                      {
                        selectedLanguage.nativeName
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Search */}
          <section>
            <div className="relative">
              <Search
                size={18}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Cari bahasa..."
                className="h-12 w-full rounded-[18px] border border-border bg-surface pl-11 pr-4 text-[14px] text-foreground outline-none transition placeholder:text-muted focus:border-border-strong focus:bg-surface-2"
              />
            </div>
          </section>

          {/* Language list */}
          <section>
            <div className="mb-3 flex items-center justify-between px-2">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted">
                PILIH BAHASA
              </p>

              <span className="text-[11px] text-muted">
                {filteredLanguages.length} bahasa
              </span>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-border bg-surface/90 backdrop-blur-xl">
              {filteredLanguages.length ===
              0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-muted">
                    <Search size={20} />
                  </div>

                  <p className="mt-4 text-[15px] font-medium">
                    Bahasa tidak ditemukan
                  </p>

                  <p className="mt-1 text-[12px] text-muted">
                    Coba cari dengan nama
                    bahasa yang lain.
                  </p>
                </div>
              ) : (
                filteredLanguages.map(
                  (item, index) => {
                    const active =
                      item.code === language;

                    return (
                      <div
                        key={item.code}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setLanguage(
                              item.code
                            )
                          }
                          className={`flex w-full items-center gap-4 px-4 py-3.5 text-left transition ${
                            active
                              ? "bg-surface-2"
                              : "hover:bg-surface-2 active:scale-[0.995]"
                          }`}
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-surface-2 text-2xl">
                            {item.flag}
                          </span>

                          <div className="min-w-0 flex-1">
                            <p className="text-[14px] font-medium text-foreground">
                              {
                                item.nativeName
                              }
                            </p>

                            <p className="mt-0.5 text-[11px] text-muted">
                              {item.name}
                            </p>
                          </div>

                          {active && (
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                              <Check
                                size={15}
                                strokeWidth={2.5}
                              />
                            </div>
                          )}
                        </button>

                        {index <
                          filteredLanguages.length -
                            1 && (
                          <div className="mx-4 border-t border-border" />
                        )}
                      </div>
                    );
                  }
                )
              )}
            </div>
          </section>

          {/* Info */}
          <section>
            <div className="flex gap-3 rounded-[20px] border border-border bg-surface/70 p-4">
              <Globe2
                size={18}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-muted"
              />

              <p className="text-[12px] leading-5 text-muted">
                Pilihan bahasa akan diterapkan
                langsung ke aplikasi menggunakan
                Google Translate. Tidak perlu
                membuka toolbar Google Translate.
              </p>
            </div>
          </section>

          <p className="pb-6 text-center text-[11px] text-muted">
            Ruang Belajar · Preferensi Bahasa
          </p>
        </div>
      </div>
    </main>
  );
}