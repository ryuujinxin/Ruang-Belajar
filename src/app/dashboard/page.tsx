import { auth } from "../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Flame,
  Home,
  Play,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const firstName =
    session.user.name?.split(" ")[0] || "Pelajar";

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-[130px]" />

        <div className="absolute right-[-160px] top-[35%] h-[360px] w-[360px] rounded-full bg-blue-500/[0.045] blur-[120px]" />

        <div className="absolute bottom-[-180px] left-[-120px] h-[380px] w-[380px] rounded-full bg-pink-500/[0.035] blur-[130px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-32 pt-7 sm:px-8 sm:pt-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium text-muted">
              Selamat belajar
            </p>

            <h1 className="mt-1 text-[27px] font-semibold tracking-[-0.04em]">
              Hai, {firstName}
            </h1>
          </div>

          <Link
            href="/profile"
            className="group flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-2 text-sm font-semibold shadow-lg backdrop-blur-xl transition hover:bg-surface-3"
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={firstName}
                className="h-full w-full object-cover"
              />
            ) : (
              firstName.charAt(0).toUpperCase()
            )}
          </Link>
        </header>

        {/* Continue learning */}
        <section className="relative mt-8 overflow-hidden rounded-[32px] border border-border bg-surface p-6 shadow-2xl sm:p-8">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-violet-500/[0.13] blur-[90px]" />

          <div className="pointer-events-none absolute bottom-[-120px] left-[35%] h-56 w-56 rounded-full bg-blue-500/[0.06] blur-[90px]" />

          <div className="relative">
            <div className="flex items-start justify-between gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[17px] bg-foreground text-background shadow-xl">
                <Play
                  size={18}
                  fill="currentColor"
                />
              </div>

              <span className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-[10px] font-medium text-muted backdrop-blur-xl">
                Sedang berjalan
              </span>
            </div>

            <div className="mt-7">
              <p className="text-[12px] font-medium text-muted">
                Lanjutkan belajar
              </p>

              <h2 className="mt-1 text-[26px] font-semibold tracking-[-0.035em]">
                Persamaan Kuadrat
              </h2>

              <p className="mt-1 text-sm text-muted">
                Matematika · Bab 3
              </p>
            </div>

            {/* Progress */}
            <div className="mt-7 max-w-lg">
              <div className="mb-2.5 flex items-center justify-between text-[11px]">
                <span className="text-muted">
                  6 dari 8 materi selesai
                </span>

                <span className="font-medium text-muted-strong">
                  72%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
                <div className="h-full w-[72%] rounded-full bg-foreground" />
              </div>
            </div>

            <Link
              href="/learn"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[13px] font-semibold text-background transition hover:opacity-90"
            >
              Lanjutkan

              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-5 grid grid-cols-3 divide-x divide-border overflow-hidden rounded-[26px] border border-border bg-surface">
          <Stat
            icon={<Flame size={17} />}
            value="4"
            label="Hari streak"
          />

          <Stat
            icon={<Trophy size={17} />}
            value="72%"
            label="Progress"
          />

          <Stat
            icon={<BookOpen size={17} />}
            value="8"
            label="Materi"
          />
        </section>

        {/* Daily goal */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-muted">
                HARI INI
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em]">
                Target belajar
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
              <Sparkles
                size={16}
                className="text-muted-strong"
              />
            </div>
          </div>

          <div className="mt-4 rounded-[27px] border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  25 menit belajar
                </p>

                <p className="mt-1 text-xs text-muted">
                  Tinggal 10 menit lagi untuk mencapai target
                </p>
              </div>

              <span className="text-sm font-semibold">
                60%
              </span>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-surface-3">
              <div className="h-full w-[60%] rounded-full bg-foreground" />
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="mt-11">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-medium text-muted">
                UNTUK KAMU
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em]">
                Rekomendasi belajar
              </h2>
            </div>

            <Link
              href="/learn"
              className="flex items-center gap-1 text-xs text-muted transition hover:text-foreground"
            >
              Lihat semua

              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Course
              href="/learn"
              subject="Matematika"
              title="Persamaan Linear"
              duration="15 menit"
              questions="8 soal"
              index="01"
            />

            <Course
              href="/learn"
              subject="Fisika"
              title="Gerak Lurus"
              duration="20 menit"
              questions="12 soal"
              index="02"
            />

            <Course
              href="/learn"
              subject="Bahasa Inggris"
              title="Daily Conversation"
              duration="18 menit"
              questions="10 soal"
              index="03"
            />

            <Course
              href="/learn"
              subject="Kimia"
              title="Struktur Atom"
              duration="25 menit"
              questions="15 soal"
              index="04"
            />
          </div>
        </section>
      </div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center justify-around rounded-[27px] border border-border bg-surface/90 px-2 py-2 shadow-2xl backdrop-blur-2xl">
        <NavItem
          href="/dashboard"
          icon={<Home size={19} />}
          label="Beranda"
          active
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
        />
      </nav>
    </main>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="px-3 py-4 text-center sm:px-5">
      <div className="flex justify-center text-muted-strong">
        {icon}
      </div>

      <p className="mt-2 text-lg font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] text-muted sm:text-[11px]">
        {label}
      </p>
    </div>
  );
}

function Course({
  href,
  subject,
  title,
  duration,
  questions,
  index,
}: {
  href: string;
  subject: string;
  title: string;
  duration: string;
  questions: string;
  index: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[27px] border border-border bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2"
    >
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-medium text-muted">
          {subject}
        </p>

        <span className="text-[10px] font-medium text-muted">
          {index}
        </span>
      </div>

      <h3 className="mt-2.5 text-[16px] font-medium tracking-[-0.015em]">
        {title}
      </h3>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[11px] text-muted">
          {duration} · {questions}
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-2 transition group-hover:bg-foreground group-hover:text-background">
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
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
      className={`flex min-w-[68px] flex-col items-center gap-1 rounded-[18px] px-3 py-2.5 text-[10px] transition ${
        active
          ? "bg-foreground text-background shadow-lg"
          : "text-muted hover:bg-surface-2 hover:text-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}