"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Trophy,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getPracticeSet,
  type PracticeQuestion,
  type PracticeSet,
} from "@/data/practice";

type Answers = Record<string, number>;

type SavedSession = {
  answers: Answers;
  currentIndex: number;
  started: boolean;
  remainingTime: number;
};

const SESSION_PREFIX = "ruang-belajar-practice-session-";

function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

function getSessionKey(id: string): string {
  return `${SESSION_PREFIX}${id}`;
}

export default function PracticeDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "";

  const practice = useMemo<PracticeSet | undefined>(() => {
    if (!id) {
      return undefined;
    }

    return getPracticeSet(id);
  }, [id]);

  const questions = practice?.questions ?? [];

  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(
    practice?.duration ? practice.duration * 60 : 0,
  );
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  const [result, setResult] = useState<{
    score: number;
    correct: number;
    wrong: number;
    unanswered: number;
  } | null>(null);

  const currentQuestion: PracticeQuestion | undefined =
    questions[currentIndex];

  const answeredCount = Object.keys(answers).length;

  const progress =
    questions.length > 0
      ? Math.round(((currentIndex + 1) / questions.length) * 100)
      : 0;

  const calculateResult = useCallback(() => {
    if (!practice) {
      return {
        score: 0,
        correct: 0,
        wrong: 0,
        unanswered: questions.length,
      };
    }

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach((question) => {
      const selectedAnswer = answers[question.id];

      if (selectedAnswer === undefined) {
        unanswered += 1;
        return;
      }

      if (selectedAnswer === question.answer) {
        correct += 1;
      } else {
        wrong += 1;
      }
    });

    const score =
      questions.length > 0
        ? Math.round((correct / questions.length) * 100)
        : 0;

    return {
      score,
      correct,
      wrong,
      unanswered,
    };
  }, [answers, practice, questions]);

  const submitPractice = useCallback(() => {
    if (!practice || questions.length === 0) {
      return;
    }

    const finalResult = calculateResult();

    setResult(finalResult);
    setFinished(true);
    setShowSubmit(false);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(getSessionKey(practice.id));
    }
  }, [calculateResult, practice, questions.length]);

  useEffect(() => {
    if (!practice) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const saved = window.localStorage.getItem(getSessionKey(practice.id));

    if (!saved) {
      return;
    }

    try {
      const session = JSON.parse(saved) as SavedSession;

      setAnswers(session.answers ?? {});
      setCurrentIndex(
        Math.min(
          Math.max(session.currentIndex ?? 0, 0),
          Math.max(questions.length - 1, 0),
        ),
      );
      setStarted(Boolean(session.started));

      if (typeof session.remainingTime === "number") {
        setRemainingTime(
          Math.max(0, session.remainingTime),
        );
      }
    } catch {
      window.localStorage.removeItem(getSessionKey(practice.id));
    }
  }, [practice, questions.length]);

  useEffect(() => {
    if (!practice || finished || !started) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const session: SavedSession = {
      answers,
      currentIndex,
      started,
      remainingTime,
    };

    window.localStorage.setItem(
      getSessionKey(practice.id),
      JSON.stringify(session),
    );
  }, [
    answers,
    currentIndex,
    finished,
    practice,
    remainingTime,
    started,
  ]);

  useEffect(() => {
    if (!started || finished || remainingTime <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingTime((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [finished, remainingTime, started]);

  useEffect(() => {
    if (!started || finished || remainingTime !== 0) {
      return;
    }

    submitPractice();
  }, [finished, remainingTime, started, submitPractice]);

  const selectAnswer = (answerIndex: number) => {
    if (!currentQuestion || finished) {
      return;
    }

    setStarted(true);

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: answerIndex,
    }));
  };

  const goNext = () => {
    if (currentIndex >= questions.length - 1) {
      setShowSubmit(true);
      return;
    }

    setCurrentIndex((previous) => previous + 1);
  };

  const goPrevious = () => {
    setCurrentIndex((previous) => Math.max(0, previous - 1));
  };

  const restartPractice = () => {
    if (!practice) {
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(getSessionKey(practice.id));
    }

    setAnswers({});
    setCurrentIndex(0);
    setRemainingTime(practice.duration * 60);
    setStarted(false);
    setFinished(false);
    setShowSubmit(false);
    setResult(null);
  };

  if (!practice) {
    return (
      <main className="min-h-screen bg-background px-4 py-10 text-foreground">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Latihan
          </Link>

          <div className="mt-8 rounded-[28px] border border-border bg-surface p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-2">
              <X className="h-7 w-7 text-muted" />
            </div>

            <h1 className="mt-5 text-2xl font-bold">
              Latihan tidak ditemukan
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              Latihan yang kamu buka tidak tersedia atau ID latihan tidak
              valid.
            </p>

            <Link
              href="/practice"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
            >
              Lihat Semua Latihan
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-background px-4 py-10 text-foreground">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>

          <div className="mt-8 rounded-[28px] border border-border bg-surface p-8 text-center">
            <h1 className="text-2xl font-bold">{practice.title}</h1>

            <p className="mt-2 text-sm text-muted">
              Belum ada soal untuk latihan ini.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (finished && result) {
    return (
      <ResultPage
        practice={practice}
        result={result}
        answers={answers}
        onRestart={restartPractice}
      />
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/practice"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-medium transition hover:bg-surface-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Latihan</span>
          </Link>

          <div className="min-w-0 text-center">
            <p className="truncate text-sm font-semibold">
              {practice.title}
            </p>
            <p className="text-xs text-muted">
              Soal {currentIndex + 1} dari {questions.length}
            </p>
          </div>

          <div
            className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold ${
              remainingTime <= 60 && started
                ? "border-red-500/30 bg-red-500/10 text-red-500"
                : "border-border bg-surface"
            }`}
          >
            <Clock3 className="h-4 w-4" />
            {formatTime(remainingTime)}
          </div>
        </header>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs text-muted">
            <span>{progress}%</span>
            <span>{answeredCount} dijawab</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <section className="mt-8">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-surface-2 px-3 py-1.5 text-xs font-semibold">
              {practice.subject}
            </span>

            <span className="rounded-full bg-surface-2 px-3 py-1.5 text-xs font-semibold">
              {practice.difficulty}
            </span>
          </div>

          <div className="rounded-[30px] border border-border bg-surface p-5 shadow-sm sm:p-8">
            <p className="text-sm font-medium text-muted">
              Pertanyaan {currentIndex + 1}
            </p>

            <h1 className="mt-3 text-xl font-bold leading-8 tracking-tight sm:text-2xl">
              {currentQuestion?.question}
            </h1>

            <div className="mt-8 space-y-3">
              {currentQuestion?.options.map(
                (option: string, optionIndex: number) => {
                  const selected =
                    answers[currentQuestion.id] === optionIndex;

                  return (
                    <button
                      key={`${currentQuestion.id}-${optionIndex}`}
                      type="button"
                      onClick={() => selectAnswer(optionIndex)}
                      className={`group flex w-full items-center gap-4 rounded-[20px] border p-4 text-left transition active:scale-[0.99] ${
                        selected
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background hover:border-border-strong hover:bg-surface-2"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          selected
                            ? "bg-background text-foreground"
                            : "bg-surface-2 text-muted-strong"
                        }`}
                      >
                        {String.fromCharCode(65 + optionIndex)}
                      </span>

                      <span className="flex-1 text-sm font-medium leading-6">
                        {option}
                      </span>

                      {selected && (
                        <Check className="h-5 w-5 shrink-0" />
                      )}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrevious}
              disabled={currentIndex === 0}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
            >
              {currentIndex === questions.length - 1 ? (
                <>
                  Selesai
                  <CheckCircle2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  Berikutnya
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </section>
      </div>

      {showSubmit && (
        <SubmitModal
          total={questions.length}
          answered={answeredCount}
          onCancel={() => setShowSubmit(false)}
          onSubmit={submitPractice}
        />
      )}
    </main>
  );
}

function SubmitModal({
  total,
  answered,
  onCancel,
  onSubmit,
}: {
  total: number;
  answered: number;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const unanswered = Math.max(total - answered, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[28px] border border-border bg-surface p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">
              Kumpulkan latihan?
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              Setelah dikumpulkan, jawaban akan diperiksa dan hasilnya
              langsung ditampilkan.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted transition hover:text-foreground"
            aria-label="Tutup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-surface-2 p-4">
            <p className="text-xs text-muted">Sudah dijawab</p>
            <p className="mt-1 text-2xl font-bold">{answered}</p>
          </div>

          <div className="rounded-2xl bg-surface-2 p-4">
            <p className="text-xs text-muted">Belum dijawab</p>
            <p className="mt-1 text-2xl font-bold">{unanswered}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:bg-surface-2"
          >
            Kembali
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className="flex-1 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
          >
            Kumpulkan
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultPage({
  practice,
  result,
  answers,
  onRestart,
}: {
  practice: PracticeSet;
  result: {
    score: number;
    correct: number;
    wrong: number;
    unanswered: number;
  };
  answers: Answers;
  onRestart: () => void;
}) {
  const passed = result.score >= 70;

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-surface-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Latihan
          </Link>
        </div>

        <section className="overflow-hidden rounded-[32px] border border-border bg-surface">
          <div className="flex flex-col items-center px-5 py-10 text-center sm:px-8 sm:py-14">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-2">
              <Trophy className="h-9 w-9" />
            </div>

            <p className="mt-6 text-sm font-semibold text-muted">
              {practice.title}
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Latihan selesai
            </h1>

            <div className="mt-8">
              <p className="text-6xl font-black tracking-tight">
                {result.score}
              </p>
              <p className="mt-1 text-sm text-muted">Nilai kamu</p>
            </div>

            <div className="mt-8 grid w-full max-w-lg grid-cols-3 gap-3">
              <ResultStat
                label="Benar"
                value={result.correct}
              />

              <ResultStat
                label="Salah"
                value={result.wrong}
              />

              <ResultStat
                label="Kosong"
                value={result.unanswered}
              />
            </div>

            <div className="mt-8 rounded-2xl bg-surface-2 px-5 py-4 text-sm">
              {passed
                ? "Kamu berhasil menyelesaikan latihan ini."
                : "Latihan selesai. Kamu bisa mencoba lagi untuk meningkatkan nilai."}
            </div>

            <div className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onRestart}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-semibold transition hover:bg-surface-2"
              >
                <RotateCcw className="h-4 w-4" />
                Coba Lagi
              </button>

              <Link
                href={`/practice/${practice.id}/review`}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
              >
                Lihat Pembahasan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-5 rounded-[24px] border border-border bg-surface p-5">
          <h2 className="text-base font-bold">
            Ringkasan Jawaban
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {practice.questions.map(
              (question: PracticeQuestion, index: number) => {
                const answered =
                  answers[question.id] !== undefined;

                return (
                  <div
                    key={question.id}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                      answered
                        ? "bg-foreground text-background"
                        : "bg-surface-2 text-muted"
                    }`}
                    title={`Soal ${index + 1}`}
                  >
                    {index + 1}
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ResultStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-surface-2 p-4">
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}