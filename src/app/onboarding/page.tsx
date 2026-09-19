"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Check,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const levels = ["SD", "SMP", "SMA", "SMK", "Kuliah"];

const subjects = [
  "Matematika",
  "Fisika",
  "Kimia",
  "Biologi",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "Sejarah",
];

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [level, setLevel] = useState("");
  const [grade, setGrade] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const grades =
    level === "SD"
      ? ["1", "2", "3", "4", "5", "6"]
      : level === "SMP"
        ? ["7", "8", "9"]
        : level === "SMA" || level === "SMK"
          ? ["10", "11", "12"]
          : ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];

  function toggleSubject(subject: string) {
    setSelectedSubjects((current) =>
      current.includes(subject)
        ? current.filter((item) => item !== subject)
        : [...current, subject],
    );
  }

  function next() {
    if (step < 3) {
      setStep((current) => current + 1);
    } else {
      localStorage.setItem(
        "ruang-belajar-profile",
        JSON.stringify({
          level,
          grade,
          subjects: selectedSubjects,
        }),
      );

      router.push("/dashboard");
    }
  }

  const canContinue =
    step === 0
      ? Boolean(level)
      : step === 1
        ? Boolean(grade)
        : step === 2
          ? selectedSubjects.length > 0
          : true;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07080a] px-5 py-8 text-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative w-full max-w-xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
              <BookOpen size={18} />
            </div>

            <span className="font-semibold tracking-tight">
              Ruang Belajar
            </span>
          </div>

          <span className="text-sm text-white/35">
            {step + 1} / 4
          </span>
        </div>

        <div className="mb-8 h-1 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>

        <section className="rounded-[32px] border border-white/[0.08] bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
          {step === 0 && (
            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <GraduationCap size={26} />
              </div>

              <p className="mb-2 text-sm text-white/40">
                Tentang kamu
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Kamu sekarang belajar
                <br />
                di jenjang apa?
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Pilih jenjangmu supaya kami bisa menyesuaikan
                pengalaman belajar.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {levels.map((item) => {
                  const active = level === item;

                  return (
                    <button
                      key={item}
                      onClick={() => {
                        setLevel(item);
                        setGrade("");
                      }}
                      className={`relative h-16 rounded-2xl border text-sm font-medium transition ${
                        active
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.07]"
                      }`}
                    >
                      {item}

                      {active && (
                        <span className="absolute right-2 top-2">
                          <Check size={14} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <p className="mb-2 text-sm text-white/40">
                Tingkat pendidikan
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Kamu kelas berapa?
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Kami akan menyesuaikan materi dengan tingkat belajarmu.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {grades.map((item) => {
                  const active = grade === item;

                  return (
                    <button
                      key={item}
                      onClick={() => setGrade(item)}
                      className={`h-16 rounded-2xl border text-sm font-medium transition ${
                        active
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.07]"
                      }`}
                    >
                      {level === "Kuliah" ? item : `Kelas ${item}`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Sparkles size={25} />
              </div>

              <p className="mb-2 text-sm text-white/40">
                Personalisasi
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Apa yang ingin
                <br />
                kamu pelajari?
              </h1>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Kamu bisa memilih lebih dari satu.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {subjects.map((subject) => {
                  const active = selectedSubjects.includes(subject);

                  return (
                    <button
                      key={subject}
                      onClick={() => toggleSubject(subject)}
                      className={`rounded-2xl border px-4 py-3 text-sm transition ${
                        active
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/65 hover:bg-white/[0.07]"
                      }`}
                    >
                      {active && (
                        <Check
                          size={14}
                          className="mr-1.5 inline-block"
                        />
                      )}
                      {subject}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[28px] bg-white text-black shadow-xl">
                <Sparkles size={32} />
              </div>

              <p className="text-sm text-white/40">
                Semuanya siap
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Mari mulai belajar.
              </h1>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-white/40">
                Kami sudah menyiapkan pengalaman belajar berdasarkan
                pilihanmu.
              </p>

              <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left">
                <div className="flex justify-between border-b border-white/[0.06] pb-3">
                  <span className="text-white/40">Jenjang</span>
                  <span>{level}</span>
                </div>

                <div className="flex justify-between border-b border-white/[0.06] py-3">
                  <span className="text-white/40">Kelas</span>
                  <span>
                    {level === "Kuliah" ? grade : `Kelas ${grade}`}
                  </span>
                </div>

                <div className="flex justify-between pt-3">
                  <span className="text-white/40">Pelajaran</span>
                  <span>{selectedSubjects.length} dipilih</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep((current) => current - 1)}
                className="h-12 rounded-2xl border border-white/10 px-5 text-sm text-white/60 transition hover:bg-white/[0.05]"
              >
                Kembali
              </button>
            )}

            <button
              disabled={!canContinue}
              onClick={next}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-white text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {step === 3 ? "Masuk ke Ruang Belajar" : "Lanjut"}
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-white/20">
          Kamu bisa mengubah preferensi ini kapan saja.
        </p>
      </div>
    </main>
  );
}