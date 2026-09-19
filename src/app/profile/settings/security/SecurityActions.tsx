"use client";

import { useState } from "react";
import {
  ChevronRight,
  KeyRound,
  LogOut,
  Smartphone,
} from "lucide-react";

export default function SecurityActions() {
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [showTwoFactorInfo, setShowTwoFactorInfo] = useState(false);

  return (
    <>
      {/* Login & Security */}
      <section>
        <p className="mb-3 px-2 text-[11px] font-semibold tracking-[0.16em] text-muted">
          LOGIN & KEAMANAN
        </p>

        <div className="overflow-hidden rounded-[24px] border border-border bg-surface/90 backdrop-blur-xl">
          {/* Password */}
          <button
            type="button"
            onClick={() => setShowPasswordInfo(true)}
            className="flex w-full items-center gap-4 px-4 py-4 text-left transition hover:bg-surface-2 active:scale-[0.995]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-border bg-surface-2 text-muted-strong">
              <KeyRound
                size={20}
                strokeWidth={1.8}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-medium text-foreground">
                Password
              </p>

              <p className="mt-1 text-[12px] text-muted">
                Dikelola melalui Google
              </p>
            </div>

            <ChevronRight
              size={18}
              className="text-muted"
              strokeWidth={1.8}
            />
          </button>

          <div className="mx-4 border-t border-border" />

          {/* Two Factor */}
          <button
            type="button"
            onClick={() => setShowTwoFactorInfo(true)}
            className="flex w-full items-center gap-4 px-4 py-4 text-left transition hover:bg-surface-2 active:scale-[0.995]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-border bg-surface-2 text-muted-strong">
              <Smartphone
                size={20}
                strokeWidth={1.8}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-medium text-foreground">
                Verifikasi dua langkah
              </p>

              <p className="mt-1 text-[12px] text-muted">
                Kelola keamanan akun Google
              </p>
            </div>

            <ChevronRight
              size={18}
              className="text-muted"
              strokeWidth={1.8}
            />
          </button>
        </div>
      </section>

      {/* Logout */}
      <section>
        <form
          action="/api/auth/signout"
          method="POST"
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-[20px] border border-red-500/15 bg-red-500/[0.06] py-4 text-[15px] font-medium text-red-500 transition-all hover:bg-red-500/[0.10] active:scale-[0.98]"
          >
            <LogOut
              size={18}
              strokeWidth={1.8}
            />

            <span>Keluar dari akun</span>
          </button>
        </form>
      </section>

      {/* Password modal */}
      {showPasswordInfo && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-3 backdrop-blur-md sm:items-center"
          onClick={() => setShowPasswordInfo(false)}
        >
          <div
            className="w-full max-w-md rounded-[28px] border border-border bg-surface p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
              <KeyRound size={24} />
            </div>

            <h2 className="mt-5 text-center text-xl font-semibold text-foreground">
              Password
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-muted">
              Karena kamu masuk menggunakan Google, password akun
              dikelola langsung oleh Google dan tidak disimpan oleh
              Ruang Belajar.
            </p>

            <button
              type="button"
              onClick={() => setShowPasswordInfo(false)}
              className="mt-6 w-full rounded-[18px] bg-surface-2 py-3.5 text-sm font-medium text-foreground transition hover:bg-surface-3 active:scale-[0.99]"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Two factor modal */}
      {showTwoFactorInfo && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-3 backdrop-blur-md sm:items-center"
          onClick={() => setShowTwoFactorInfo(false)}
        >
          <div
            className="w-full max-w-md rounded-[28px] border border-border bg-surface p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
              <Smartphone size={24} />
            </div>

            <h2 className="mt-5 text-center text-xl font-semibold text-foreground">
              Verifikasi dua langkah
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-muted">
              Verifikasi dua langkah untuk akun Google kamu dapat
              dikelola melalui pengaturan keamanan akun Google.
            </p>

            <button
              type="button"
              onClick={() => setShowTwoFactorInfo(false)}
              className="mt-6 w-full rounded-[18px] bg-surface-2 py-3.5 text-sm font-medium text-foreground transition hover:bg-surface-3 active:scale-[0.99]"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}