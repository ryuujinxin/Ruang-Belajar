"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const LANGUAGE_KEY = "ruang-belajar-language";

export type LanguageCode =
  | "id"
  | "en"
  | "ja"
  | "ko"
  | "zh-CN"
  | "zh-TW"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "pt-BR"
  | "nl"
  | "ru"
  | "ar"
  | "hi"
  | "tr"
  | "vi"
  | "th"
  | "ms"
  | "fil"
  | "pl"
  | "uk"
  | "sv"
  | "da"
  | "no"
  | "fi"
  | "cs"
  | "el"
  | "he";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
};

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
      };
    };

    googleTranslateElementInit?: () => void;
  }
}

const GOOGLE_LANGUAGES: Record<
  LanguageCode,
  string
> = {
  id: "id",
  en: "en",
  ja: "ja",
  ko: "ko",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  es: "es",
  fr: "fr",
  de: "de",
  it: "it",
  pt: "pt",
  "pt-BR": "pt-BR",
  nl: "nl",
  ru: "ru",
  ar: "ar",
  hi: "hi",
  tr: "tr",
  vi: "vi",
  th: "th",
  ms: "ms",
  fil: "tl",
  pl: "pl",
  uk: "uk",
  sv: "sv",
  da: "da",
  no: "no",
  fi: "fi",
  cs: "cs",
  el: "el",
  he: "iw",
};

const SUPPORTED_LANGUAGES = Object.values(
  GOOGLE_LANGUAGES
).join(",");

const LanguageContext =
  createContext<LanguageContextValue | null>(null);

function getSavedLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return "id";
  }

  const saved = localStorage.getItem(
    LANGUAGE_KEY
  ) as LanguageCode | null;

  if (
    saved &&
    Object.prototype.hasOwnProperty.call(
      GOOGLE_LANGUAGES,
      saved
    )
  ) {
    return saved;
  }

  return "id";
}

function setGoogleCookie(
  language: LanguageCode
) {
  if (typeof document === "undefined") return;

  if (language === "id") {
    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    document.cookie =
      "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" +
      window.location.hostname;

    return;
  }

  const googleLanguage =
    GOOGLE_LANGUAGES[language];

  const value = `/id/${googleLanguage}`;

  document.cookie = `googtrans=${value}; path=/`;

  /*
   * Beberapa environment Google Translate
   * menggunakan cookie dengan domain.
   */
  if (
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}`;
  }
}

function getGoogleSelect() {
  return document.querySelector(
    ".goog-te-combo"
  ) as HTMLSelectElement | null;
}

function triggerGoogleTranslation(
  language: LanguageCode
) {
  if (language === "id") return;

  const googleLanguage =
    GOOGLE_LANGUAGES[language];

  if (!googleLanguage) return;

  const select = getGoogleSelect();

  if (!select) return;

  select.value = googleLanguage;

  select.dispatchEvent(
    new Event("change", {
      bubbles: true,
    })
  );
}

function loadGoogleTranslate(): Promise<void> {
  return new Promise((resolve) => {
    if (
      window.google?.translate?.TranslateElement
    ) {
      resolve();
      return;
    }

    window.googleTranslateElementInit = () => {
      resolve();
    };

    const existing = document.querySelector(
      'script[src*="translate_a/element.js"]'
    );

    if (existing) {
      let attempts = 0;

      const interval = window.setInterval(() => {
        attempts++;

        if (
          window.google?.translate
            ?.TranslateElement
        ) {
          window.clearInterval(interval);
          resolve();
        }

        if (attempts >= 100) {
          window.clearInterval(interval);
          resolve();
        }
      }, 100);

      return;
    }

    const script =
      document.createElement("script");

    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

    script.async = true;

    script.onload = () => {
      window.setTimeout(resolve, 300);
    };

    script.onerror = () => {
      resolve();
    };

    document.body.appendChild(script);
  });
}

function initializeGoogleWidget() {
  const element = document.getElementById(
    "google_translate_element"
  );

  if (
    !element ||
    !window.google?.translate
      ?.TranslateElement
  ) {
    return;
  }

  if (element.dataset.initialized === "true") {
    return;
  }

  element.dataset.initialized = "true";

  new window.google.translate.TranslateElement(
    {
      pageLanguage: "id",
      includedLanguages: SUPPORTED_LANGUAGES,
      autoDisplay: false,
    },
    "google_translate_element"
  );
}

function removeGoogleUI() {
  const styleId =
    "ruang-belajar-google-translate-style";

  if (document.getElementById(styleId)) {
    return;
  }

  const style =
    document.createElement("style");

  style.id = styleId;

  style.textContent = `
    #google_translate_element {
      position: fixed !important;
      left: -99999px !important;
      top: -99999px !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      visibility: hidden !important;
    }

    .goog-te-banner-frame {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
    }

    .goog-te-balloon-frame {
      display: none !important;
    }

    body {
      top: 0 !important;
    }

    .goog-tooltip {
      display: none !important;
    }

    .goog-tooltip:hover {
      display: none !important;
    }

    .goog-text-highlight {
      background: transparent !important;
      box-shadow: none !important;
    }

    .skiptranslate {
      display: inherit;
    }

    body > .skiptranslate {
      display: none !important;
    }
  `;

  document.head.appendChild(style);
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] =
    useState<LanguageCode>("id");

  const applyLanguage = useCallback(
    async (nextLanguage: LanguageCode) => {
      localStorage.setItem(
        LANGUAGE_KEY,
        nextLanguage
      );

      setLanguageState(nextLanguage);

      setGoogleCookie(nextLanguage);

      if (nextLanguage === "id") {
        /*
         * Hapus terjemahan Google dan kembali
         * ke source language.
         */
        window.location.reload();
        return;
      }

      /*
       * Pastikan Google Translate sudah tersedia.
       */
      await loadGoogleTranslate();

      initializeGoogleWidget();

      /*
       * Google membutuhkan waktu untuk membuat
       * select.goog-te-combo.
       */
      let attempts = 0;

      const interval = window.setInterval(() => {
        attempts++;

        triggerGoogleTranslation(
          nextLanguage
        );

        const select = getGoogleSelect();

        if (select || attempts >= 40) {
          window.clearInterval(interval);
        }
      }, 150);
    },
    []
  );

  useEffect(() => {
    const saved = getSavedLanguage();

    setLanguageState(saved);

    /*
     * Pastikan cookie mengikuti localStorage.
     */
    setGoogleCookie(saved);

    removeGoogleUI();

    let mounted = true;

    async function setup() {
      await loadGoogleTranslate();

      if (!mounted) return;

      initializeGoogleWidget();

      if (saved !== "id") {
        let attempts = 0;

        const interval =
          window.setInterval(() => {
            attempts++;

            triggerGoogleTranslation(
              saved
            );

            const select =
              getGoogleSelect();

            if (
              select ||
              attempts >= 40
            ) {
              window.clearInterval(
                interval
              );
            }
          }, 150);
      }
    }

    setup();

    const observer =
      new MutationObserver(() => {
        removeGoogleUI();
      });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    /*
     * Jika Next.js berpindah halaman tanpa
     * full reload, trigger ulang Google Translate.
     */
    if (language === "id") return;

    const timer = window.setTimeout(() => {
      triggerGoogleTranslation(language);
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [language]);

  const setLanguage = useCallback(
    (nextLanguage: LanguageCode) => {
      applyLanguage(nextLanguage);

      window.dispatchEvent(
        new CustomEvent(
          "ruang-belajar-language-changed",
          {
            detail: nextLanguage,
          }
        )
      );
    },
    [applyLanguage]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      <div
        id="google_translate_element"
        aria-hidden="true"
      />

      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage harus digunakan di dalam LanguageProvider"
    );
  }

  return context;
}