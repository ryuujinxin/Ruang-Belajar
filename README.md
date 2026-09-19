# 🎓 Ruang Belajar

> **Platform belajar modern untuk belajar, berlatih, dan berkembang.**

Ruang Belajar adalah aplikasi pembelajaran berbasis web yang dirancang untuk memberikan pengalaman belajar yang **sederhana, modern, dan nyaman**.

Aplikasi ini menyediakan autentikasi pengguna, dashboard pembelajaran, latihan soal, profil pengguna, onboarding, serta pengaturan akun yang terintegrasi dalam satu platform.

---

## ✨ Features

### 🔐 Authentication

* Sign in & Sign up
* Session-based authentication
* Protected dashboard
* User roles
* Account security
* Profile management

### 📚 Learning

* Learning dashboard
* Materi pembelajaran
* Practice / latihan soal
* Dynamic practice sessions
* Question management
* Progress-oriented learning experience

### 👤 Profile & Account

* User profile
* Edit profile
* Account settings
* Language preferences
* Appearance settings
* Privacy settings
* Security settings

### 🎨 User Experience

* Responsive design
* Modern interface
* Dark / light theme support
* Reusable UI components
* Mobile-friendly layout
* Smooth and consistent navigation

---

## 🛠 Tech Stack

| Technology       | Usage                      |
| ---------------- | -------------------------- |
| **Next.js 16**   | Full-stack React framework |
| **React**        | UI development             |
| **TypeScript**   | Type-safe development      |
| **Prisma 7**     | Database ORM               |
| **PostgreSQL**   | Database                   |
| **NextAuth**     | Authentication             |
| **Tailwind CSS** | Styling                    |
| **Turbopack**    | Development bundler        |
| **ESLint**       | Code quality               |

---

## 📁 Project Structure

```text
edu-app/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── learn/
│   │   ├── onboarding/
│   │   ├── practice/
│   │   └── profile/
│   │
│   ├── components/
│   │   └── ui/
│   │
│   ├── features/
│   │   └── auth/
│   │
│   ├── data/
│   │
│   ├── lib/
│   │   ├── auth/
│   │   └── prisma.ts
│   │
│   └── types/
│
├── prisma7.config.ts
├── next.config.ts
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Requirements

Sebelum menjalankan project, pastikan sudah terinstall:

* Node.js 20+
* npm
* PostgreSQL
* Git

---

### 1. Clone Repository

```bash
git clone https://github.com/ryuujinxin/Ruang-Belajar.git
cd Ruang-Belajar
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Buat file:

```text
.env
```

Kemudian isi konfigurasi yang diperlukan:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

AUTH_SECRET="your-secret-key"
```

> Jangan commit file `.env` ke repository.

---

### 4. Generate Prisma Client

```bash
npx prisma generate
```

---

### 5. Setup Database

Jalankan migration:

```bash
npx prisma migrate dev
```

Jika database sudah memiliki migration yang siap digunakan:

```bash
npx prisma migrate deploy
```

---

### 6. Run Development Server

```bash
npm run dev
```

Buka:

```text
http://localhost:3000
```

---

## 🧩 Development

Untuk memeriksa kualitas kode:

```bash
npm run lint
```

Untuk membuat production build:

```bash
npm run build
```

Untuk menjalankan production server:

```bash
npm start
```

---

## 🗄 Database

Ruang Belajar menggunakan **PostgreSQL** sebagai database dan **Prisma ORM** sebagai database toolkit.

Schema database berada di:

```text
prisma/schema.prisma
```

Migration berada di:

```text
prisma/migrations/
```

Setelah melakukan perubahan pada schema:

```bash
npx prisma migrate dev --name your-migration-name
```

Kemudian generate ulang Prisma Client:

```bash
npx prisma generate
```

---

## 🔑 Authentication

Authentication digunakan untuk mengelola:

* User registration
* User login
* Sessions
* Protected routes
* User roles
* Account security

Authentication configuration berada di:

```text
src/auth.ts
```

API authentication:

```text
src/app/api/auth/[...nextauth]/
```

---

## 🎨 Design Philosophy

Ruang Belajar dibuat dengan beberapa prinsip:

### Simple

Antarmuka dibuat sederhana agar pengguna dapat langsung fokus pada proses belajar.

### Modern

Menggunakan visual hierarchy, spacing, typography, dan komponen yang konsisten.

### Responsive

Pengalaman pengguna dirancang agar tetap nyaman digunakan pada:

* Desktop
* Tablet
* Mobile

### Accessible

Komponen dan navigasi dirancang agar mudah dipahami dan digunakan.

---

## 🗺 Roadmap

### Completed

* [x] Authentication
* [x] User registration
* [x] User login
* [x] Dashboard
* [x] Profile
* [x] Account settings
* [x] Practice system
* [x] Prisma integration
* [x] PostgreSQL integration
* [x] Theme settings
* [x] Language settings

### In Progress

* [ ] Learning materials
* [ ] Learning progress
* [ ] Improved practice experience
* [ ] Teacher system
* [ ] Admin dashboard

### Planned

* [ ] Course system
* [ ] Achievement system
* [ ] Learning statistics
* [ ] Notifications
* [ ] Teacher marketplace
* [ ] Advanced analytics
* [ ] Mobile application

---

## 🤝 Contributing

Contributions, ideas, and improvements are welcome.

Untuk melakukan perubahan:

```bash
git checkout -b feature/your-feature
```

Kemudian commit:

```bash
git add .
git commit -m "feat: add your feature"
```

Push branch:

```bash
git push origin feature/your-feature
```

---

## 📄 License

This project is currently intended for development and educational purposes.

---

## 👨‍💻 Author

**Ryuu**

GitHub:

https://github.com/ryuujinxin

---

<p align="center">
  Built with ❤️ using Next.js, TypeScript, Prisma, and PostgreSQL.
</p>
