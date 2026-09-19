"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  Flame,
  Home,
  Pencil,
  Settings,
  Trophy,
  UserRound,
} from "lucide-react";

type ProfileImage = {
  id: string;
  image: string;
  name: string;
};

export default function ProfilePage() {
  const [name, setName] = useState("Erlangga");
  const [bio, setBio] = useState("Pelajar · Ruang Belajar");
  const [avatar, setAvatar] = useState("");
  const [images, setImages] = useState<ProfileImage[]>([]);

  useEffect(() => {
    const savedProfile = localStorage.getItem(
      "ruang-belajar-profile"
    );

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);

        if (profile.name) {
          setName(profile.name);
        }

        if (profile.bio) {
          setBio(profile.bio);
        }

        if (profile.avatar) {
          setAvatar(profile.avatar);
        }
      } catch {
        console.error("Gagal membaca profile.");
      }
    }

    const savedImages = localStorage.getItem(
      "ruang-belajar-profile-images"
    );

    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch {
        console.error("Gagal membaca foto.");
      }
    }
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/[0.08] blur-[130px]" />

        <div className="absolute right-[-180px] top-40 h-[420px] w-[420px] rounded-full bg-blue-500/[0.07] blur-[140px]" />

        <div className="absolute bottom-[-180px] left-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-500/[0.05] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 pb-32 pt-7 sm:px-8">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Akun
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Profil
            </h1>
          </div>

          <Link
            href="/profile/edit"
            className="group flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2.5 text-sm font-medium text-muted-strong backdrop-blur-xl transition hover:border-border-strong hover:bg-surface-2 hover:text-foreground"
          >
            <Pencil
              size={15}
              className="transition group-hover:rotate-[-8deg]"
            />

            Edit
          </Link>
        </header>

        {/* Main profile */}
        <section className="mt-9">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-full border border-border bg-surface-2 shadow-[0_25px_80px_rgba(0,0,0,0.18)]">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-muted-strong">
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-[4px] border-background bg-emerald-400" />
            </div>
          </div>

          {/* Name */}
          <div className="mt-5 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              {name}
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
              {bio || "Belum ada bio."}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-9 grid grid-cols-3 divide-x divide-border overflow-hidden rounded-[27px] border border-border bg-surface">
          <ProfileStat
            value="4"
            label="Streak"
            icon={<Flame size={16} />}
          />

          <ProfileStat
            value="72%"
            label="Progress"
            icon={<Trophy size={16} />}
          />

          <ProfileStat
            value="8"
            label="Materi"
            icon={<BookOpen size={16} />}
          />
        </section>

        {/* Achievements */}
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                Pencapaian
              </p>

              <h2 className="mt-1.5 text-xl font-semibold">
                Piagam & Foto
              </h2>
            </div>

            <Link
              href="/profile/edit"
              className="text-xs font-medium text-muted transition hover:text-foreground"
            >
              Kelola
            </Link>
          </div>

          {images.length === 0 ? (
            <Link
              href="/profile/edit"
              className="mt-4 flex min-h-[150px] items-center justify-center rounded-[28px] border border-dashed border-border bg-surface transition hover:border-border-strong hover:bg-surface-2"
            >
              <div className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-surface-2">
                  <Pencil
                    size={17}
                    className="text-muted"
                  />
                </div>

                <p className="mt-3 text-sm font-medium text-muted-strong">
                  Belum ada pencapaian
                </p>

                <p className="mt-1 text-xs text-muted">
                  Tambahkan piagam atau foto kamu
                </p>
              </div>
            </Link>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-[23px] border border-border bg-surface"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="px-3 py-2.5">
                    <p className="truncate text-[11px] text-muted">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Account section */}
        <section className="mt-10">
          <p className="mb-3 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            Pengaturan
          </p>

          <div className="overflow-hidden rounded-[27px] border border-border bg-surface">
            <ProfileRow
              icon={<UserRound size={18} />}
              title="Data profil"
              subtitle="Nama, bio, foto profil"
              href="/profile/edit"
            />

            <ProfileRow
              icon={<Settings size={18} />}
              title="Pengaturan"
              subtitle="Preferensi akun dan aplikasi"
              href="/profile/settings"
              last
            />
          </div>
        </section>
      </div>

      {/* Bottom navigation */}
      <BottomNav />
    </main>
  );
}

/* -------------------------------- */
/* STAT */
/* -------------------------------- */

function ProfileStat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-3 py-5">
      <div className="flex items-center gap-1.5 text-muted">
        {icon}

        <span className="text-[10px] uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xl font-semibold tracking-tight">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------- */
/* PROFILE ROW */
/* -------------------------------- */

function ProfileRow({
  icon,
  title,
  subtitle,
  href,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  last?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center px-5 py-4 transition hover:bg-surface-2 ${
        !last ? "border-b border-border" : ""
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-muted-strong">
        {icon}
      </div>

      <div className="ml-3 flex-1">
        <p className="text-sm font-medium text-foreground">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-muted">
          {subtitle}
        </p>
      </div>

      <ChevronRight
        size={17}
        className="text-muted"
      />
    </Link>
  );
}

/* -------------------------------- */
/* BOTTOM NAV */
/* -------------------------------- */

function BottomNav() {
  return (
    <nav className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center justify-around rounded-[25px] border border-border bg-surface/90 px-2 py-2 shadow-2xl backdrop-blur-2xl">
      <NavItem
        href="/dashboard"
        icon={<Home size={19} />}
        label="Beranda"
      />

      <NavItem
        href="/learn"
        icon={<BookOpen size={19} />}
        label="Belajar"
      />

      <NavItem
        href="/practice"
        icon={<Trophy size={19} />}
        label="Latihan"
      />

      <NavItem
        href="/profile"
        icon={<UserRound size={19} />}
        label="Profil"
        active
      />
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex min-w-[68px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[10px] transition ${
        active
          ? "bg-foreground text-background"
          : "text-muted hover:bg-surface-2 hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}