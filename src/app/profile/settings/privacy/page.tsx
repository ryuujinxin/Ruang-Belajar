"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  Database,
  Eye,
  EyeOff,
  Info,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

const PRIVACY_KEY = "ruang-belajar-privacy";

type PrivacySettings = {
  profileVisible: boolean;
  personalization: boolean;
  saveProgress: boolean;
};

const DEFAULT_PRIVACY: PrivacySettings = {
  profileVisible: true,
  personalization: true,
  saveProgress: true,
};

export default function PrivacyPage() {
  const [settings, setSettings] =
    useState<PrivacySettings>(DEFAULT_PRIVACY);

  const [ready, setReady] = useState(false);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  // Load privacy settings
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PRIVACY_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        setSettings({
          ...DEFAULT_PRIVACY,
          ...parsed,
        });
      }
    } catch {
      setSettings(DEFAULT_PRIVACY);
    }

    setReady(true);
  }, []);

  function saveSettings(
    nextSettings: PrivacySettings,
  ) {
    setSettings(nextSettings);

    localStorage.setItem(
      PRIVACY_KEY,
      JSON.stringify(nextSettings),
    );

    // Beri tahu halaman lain bahwa privacy berubah.
    window.dispatchEvent(
      new CustomEvent("ruang-belajar-privacy-changed", {
        detail: nextSettings,
      }),
    );
  }

  function toggle(
    key: keyof PrivacySettings,
  ) {
    const nextSettings = {
      ...settings,
      [key]: !settings[key],
    };

    saveSettings(nextSettings);
  }

  function deleteLocalData() {
    /*
     * Hapus seluruh data lokal aplikasi.
     *
     * Tambahkan key baru ke daftar ini setiap kali
     * aplikasi mempunyai storage lokal baru.
     */

    const keysToDelete = [
      "ruang-belajar-profile",
      "ruang-belajar-profile-images",
      "ruang-belajar-settings",
      "ruang-belajar-privacy",
      "ruang-belajar-progress",
      "ruang-belajar-practice",
      "ruang-belajar-learning",
    ];

    keysToDelete.forEach((key) => {
      localStorage.removeItem(key);
    });

    sessionStorage.clear();

    setShowDeleteModal(false);

    // Setelah data dihapus, user kembali ke onboarding.
    window.location.href = "/onboarding";
  }

  if (!ready) {
    return (
      <main className="min-h-screen bg-[#08080b]" />
    );
  }

  return (
    <main className="min-h-screen bg-[#08080b] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-600/[0.10] blur-[110px]" />

        <div className="absolute -right-32 top-48 h-80 w-80 rounded-full bg-blue-500/[0.07] blur-[110px]" />

        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/[0.04] blur-[100px]" />
      </div>

      <div className="relative mx-auto min-h-screen w-full max-w-2xl px-4 pb-12 sm:px-6">
        {/* Header */}
        <header className="sticky top-0 z-40 -mx-4 flex h-[72px] items-center border-b border-white/[0.05] bg-[#08080b]/85 px-4 backdrop-blur-2xl sm:-mx-6 sm:px-6">
          <Link
            href="/profile/settings"
            className="flex items-center gap-1 text-white/70 transition active:scale-95"
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
            Privasi
          </h1>

          <div className="w-[80px]" />
        </header>

        <div className="space-y-7 pt-7">
          {/* Privacy status */}
          <section>
            <div className="relative overflow-hidden rounded-[28px] border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.10] to-blue-500/[0.05] p-5">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/[0.12] blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-violet-500/10 text-violet-400">
                    <ShieldCheck
                      size={27}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <p className="text-[17px] font-semibold">
                      Kontrol privasi
                    </p>

                    <p className="mt-1 text-[12px] text-white/40">
                      Pengaturan ini langsung memengaruhi aplikasi.
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-[13px] leading-5 text-white/40">
                  Kamu dapat menentukan bagaimana profil,
                  rekomendasi, dan progres belajar diproses
                  pada perangkat ini.
                </p>
              </div>
            </div>
          </section>

          {/* Profile visibility */}
          <section>
            <SectionTitle>
              VISIBILITAS PROFIL
            </SectionTitle>

            <div className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.035] backdrop-blur-xl">
              <PrivacyToggle
                icon={
                  settings.profileVisible ? (
                    <Eye
                      size={20}
                      strokeWidth={1.8}
                    />
                  ) : (
                    <EyeOff
                      size={20}
                      strokeWidth={1.8}
                    />
                  )
                }
                title="Profil terlihat"
                description={
                  settings.profileVisible
                    ? "Profil dapat ditampilkan pada fitur profil publik."
                    : "Profil tidak ditampilkan pada fitur profil publik."
                }
                enabled={settings.profileVisible}
                onChange={() => toggle("profileVisible")}
              />
            </div>

            <p className="mt-2 px-2 text-[11px] leading-5 text-white/20">
              Status ini tersimpan dan dapat digunakan oleh
              fitur profil publik aplikasi.
            </p>
          </section>

          {/* Personalization */}
          <section>
            <SectionTitle>
              PERSONALISASI
            </SectionTitle>

            <div className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.035] backdrop-blur-xl">
              <PrivacyToggle
                icon={
                  <Sparkles
                    size={20}
                    strokeWidth={1.8}
                  />
                }
                title="Rekomendasi belajar"
                description={
                  settings.personalization
                    ? "Aktivitas belajar dapat digunakan untuk menyesuaikan rekomendasi."
                    : "Rekomendasi personalisasi dinonaktifkan."
                }
                enabled={settings.personalization}
                onChange={() => toggle("personalization")}
              />

              <Divider />

              <PrivacyToggle
                icon={
                  <Database
                    size={20}
                    strokeWidth={1.8}
                  />
                }
                title="Simpan progres belajar"
                description={
                  settings.saveProgress
                    ? "Progres belajar boleh disimpan di perangkat."
                    : "Progres baru tidak akan disimpan secara lokal."
                }
                enabled={settings.saveProgress}
                onChange={() => toggle("saveProgress")}
              />
            </div>
          </section>

          {/* Data */}
          <section>
            <SectionTitle>
              DATA & PENYIMPANAN
            </SectionTitle>

            <div className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.035] backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="flex w-full items-center gap-4 px-4 py-4 text-left transition active:bg-white/[0.04]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-red-500/[0.08] text-red-400">
                  <Trash2
                    size={20}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium">
                    Hapus data lokal
                  </p>

                  <p className="mt-1 text-[12px] leading-5 text-white/35">
                    Hapus profil, foto, pengaturan, dan progres
                    yang tersimpan di browser.
                  </p>
                </div>

                <span className="text-[12px] text-red-400/70">
                  Hapus
                </span>
              </button>
            </div>
          </section>

          {/* Explanation */}
          <section>
            <div className="flex gap-3 rounded-[20px] border border-white/[0.05] bg-white/[0.025] p-4">
              <Info
                size={18}
                className="mt-0.5 shrink-0 text-white/25"
              />

              <div>
                <p className="text-[13px] font-medium text-white/60">
                  Tentang data lokal
                </p>

                <p className="mt-1.5 text-[12px] leading-5 text-white/30">
                  Pengaturan privasi dan beberapa data aplikasi
                  saat ini disimpan di browser perangkat ini.
                  Menghapus data lokal akan menghapus data tersebut
                  dari browser.
                </p>
              </div>
            </div>
          </section>

          <p className="pb-6 text-center text-[11px] text-white/15">
            Ruang Belajar · Privasi
          </p>
        </div>
      </div>

      {/* Delete confirmation */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-3 backdrop-blur-md sm:items-center"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="w-full max-w-md rounded-[28px] border border-white/[0.08] bg-[#151519] p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <Trash2
                size={24}
                strokeWidth={1.8}
              />
            </div>

            <h2 className="mt-5 text-center text-xl font-semibold">
              Hapus semua data lokal?
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-white/40">
              Profil, foto, pengaturan, dan progres yang
              tersimpan di browser ini akan dihapus.
              Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={deleteLocalData}
                className="w-full rounded-[18px] bg-red-500/10 py-3.5 text-sm font-medium text-red-400 transition active:bg-red-500/15"
              >
                Hapus semua data
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className="w-full rounded-[18px] bg-white/[0.07] py-3.5 text-sm font-medium text-white transition active:bg-white/[0.10]"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* -------------------------------- */
/* Components                       */
/* -------------------------------- */

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="mb-3 px-2 text-[11px] font-semibold tracking-[0.16em] text-white/30">
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div className="mx-4 border-t border-white/[0.05]" />
  );
}

function PrivacyToggle({
  icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-4">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] transition ${
          enabled
            ? "bg-violet-500/10 text-violet-400"
            : "bg-white/[0.04] text-white/30"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium text-white">
          {title}
        </p>

        <p className="mt-1 text-[12px] leading-5 text-white/35">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={title}
        onClick={onChange}
        className={`relative h-[30px] w-[50px] shrink-0 rounded-full p-[3px] transition-all ${
          enabled
            ? "bg-violet-500"
            : "bg-white/[0.12]"
        }`}
      >
        <span
          className={`block h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            enabled
              ? "translate-x-5"
              : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}