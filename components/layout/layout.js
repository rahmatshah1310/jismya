"use client";
import { Header } from "./header";
import { Footer } from "./footer";
import { Suspense } from "react";
import { BeatLoader } from "react-spinners";

export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Suspense fallback={<BeatLoader color="darkBlue" />}>
        <main className="flex-1">{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
}
