import Link from "next/link";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import SecurityActions from "./SecurityActions";

export default async function SecurityPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const user = session.user;

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-600/[0.08] blur-[100px]" />

        <div className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-blue-500/[0.06] blur-[110px]" />

        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/[0.04] blur-[100px]" />
      </div>

      <div className="relative mx-auto min-h-screen w-full max-w-2xl px-4 pb-12 sm:px-6">
        {/* Header */}
        <header className="sticky top-0 z-40 -mx-4 flex h-[72px] items-center border-b border-border bg-background/85 px-4 backdrop-blur-2xl sm:-mx-6 sm:px-6">
          <Link
            href="/profile/settings"
            className="flex items-center gap-1 text-muted-strong transition hover:text-foreground active:scale-95"
          >
            <ChevronLeft
              size={22}
              strokeWidth={1.8}
            />

            <span className="text-[15px]">
              Pengaturan
            </span>
          </Link>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold">
            Keamanan
          </h1>

          <div className="w-[80px]" />
        </header>

        <div className="space-y-7 pt-7">
          {/* STATUS */}
          <section>
            <div className="relative overflow-hidden rounded-[28px] border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.10] to-blue-500/[0.05] p-5">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/[0.10] blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-violet-500/10 text-violet-500">
                    <ShieldCheck
                      size={27}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <p className="text-[17px] font-semibold">
                      Akun terlindungi
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      <CheckCircle2
                        size={13}
                        className="text-emerald-500"
                      />

                      <span className="text-[12px] text-muted">
                        Login Google aktif
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-[13px] leading-5 text-muted">
                  Akun Ruang Belajar menggunakan Google untuk
                  autentikasi dan keamanan login.
                </p>
              </div>
            </div>
          </section>

          {/* ACCOUNT */}
          <section>
            <p className="mb-3 px-2 text-[11px] font-semibold tracking-[0.16em] text-muted">
              AKUN
            </p>

            <div className="overflow-hidden rounded-[24px] border border-border bg-surface/90 backdrop-blur-xl">
              {/* GOOGLE */}
              <div className="flex items-center gap-4 px-4 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-border bg-surface-2 text-muted-strong">
                  <UserRound
                    size={20}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium">
                    Akun Google
                  </p>

                  <p className="mt-1 truncate text-[12px] text-muted">
                    {user.name || "Pengguna"}
                  </p>
                </div>

                <CheckCircle2
                  size={18}
                  className="shrink-0 text-emerald-500"
                />
              </div>

              <div className="mx-4 border-t border-border" />

              {/* EMAIL */}
              <div className="flex items-center gap-4 px-4 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-border bg-surface-2 text-muted-strong">
                  <Mail
                    size={20}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium">
                    Email
                  </p>

                  <p className="mt-1 truncate text-[12px] text-muted">
                    {user.email || "Email tidak tersedia"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE SECURITY */}
          <SecurityActions />

          {/* SESSION */}
          <section>
            <p className="mb-3 px-2 text-[11px] font-semibold tracking-[0.16em] text-muted">
              SESI LOGIN
            </p>

            <div className="rounded-[24px] border border-border bg-surface/90 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-emerald-500/[0.08] text-emerald-500">
                  <ShieldCheck
                    size={20}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium">
                    Sesi saat ini
                  </p>

                  <p className="mt-1 text-[12px] leading-5 text-muted">
                    Kamu sedang login di perangkat ini.
                  </p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-500">
                  Aktif
                </span>
              </div>
            </div>
          </section>

          {/* INFO */}
          <div className="flex gap-3 rounded-[20px] border border-border bg-surface/70 p-4">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-muted"
            />

            <p className="text-[12px] leading-5 text-muted">
              Password dan verifikasi dua langkah tidak disimpan
              oleh Ruang Belajar. Keduanya dikelola oleh Google.
            </p>
          </div>

          <p className="pb-6 text-center text-[11px] text-muted">
            Ruang Belajar · Keamanan Akun
          </p>
        </div>
      </div>
    </main>
  );
}