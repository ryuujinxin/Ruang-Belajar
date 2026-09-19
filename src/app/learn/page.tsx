"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock3,
  Home,
  Search,
  Trophy,
  UserRound,
  X,
} from "lucide-react";

const subjects = [
  "Semua",
  "Matematika",
  "Fisika",
  "Kimia",
  "Biologi",
  "Bahasa Inggris",
];

const courses = [
  {
    subject: "Matematika",
    title: "Persamaan Linear",
    description:
      "Pelajari konsep dasar persamaan linear satu variabel.",
    duration: "15 menit",
    lessons: "8 materi",
    progress: 72,
  },
  {
    subject: "Matematika",
    title: "Persamaan Kuadrat",
    description:
      "Memahami bentuk, akar, dan penyelesaian persamaan kuadrat.",
    duration: "25 menit",
    lessons: "12 materi",
    progress: 35,
  },
  {
    subject: "Fisika",
    title: "Gerak Lurus",
    description:
      "Kenali konsep jarak, perpindahan, kecepatan, dan percepatan.",
    duration: "20 menit",
    lessons: "10 materi",
    progress: 0,
  },
  {
    subject: "Kimia",
    title: "Struktur Atom",
    description:
      "Pelajari perkembangan teori atom dan struktur penyusunnya.",
    duration: "25 menit",
    lessons: "15 materi",
    progress: 0,
  },
  {
    subject: "Biologi",
    title: "Sistem Sel",
    description:
      "Mengenal struktur dan fungsi bagian-bagian sel.",
    duration: "18 menit",
    lessons: "9 materi",
    progress: 0,
  },
  {
    subject: "Bahasa Inggris",
    title: "Daily Conversation",
    description:
      "Latihan percakapan Bahasa Inggris dalam kehidupan sehari-hari.",
    duration: "18 menit",
    lessons: "10 materi",
    progress: 0,
  },
];

export default function LearnPage() {
  const [activeSubject, setActiveSubject] = useState("Semua");
  const [query, setQuery] = useState("");

  const filteredCourses = useMemo(() => {
    const search = query.toLowerCase().trim();

    return courses.filter((course) => {
      const subjectMatch =
        activeSubject === "Semua" ||
        course.subject === activeSubject;

      const searchMatch =
        !search ||
        course.title.toLowerCase().includes(search) ||
        course.subject.toLowerCase().includes(search) ||
        course.description.toLowerCase().includes(search);

      return subjectMatch && searchMatch;
    });
  }, [activeSubject, query]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[430px] w-[430px] -translate-x-1/2 rounded-full bg-violet-500/[0.075] blur-[130px]" />

        <div className="absolute right-[-180px] top-[35%] h-[380px] w-[380px] rounded-full bg-blue-500/[0.04] blur-[130px]" />

        <div className="absolute bottom-[-180px] left-[-150px] h-[380px] w-[380px] rounded-full bg-pink-500/[0.035] blur-[130px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-32 pt-8 sm:px-8 sm:pt-10">
        {/* Header */}
        <header>
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-[11px] font-medium tracking-wide text-muted">
                RUANG BELAJAR
              </p>

              <h1 className="mt-2 text-[30px] font-semibold tracking-[-0.045em] sm:text-4xl">
                Mau belajar apa?
              </h1>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                Pilih materi yang ingin kamu pelajari dan lanjutkan
                progresmu.
              </p>
            </div>

            <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-2 sm:flex">
              <BookOpen
                size={18}
                className="text-muted-strong"
              />
            </div>
          </div>
        </header>

        {/* Search */}
        <div className="relative mt-8">
          <Search
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari materi, pelajaran..."
            className="h-[52px] w-full rounded-[20px] border border-border bg-surface pl-11 pr-11 text-sm text-foreground outline-none backdrop-blur-xl transition placeholder:text-muted focus:border-border-strong focus:bg-surface-2"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-surface-2 hover:text-foreground"
              aria-label="Hapus pencarian"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Subject filter */}
        <div className="mt-5 -mx-5 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8">
          <div className="flex w-max gap-2">
            {subjects.map((subject) => {
              const active = activeSubject === subject;

              return (
                <button
                  key={subject}
                  onClick={() => setActiveSubject(subject)}
                  className={`rounded-full px-4 py-2.5 text-[11px] font-medium transition ${
                    active
                      ? "bg-foreground text-background shadow-lg"
                      : "border border-border bg-surface text-muted hover:bg-surface-2 hover:text-foreground"
                  }`}
                >
                  {subject}
                </button>
              );
            })}
          </div>
        </div>

        {/* Continue learning */}
        <section className="mt-9">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-wide text-muted">
                LANJUTKAN
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em]">
                Belajar terakhir
              </h2>
            </div>

            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-xs text-muted transition hover:text-foreground"
            >
              Dashboard
              <ChevronRight size={14} />
            </Link>
          </div>

          <Link
            href="/learn"
            className="group relative block overflow-hidden rounded-[28px] border border-border bg-surface p-5 transition hover:border-border-strong hover:bg-surface-2 sm:p-6"
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-60 w-60 rounded-full bg-violet-500/[0.09] blur-[80px]" />

            <div className="relative flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[17px] bg-foreground text-background">
                <BookOpen size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-muted">
                  Matematika
                </p>

                <h3 className="mt-1 truncate text-base font-medium">
                  Persamaan Kuadrat
                </h3>

                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 max-w-[180px] flex-1 overflow-hidden rounded-full bg-surface-3">
                    <div className="h-full w-[35%] rounded-full bg-foreground" />
                  </div>

                  <span className="text-[10px] text-muted">
                    35%
                  </span>
                </div>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 transition group-hover:bg-foreground group-hover:text-background">
                <ArrowRight size={15} />
              </div>
            </div>
          </Link>
        </section>

        {/* All courses */}
        <section className="mt-11">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-wide text-muted">
                MATERI TERSEDIA
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em]">
                Semua materi
              </h2>
            </div>

            <span className="rounded-full bg-surface-2 px-3 py-1.5 text-[10px] text-muted">
              {filteredCourses.length} materi
            </span>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.title}
                  course={course}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-border bg-surface px-6 py-20 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface-2">
                <Search
                  size={19}
                  className="text-muted"
                />
              </div>

              <p className="mt-4 text-sm font-medium text-muted-strong">
                Materi tidak ditemukan
              </p>

              <p className="mt-1 text-xs text-muted">
                Coba gunakan kata kunci atau kategori lain.
              </p>

              <button
                onClick={() => {
                  setQuery("");
                  setActiveSubject("Semua");
                }}
                className="mt-5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:opacity-90"
              >
                Reset pencarian
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center justify-around rounded-[27px] border border-border bg-surface/90 px-2 py-2 shadow-2xl backdrop-blur-2xl">
        <NavItem
          href="/dashboard"
          icon={<Home size={19} />}
          label="Beranda"
        />

        <NavItem
          href="/learn"
          icon={<BookOpen size={19} />}
          label="Belajar"
          active
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

function CourseCard({
  course,
  index,
}: {
  course: (typeof courses)[number];
  index: number;
}) {
  const hasProgress = course.progress > 0;

  return (
    <Link
      href="/learn"
      className="group relative overflow-hidden rounded-[27px] border border-border bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2"
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-foreground/[0.025] blur-3xl transition group-hover:bg-violet-500/[0.06]" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-border bg-surface-2">
            <BookOpen
              size={17}
              className="text-muted-strong"
            />
          </div>

          <span className="text-[10px] font-medium text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-5">
          <p className="text-[10px] font-medium text-muted">
            {course.subject}
          </p>

          <h3 className="mt-1.5 text-[17px] font-medium tracking-[-0.02em]">
            {course.title}
          </h3>

          <p className="mt-2 min-h-[40px] text-[12px] leading-5 text-muted">
            {course.description}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-4 text-[10px] text-muted">
          <span className="flex items-center gap-1.5">
            <Clock3 size={13} />
            {course.duration}
          </span>

          <span>{course.lessons}</span>
        </div>

        {hasProgress && (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-[10px] text-muted">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>

            <div className="h-1 overflow-hidden rounded-full bg-surface-3">
              <div
                className="h-full rounded-full bg-foreground transition-all"
                style={{
                  width: `${course.progress}%`,
                }}
              />
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-[11px] font-medium text-muted-strong transition group-hover:text-foreground">
            {hasProgress
              ? "Lanjutkan"
              : "Mulai belajar"}
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-2 text-muted-strong transition group-hover:bg-foreground group-hover:text-background">
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </div>
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