"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <div className="relative min-h-screen overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-8 sm:px-8">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
            {/* Left */}
            <section className="hidden lg:block">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-black">
                  <BookOpen size={17} strokeWidth={2.5} />
                </div>

                <span className="text-sm font-medium text-white/80">
                  Ruang Belajar
                </span>
              </div>

              <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-[-0.04em]">
                Mulai perjalanan
                <span className="block text-white/45">
                  belajarmu sekarang.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
                Buat akun gratis dan dapatkan ruang belajar pribadi untuk
                mengatur materi, progres, dan targetmu.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Akses materi pembelajaran",
                  "Simpan progres secara otomatis",
                  "Bangun kebiasaan belajar",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                      <Check size={14} />
                    </div>
                    <span className="text-sm text-white/55">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Form */}
            <section className="mx-auto w-full max-w-[440px] lg:ml-auto">
              <div className="mb-8 lg:hidden">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                  <BookOpen size={20} />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight">
                  Buat akun
                </h1>

                <p className="mt-2 text-sm text-white/40">
                  Mulai perjalanan belajarmu.
                </p>
              </div>

              <div className="rounded-[30px] border border-white/[0.08] bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
                <div className="mb-8 hidden lg:block">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Buat akun baru
                  </h2>
                  <p className="mt-2 text-sm text-white/40">
                    Daftar dan mulai belajar lebih teratur.
                  </p>
                </div>

                {/* Social */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] text-sm font-medium text-white/80 transition hover:bg-white/[0.08] active:scale-[0.98]"
                  >
                    <Globe2 size={17} />
                    Google
                  </button>

                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] text-sm font-medium text-white/80 transition hover:bg-white/[0.08] active:scale-[0.98]"
                  >
                    <span className="text-base font-semibold">●</span>
                    Apple
                  </button>
                </div>

                {/* Divider */}
                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/[0.08]" />
                  <span className="text-xs text-white/25">atau</span>
                  <div className="h-px flex-1 bg-white/[0.08]" />
                </div>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-white/70"
                    >
                      Nama
                    </label>

                    <div className="group relative">
                      <UserRound
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 transition group-focus-within:text-white/60"
                      />

                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Nama lengkap"
                        className="h-13 w-full rounded-2xl border border-white/[0.09] bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.045]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-white/70"
                    >
                      Email
                    </label>

                    <div className="group relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 transition group-focus-within:text-white/60"
                      />

                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="nama@email.com"
                        className="h-13 w-full rounded-2xl border border-white/[0.09] bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.045]"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-white/70"
                    >
                      Password
                    </label>

                    <div className="group relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 transition group-focus-within:text-white/60"
                      />

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Minimal 8 karakter"
                        className="h-13 w-full rounded-2xl border border-white/[0.09] bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.045]"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-white/25 transition hover:bg-white/[0.06] hover:text-white/60"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-medium text-white/70"
                    >
                      Konfirmasi password
                    </label>

                    <div className="group relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 transition group-focus-within:text-white/60"
                      />

                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Ulangi password"
                        className="h-13 w-full rounded-2xl border border-white/[0.09] bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.045]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-white/25 transition hover:bg-white/[0.06] hover:text-white/60"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <label className="flex cursor-pointer items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-white"
                    />

                    <span className="text-xs leading-5 text-white/35">
                      Saya menyetujui ketentuan penggunaan dan kebijakan
                      privasi.
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-white font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]"
                  >
                    Buat akun
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </form>

                <p className="mt-7 text-center text-sm text-white/35">
                  Sudah punya akun?{" "}
                  <Link
                    href="/auth/sign-in"
                    className="font-medium text-white/75 transition hover:text-white"
                  >
                    Masuk
                  </Link>
                </p>
              </div>

              <p className="mt-6 text-center text-xs text-white/20">
                Gratis untuk memulai perjalanan belajarmu.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}