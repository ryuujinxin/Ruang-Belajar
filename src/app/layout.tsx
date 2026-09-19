import type { Metadata } from "next";
import "./globals.css";

import ThemeProvider from "../components/ThemeProvider";
import { LanguageProvider } from "../components/LanguageProvider";

export const metadata: Metadata = {
  title: "Ruang Belajar",
  description:
    "Belajar lebih mudah bersama Ruang Belajar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}