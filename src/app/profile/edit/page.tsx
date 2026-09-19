"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Check,
  ImagePlus,
  Trash2,
  UserRound,
} from "lucide-react";

type ProfileImage = {
  id: string;
  image: string;
  name: string;
};

export default function EditProfilePage() {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [images, setImages] = useState<ProfileImage[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem(
      "ruang-belajar-profile"
    );

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);

        setName(profile.name || "");
        setBio(profile.bio || "");
        setAvatar(profile.avatar || "");
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

  /* ============================= */
  /* AVATAR */
  /* ============================= */

  function handleAvatarUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Foto profil maksimal 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(reader.result as string);
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  }

  /* ============================= */
  /* GALLERY */
  /* ============================= */

  function handleGalleryUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        return;
      }

      if (file.size > 8 * 1024 * 1024) {
        alert(
          `${file.name} terlalu besar. Maksimal 8MB.`
        );
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const item: ProfileImage = {
          id: `${Date.now()}-${Math.random()}`,
          image: reader.result as string,
          name: file.name,
        };

        setImages((current) => [
          ...current,
          item,
        ]);
      };

      reader.readAsDataURL(file);
    });

    event.target.value = "";
  }

  function removeImage(id: string) {
    setImages((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  /* ============================= */
  /* SAVE */
  /* ============================= */

  function saveProfile() {
    setSaving(true);

    const profile = {
      name: name.trim() || "Pelajar",
      bio: bio.trim(),
      avatar,
    };

    localStorage.setItem(
      "ruang-belajar-profile",
      JSON.stringify(profile)
    );

    localStorage.setItem(
      "ruang-belajar-profile-images",
      JSON.stringify(images)
    );

    setTimeout(() => {
      window.location.href = "/profile";
    }, 450);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/[0.08] blur-[130px]" />

        <div className="absolute right-[-160px] top-20 h-[420px] w-[420px] rounded-full bg-blue-500/[0.07] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-5 pb-16 sm:px-8">
        {/* Header */}
        <header className="sticky top-0 z-50 -mx-5 flex h-[70px] items-center justify-between border-b border-border bg-background/85 px-5 backdrop-blur-2xl sm:-mx-8 sm:px-8">
          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-muted-strong transition hover:bg-surface-3 hover:text-foreground"
          >
            <ArrowLeft size={19} />
          </Link>

          <h1 className="text-[15px] font-semibold">
            Edit Profil
          </h1>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-xs font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
          >
            {saving ? (
              <>
                <Check size={14} />
                Menyimpan
              </>
            ) : (
              "Simpan"
            )}
          </button>
        </header>

        {/* PHOTO */}
        <section className="mt-10 flex flex-col items-center">
          <div className="relative">
            <div className="h-32 w-32 overflow-hidden rounded-full border border-border bg-surface-2 shadow-[0_25px_80px_rgba(0,0,0,0.18)]">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Foto profil"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <UserRound
                    size={42}
                    className="text-muted"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() =>
                avatarInputRef.current?.click()
              }
              className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-background bg-foreground text-background shadow-xl transition hover:scale-105"
              aria-label="Ganti foto profil"
            >
              <Camera size={17} />
            </button>
          </div>

          <button
            onClick={() =>
              avatarInputRef.current?.click()
            }
            className="mt-4 text-sm font-medium text-muted-strong transition hover:text-foreground"
          >
            Ganti foto profil
          </button>

          <p className="mt-1 text-[11px] text-muted">
            JPG, PNG atau WEBP · Maks. 5MB
          </p>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </section>

        {/* BASIC INFO */}
        <section className="mt-11">
          <p className="px-1 text-[11px] font-medium uppercase tracking-[0.17em] text-muted">
            Informasi pribadi
          </p>

          <div className="mt-3 overflow-hidden rounded-[27px] border border-border bg-surface">
            {/* NAME */}
            <div className="border-b border-border px-5 py-4">
              <label className="text-xs text-muted">
                Nama
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Masukkan nama"
                className="mt-2 w-full bg-transparent text-[16px] font-medium text-foreground outline-none placeholder:text-muted"
              />
            </div>

            {/* BIO */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted">
                  Bio
                </label>

                <span className="text-[10px] text-muted">
                  {bio.length}/160
                </span>
              </div>

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                maxLength={160}
                rows={4}
                placeholder="Tulis sesuatu tentang kamu..."
                className="mt-2 w-full resize-none bg-transparent text-sm leading-6 text-foreground outline-none placeholder:text-muted"
              />
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="mt-11">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="px-1 text-[11px] font-medium uppercase tracking-[0.17em] text-muted">
                Pencapaian
              </p>

              <h2 className="mt-1.5 text-xl font-semibold">
                Foto & Piagam
              </h2>

              <p className="mt-1 text-xs text-muted">
                Tambahkan foto pencapaian belajar kamu.
              </p>
            </div>

            <button
              onClick={() =>
                galleryInputRef.current?.click()
              }
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2.5 text-xs font-semibold text-background transition hover:opacity-90"
            >
              <ImagePlus size={15} />
              Tambah
            </button>

            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
            />
          </div>

          {images.length === 0 ? (
            <button
              onClick={() =>
                galleryInputRef.current?.click()
              }
              className="mt-4 flex min-h-[170px] w-full flex-col items-center justify-center rounded-[28px] border border-dashed border-border-strong bg-surface transition hover:bg-surface-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2">
                <ImagePlus
                  size={22}
                  className="text-muted"
                />
              </div>

              <p className="mt-4 text-sm font-medium text-muted-strong">
                Tambahkan foto
              </p>

              <p className="mt-1 max-w-[260px] text-center text-xs leading-5 text-muted">
                Upload piagam, sertifikat, medali,
                atau pencapaian lainnya.
              </p>
            </button>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {images.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-[23px] border border-border bg-surface"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center gap-2 px-3 py-3">
                    <p className="min-w-0 flex-1 truncate text-[11px] text-muted">
                      {item.name}
                    </p>

                    <button
                      onClick={() =>
                        removeImage(item.id)
                      }
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted transition hover:bg-red-500/15 hover:text-red-500"
                      aria-label={`Hapus ${item.name}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Save */}
        <button
          onClick={saveProfile}
          disabled={saving}
          className="mt-11 flex w-full items-center justify-center gap-2 rounded-[23px] bg-foreground py-4 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
        >
          <Check size={17} />

          {saving
            ? "Menyimpan..."
            : "Simpan perubahan"}
        </button>

        <p className="mt-4 text-center text-[10px] text-muted">
          Profil kamu akan diperbarui setelah disimpan.
        </p>
      </div>
    </main>
  );
}