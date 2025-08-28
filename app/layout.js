import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Layout } from "../components/layout/layout";
import { QueryProvider } from "../components/providers/query-provider";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../components/providers/toast-providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata = {
  title: {
    default: "User.pk - Pakistan's Leading E-commerce Platform",
    template: "%s | User.pk",
  },
  description: "Shop the latest products in Health & Beauty, Electronics, Fashion, and more. Fast delivery, secure payments, and excellent customer service.",
  keywords: ["e-commerce", "online shopping", "Pakistan", "health & beauty", "electronics", "fashion", "perfumes", "appliances"],
  authors: [{ name: "User.pk" }],
  creator: "User.pk",
  publisher: "User.pk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://User.pk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://User.pk",
    siteName: "User.pk",
    title: "User.pk - Pakistan's Leading E-commerce Platform",
    description: "Shop the latest products in Health & Beauty, Electronics, Fashion, and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "User.pk - Pakistan's Leading E-commerce Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Userpk",
    creator: "@Userpk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${merriweather.variable} font-sans antialiased bg-cream  text-ink`}
      >
        <QueryProvider>
          <CartProvider>
            <Layout>{children}</Layout>
            <ToastProvider />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
