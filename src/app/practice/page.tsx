"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  Home,
  Trophy,
  UserRound,
} from "lucide-react";

type Exercise = {
  id: string;
  title: string;
  subject: string;
  questions: number;
  difficulty: string;
  progress: number;
};

const exercises: Exercise[] = [
  {
    id: "persamaan-kuadrat",
    title: "Persamaan Kuadrat",
    subject: "Matematika",
    questions: 10,
    difficulty: "Sedang",
    progress: 60,
  },
  {
    id: "gerak-lurus",
    title: "Gerak Lurus",
    subject: "Fisika",
    questions: 15,
    difficulty: "Mudah",
    progress: 0,
  },
  {
    id: "struktur-atom",
    title: "Struktur Atom",
    subject: "Kimia",
    questions: 12,
    difficulty: "Sedang",
    progress: 0,
  },
  {
    id: "daily-conversation",
    title: "Daily Conversation",
    subject: "Bahasa Inggris",
    questions: 10,
    difficulty: "Mudah",
    progress: 0,
  },
];

export default function PracticePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/[0.07] blur-[130px]" />
        <div className="absolute right-[-180px] top-40 h-[420px] w-[420px] rounded-full bg-blue-500/[0.06] blur-[140px]" />
        <div className="absolute bottom-[-180px] left-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-500/[0.05] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 pb-32 pt-7 sm:px-8">
        <header>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Belajar
          </p>

          <div className="mt-1 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Latihan
              </h1>

              <p className="mt-2 text-sm leading-6 text-muted">
                Uji pemahamanmu dan tingkatkan kemampuanmu.
              </p>
            </div>

            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 sm:flex">
              <Flame size={15} className="text-orange-400" />

              <span className="text-xs font-medium text-muted-strong">
                4 hari streak
              </span>
            </div>
          </div>
        </header>

        <section className="mt-7">
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-violet-500/[0.10] blur-[70px]" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-2">
                  <Trophy size={20} className="text-accent" />
                </div>

                <span className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-strong">
                  Tantangan Hari Ini
                </span>
              </div>

              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                5 Menit Matematika
              </h2>

              <p className="mt-1.5 max-w-lg text-sm leading-6 text-muted">
                Selesaikan beberapa soal singkat untuk menjaga
                konsistensi belajarmu hari ini.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <InfoPill
                  icon={<Clock3 size={13} />}
                  label="5 menit"
                />

                <InfoPill
                  icon={<BookOpen size={13} />}
                  label="5 soal"
                />

                <InfoPill
                  icon={<Trophy size={13} />}
                  label="+20 XP"
                />
              </div>

              <Link
                href="/practice/persamaan-kuadrat?challenge=1"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-85 active:scale-[0.98]"
              >
                Mulai Tantangan
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-7 grid grid-cols-3 divide-x divide-border overflow-hidden rounded-[27px] border border-border bg-surface">
          <PracticeStat value="37" label="Selesai" />
          <PracticeStat value="72%" label="Akurasi" />
          <PracticeStat value="4" label="Streak" />
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                Koleksi
              </p>

              <h2 className="mt-1.5 text-xl font-semibold">
                Latihan soal
              </h2>
            </div>

            <span className="text-xs text-muted">
              {exercises.length} latihan
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
              />
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}

function InfoPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-muted">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function PracticeStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-3 py-5">
      <p className="text-xl font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}

function ExerciseCard({
  exercise,
}: {
  exercise: Exercise;
}) {
  const completed = exercise.progress >= 100;
  const started = exercise.progress > 0;

  return (
    <Link
      href={`/practice/${exercise.id}`}
      className="group block rounded-[26px] border border-border bg-surface p-4 transition duration-200 hover:border-border-strong hover:bg-surface-2 active:scale-[0.99] sm:p-5"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface-2 text-muted-strong transition group-hover:bg-surface-3 group-hover:text-foreground">
          {completed ? (
            <CheckCircle2 size={19} />
          ) : (
            <BookOpen size={19} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
                {exercise.subject}
              </p>

              <h3 className="mt-1 truncate text-[15px] font-semibold text-foreground">
                {exercise.title}
              </h3>
            </div>

            <ArrowRight
              size={17}
              className="mt-1 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-foreground"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] font-medium text-muted-strong">
              {exercise.questions} soal
            </span>

            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] font-medium text-muted-strong">
              {exercise.difficulty}
            </span>

            {started && (
              <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] font-medium text-muted-strong">
                {exercise.progress}% selesai
              </span>
            )}
          </div>

          <div className="mt-4">
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{
                  width: `${exercise.progress}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

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
        active
      />

      <NavItem
        href="/profile"
        icon={<UserRound size={19} />}
        label="Profil"
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