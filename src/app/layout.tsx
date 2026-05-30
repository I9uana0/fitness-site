import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["cyrillic", "latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["cyrillic", "latin"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Technological fitness-club",
  description:
    'Сайт фитнес-клуба "Техологический" с расписанием и личным кабинетом',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full flex flex-col mx-auto`}>
        <Header />
        <main className="max-w-7xl w-full mx-auto px-2 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Toaster
          position="top-right"
          reverseOrder={true}
        />
      </body>
    </html>
  );
}
