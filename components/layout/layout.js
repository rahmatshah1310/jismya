"use client";
import { Header } from "./header";
import { Footer } from "./footer";

export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream dark:bg-d-bg text-ink dark:text-d-ink">
      <Header />
        <main className="flex-1 animate-fade-in">
          {children}
        </main>
      <Footer />
    </div>
  );
}
