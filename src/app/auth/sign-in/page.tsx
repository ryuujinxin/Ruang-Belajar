"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  async function handleGoogleLogin() {
    try {
      setLoadingGoogle(true);

     await signIn("google", {
  callbackUrl: "/onboarding",
});
    } catch (error) {
      console.error("Google login error:", error);
      setLoadingGoogle(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-8 sm:px-8">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
            
            {/* LEFT */}
            <section className="hidden lg:block">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-black">
                  <BookOpen size={17} />
                </div>

                <span className="text-sm font-medium text-white/80">
                  Ruang Belajar
                </span>
              </div>

              <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-[-0.04em]">
                Belajar lebih
                <span className="block text-white/40">
                  nyaman setiap hari.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
                Masuk dan lanjutkan perjalanan belajarmu. Semua materi,
                progres, dan pencapaian ada di satu tempat.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Materi belajar yang terstruktur",
                  "Pantau progres belajarmu",
                  "Belajar kapan saja dan di mana saja",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                      <Check size={14} />
                    </div>

                    <span className="text-sm text-white/55">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex items-center gap-3 text-white/30">
                <Sparkles size={16} />
                <span className="text-xs">
                  Pengalaman belajar yang lebih sederhana.
                </span>
              </div>
            </section>

            {/* FORM */}
            <section className="mx-auto w-full max-w-[440px] lg:ml-auto">
              
              <div className="mb-8 lg:hidden">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                  <BookOpen size={20} />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight">
                  Selamat datang
                </h1>

                <p className="mt-2 text-sm text-white/40">
                  Masuk untuk melanjutkan belajar.
                </p>
              </div>

              <div className="rounded-[30px] border border-white/[0.08] bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
                
                <div className="mb-8 hidden lg:block">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Selamat datang kembali
                  </h2>

                  <p className="mt-2 text-sm text-white/40">
                    Masuk ke akunmu untuk melanjutkan.
                  </p>
                </div>

                {/* GOOGLE */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loadingGoogle}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] text-sm font-medium text-white/80 transition hover:bg-white/[0.08] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Globe2 size={17} />

                  {loadingGoogle
                    ? "Menghubungkan..."
                    : "Lanjutkan dengan Google"}
                </button>

                {/* DIVIDER */}
                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/[0.08]" />

                  <span className="text-xs text-white/25">
                    atau
                  </span>

                  <div className="h-px flex-1 bg-white/[0.08]" />
                </div>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-5"
                >
                  {/* EMAIL */}
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
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

                  {/* PASSWORD */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-white/70"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        className="text-xs text-white/40 hover:text-white"
                      >
                        Lupa password?
                      </button>
                    </div>

                    <div className="group relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                      />

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Masukkan password"
                        className="h-13 w-full rounded-2xl border border-white/[0.09] bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.045]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-white/25 hover:bg-white/[0.06] hover:text-white/60"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-white font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]"
                  >
                    Masuk

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </form>

                <p className="mt-7 text-center text-sm text-white/35">
                  Belum punya akun?{" "}
                  <Link
                    href="/auth/sign-up"
                    className="font-medium text-white/75 hover:text-white"
                  >
                    Daftar sekarang
                  </Link>
                </p>
              </div>

              <p className="mt-6 text-center text-xs text-white/20">
                Dengan melanjutkan, kamu menyetujui ketentuan penggunaan kami.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}