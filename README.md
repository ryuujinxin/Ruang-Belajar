# 🎓 Ruang Belajar - Modern E-Learning Platform

<div align="center">

<!-- Tech Badges -->
<img src="https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Prisma_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">

<p>A modern, full-stack web-based learning platform designed to provide a simple, clean, and comfortable experience for studying, practicing, and growing.</p>

<!-- Social Media & Contact Links -->
<p>
  <a href="https://instagram.com/username_kamu" target="_blank"><img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white" alt="Instagram"></a>
  <a href="https://tiktok.com/@username_kamu" target="_blank"><img src="https://img.shields.io/badge/TikTok-%23000000.svg?style=for-the-badge&logo=TikTok&logoColor=white" alt="TikTok"></a>
  <a href="https://youtube.com/@username_kamu" target="_blank"><img src="https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white" alt="YouTube"></a>
  <a href="https://github.com/ryuujinxin" target="_blank"><img src="https://img.shields.io/badge/GitHub-%2312100e.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
  <a href="mailto:emailkamu@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
</p>

</div>

---

## ✨ Features

### 🔐 Authentication
- Sign in & Sign up
- Session-based authentication via NextAuth
- Protected dashboard & role-based layout
- Account security & profile management

### 📚 Learning & Practice
- Comprehensive learning dashboard
- Structured study materials & resources
- Dynamic practice/latihan soal sessions
- Progress-oriented learning experience

### 👤 Profile & Settings
- Customizable user profile
- Language & appearance preferences
- Security and privacy configurations

### 🎨 User Experience
- Fully responsive design (Mobile, Tablet, Desktop)
- Clean, modern, and accessible interface
- Dark / Light theme support

---

## 🛠️ 25+ Tools, Apps & Technologies Used

The project is built using a robust, modern development ecosystem:

| No | Tool / App / Tech | Kategori | Fungsi di Proyek |
|----|---|---|---|
| 1 | **Next.js 16** | Framework | Full-stack React framework dengan App Router |
| 2 | **React** | Library UI | Pengembangan komponen antarmuka interaktif |
| 3 | **TypeScript** | Bahasa Pemrograman | Type-safe development untuk meminimalisir bug |
| 4 | **Prisma 7** | ORM Database | Toolkit database modern untuk migrasi & query |
| 5 | **PostgreSQL** | Database Server | Penyimpanan data relasional utama aplikasi |
| 6 | **NextAuth** | Autentikasi | Sistem manajemen sesi dan keamanan login |
| 7 | **Tailwind CSS** | Framework CSS | Utility-first styling untuk desain modern |
| 8 | **Turbopack** | Bundler | Peningkatan kecepatan pengembangan lokal |
| 9 | **Node.js** | Runtime Environment | Menjalankan server aplikasi di balik layar |
| 10 | **NPM** | Package Manager | Pengelola paket dependensi proyek |
| 11 | **Git** | Version Control | Sistem pelacakan riwayat kode sumber |
| 12 | **GitHub** | Cloud Platform | Penyimpanan repositori dan kolaborasi online |
| 13 | **Visual Studio Code** | Text Editor | Lingkungan utama penulisan kode (IDE) |
| 14 | **Windows Terminal** | Command Line | Antarmuka terminal utama sistem operasi |
| 15 | **PowerShell** | Shell Scripting | Eksekusi perintah CLI dan manajemen script |
| 16 | **Google Chrome / DevTools** | Browser & Debugger | Pengujian tampilan web dan debugging |
| 17 | **ESLint** | Code Quality | Pengecek error dan standar penulisan sintaks |
| 18 | **Prettier** | Formatter | Penyelaras format penulisan kode otomatis |
| 19 | **Postman / Thunder Client** | API Testing | Pengujian endpoint server dan rute API |
| 20 | **Markdown** | Dokumentasi | Format penulisan file README.md yang rapi |
| 21 | **Google Fonts** | Tipografi | Penyedia font modern berstandar estetika tinggi |
| 22 | **Shields.io** | Dokumentasi | Pembuat lencana/badge status dinamis |
| 23 | **Vercel / Netlify** | Deployment | Platform hosting cloud untuk produksi aplikasi |
| 24 | **Microsoft OneDrive** | Cloud Storage | Tempat sinkronisasi direktori dokumen lokal |
| 25 | **Discord** | Komunikasi | Diskusi pengembangan proyek bersama komunitas |
| 26 | **OBS Studio** | Kreatif / Media | Perekaman demo aplikasi atau dokumentasi video |

---

## 📁 Project Structure

```text
edu-app/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── learn/
│   │   ├── onboarding/
│   │   ├── practice/
│   │   └── profile/
│   ├── components/
│   │   └── ui/
│   ├── features/
│   │   └── auth/
│   ├── data/
│   ├── lib/
│   │   ├── auth/
│   │   └── prisma.ts
│   └── types/
├── prisma7.config.ts
├── next.config.ts
├── package.json
└── README.md
