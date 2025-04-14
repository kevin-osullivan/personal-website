import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kevin O'Sullivan - Software Engineer & Researcher",
  description: "Personal website showcasing projects, research, and professional experience",
  keywords: ["software engineer", "researcher", "projects", "portfolio", "web development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-white dark:bg-gray-900">
          {children}
        </main>
        <footer className="bg-gray-50 dark:bg-gray-800 py-8">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} Kevin O'Sullivan. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
