"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Info,
  LockKeyhole,
  LogOut,
  Moon,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
  Volume2,
} from "lucide-react";

type ToggleRowProps = {
  icon: ReactNode;
  title: string;
  description: string;
  value: boolean;
  onChange: () => void;
};

type ArrowRowProps = {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
};

function Divider() {
  return <div className="mx-4 border-t border-border" />;
}

function SectionTitle({ title }: { title: string }) {
  return (
    <p className="mb-3 px-2 text-[11px] font-semibold tracking-[0.16em] text-muted">
      {title}
    </p>
  );
}

function ToggleRow({
  icon,
  title,
  description,
  value,
  onChange,
}: ToggleRowProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-surface-2 active:scale-[0.995]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-border bg-surface-2 text-muted-strong">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium text-foreground">
          {title}
        </p>

        <p className="mt-1 text-[12px] leading-5 text-muted">
          {description}
        </p>
      </div>

      <div
        className={`relative h-[30px] w-[51px] shrink-0 rounded-full transition-all ${
          value
            ? "bg-accent"
            : "bg-surface-3"
        }`}
      >
        <span
          className={`absolute top-[3px] h-6 w-6 rounded-full bg-white shadow-lg transition-all ${
            value ? "left-[24px]" : "left-[3px]"
          }`}
        />
      </div>
    </button>
  );
}

function ArrowRow({
  icon,
  title,
  description,
  href,
}: ArrowRowProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-surface-2 active:scale-[0.995]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-border bg-surface-2 text-muted-strong">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium text-foreground">
          {title}
        </p>

        <p className="mt-1 text-[12px] leading-5 text-muted">
          {description}
        </p>
      </div>

      <ChevronRight
        size={18}
        className="shrink-0 text-muted"
        strokeWidth={1.8}
      />
    </Link>
  );
}

export default function ProfileSettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [reminder, setReminder] = useState(true);
  const [sound, setSound] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(
      "ruang-belajar-settings"
    );

    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      if (typeof data.notifications === "boolean") {
        setNotifications(data.notifications);
      }

      if (typeof data.reminder === "boolean") {
        setReminder(data.reminder);
      }

      if (typeof data.sound === "boolean") {
        setSound(data.sound);
      }
    } catch {
      // Ignore invalid local data
    }
  }, []);

  function saveSettings(
    nextNotifications: boolean,
    nextReminder: boolean,
    nextSound: boolean
  ) {
    localStorage.setItem(
      "ruang-belajar-settings",
      JSON.stringify({
        notifications: nextNotifications,
        reminder: nextReminder,
        sound: nextSound,
      })
    );

    window.dispatchEvent(
      new CustomEvent("ruang-belajar-settings-changed", {
        detail: {
          notifications: nextNotifications,
          reminder: nextReminder,
          sound: nextSound,
        },
      })
    );
  }

  function toggleNotifications() {
    const value = !notifications;

    setNotifications(value);
    saveSettings(value, reminder, sound);
  }

  function toggleReminder() {
    const value = !reminder;

    setReminder(value);
    saveSettings(notifications, value, sound);
  }

  function toggleSound() {
    const value = !sound;

    setSound(value);
    saveSettings(notifications, reminder, value);
  }

  function deleteLocalData() {
    localStorage.removeItem("ruang-belajar-profile");
    localStorage.removeItem("ruang-belajar-profile-images");
    localStorage.removeItem("ruang-belajar-settings");

    window.location.href = "/onboarding";
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-600/[0.08] blur-[100px]" />

        <div className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-blue-500/[0.06] blur-[110px]" />

        <div className="absolute bottom-[-180px] left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto min-h-screen w-full max-w-2xl px-4 pb-12 sm:px-6">
        {/* HEADER */}
        <header className="sticky top-0 z-40 -mx-4 flex h-[72px] items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-2xl sm:-mx-6 sm:px-6">
          <Link
            href="/profile"
            className="flex items-center gap-1 text-muted-strong transition hover:text-foreground active:scale-95"
          >
            <ChevronLeft
              size={22}
              strokeWidth={1.8}
            />

            <span className="text-[15px]">
              Profil
            </span>
          </Link>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold">
            Pengaturan
          </h1>

          <div className="w-[55px]" />
        </header>

        <div className="space-y-8 pt-7">
          {/* AKUN */}
          <section>
            <SectionTitle title="AKUN" />

            <div className="overflow-hidden rounded-[24px] border border-border bg-surface/90 backdrop-blur-xl">
              <ArrowRow
                href="/profile/edit"
                icon={
                  <UserRound
                    size={20}
                    strokeWidth={1.8}
                  />
                }
                title="Data profil"
                description="Nama, bio, foto profil dan piagam"
              />

              <Divider />

              <ArrowRow
                href="/profile/settings/security"
                icon={
                  <LockKeyhole
                    size={20}
                    strokeWidth={1.8}
                  />
                }
                title="Keamanan & akun"
                description="Kelola keamanan akun dan sesi login"
              />

              <Divider />

              <ArrowRow
                href="/profile/settings/privacy"
                icon={
                  <ShieldCheck
                    size={20}
                    strokeWidth={1.8}
                  />
                }
                title="Privasi"
                description="Kelola data dan privasi akun"
              />
            </div>
          </section>

          {/* BELAJAR */}
          <section>
            <SectionTitle title="BELAJAR" />

            <div className="overflow-hidden rounded-[24px] border border-border bg-surface/90 backdrop-blur-xl">
              <ToggleRow
                icon={
                  <Bell
                    size={20}
                    strokeWidth={1.8}
                  />
                }
                title="Notifikasi"
                description="Terima pemberitahuan dari Ruang Belajar"
                value={notifications}
                onChange={toggleNotifications}
              />

              <Divider />

              <ToggleRow
                icon={
                  <Sparkles
                    size={20}
                    strokeWidth={1.8}
                  />
                }
                title="Pengingat belajar"
                description="Ingatkan aku untuk belajar setiap hari"
                value={reminder}
                onChange={toggleReminder}
              />

              <Divider />

              <ToggleRow
                icon={
                  <Volume2
                    size={20}
                    strokeWidth={1.8}
                  />
                }
                title="Suara"
                description="Gunakan suara saat belajar dan latihan"
                value={sound}
                onChange={toggleSound}
              />
            </div>
          </section>

          {/* TAMPILAN */}
          <section>
            <SectionTitle title="TAMPILAN" />

            <div className="overflow-hidden rounded-[24px] border border-border bg-surface/90 backdrop-blur-xl">
              <ArrowRow
                href="/profile/settings/appearance"
                icon={
                  <Moon
                    size={20}
                    strokeWidth={1.8}
                  />
                }
                title="Tampilan"
                description="Atur mode terang, gelap, atau sistem"
              />

              <Divider />

              <ArrowRow
                href="/profile/settings/language"
                icon={
                  <Globe2
                    size={20}
                    strokeWidth={1.8}
                  />
                }
                title="Bahasa"
                description="Bahasa Indonesia"
              />
            </div>
          </section>

          {/* LAINNYA */}
          <section>
            <SectionTitle title="LAINNYA" />

            <div className="overflow-hidden rounded-[24px] border border-border bg-surface/90 backdrop-blur-xl">
              <ArrowRow
                href="/profile/settings/about"
                icon={
                  <Info
                    size={20}
                    strokeWidth={1.8}
                  />
                }
                title="Tentang Ruang Belajar"
                description="Versi aplikasi dan informasi"
              />
            </div>
          </section>

          {/* LOGOUT */}
          <section>
            <button
              type="button"
              onClick={() => {
                const confirmLogout = window.confirm(
                  "Yakin ingin keluar dari akun?"
                );

                if (!confirmLogout) return;

                localStorage.removeItem(
                  "ruang-belajar-profile"
                );

                localStorage.removeItem(
                  "ruang-belajar-profile-images"
                );

                window.location.href =
                  "/auth/sign-in";
              }}
              className="flex w-full items-center justify-center gap-2 rounded-[20px] border border-red-500/15 bg-red-500/[0.06] py-4 text-[15px] font-medium text-red-500 transition-all hover:bg-red-500/[0.10] active:scale-[0.98]"
            >
              <LogOut
                size={18}
                strokeWidth={1.8}
              />

              Keluar dari akun
            </button>
          </section>

          {/* DELETE */}
          <section className="text-center">
            <button
              type="button"
              onClick={() => {
                const confirmDelete =
                  window.confirm(
                    "Hapus semua data lokal Ruang Belajar dari perangkat ini?"
                  );

                if (confirmDelete) {
                  deleteLocalData();
                }
              }}
              className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-red-500"
            >
              <Trash2
                size={14}
                strokeWidth={1.8}
              />

              Hapus data lokal
            </button>
          </section>

          <p className="pb-5 text-center text-[11px] text-muted">
            Ruang Belajar · Versi 1.0.0
          </p>
        </div>
      </div>
    </main>
  );
}