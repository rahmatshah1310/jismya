"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { CartModalProvider } from "../context/CartSidebarModalContext";
import CartSidebarModal from "@/components/Common/CartSidebarModal";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import { QueryProvider } from "@/components/providers/query-provider";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "@/components/providers/toast-providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <QueryProvider>
              <CartModalProvider>
                <CartProvider>
                  <Header />
                  {children}
                  <ToastProvider />
                  <CartSidebarModal />
                </CartProvider>
              </CartModalProvider>
              <ScrollToTop />
              <Footer />
            </QueryProvider>
          </>
        )}
      </body>
    </html>
  );
}
