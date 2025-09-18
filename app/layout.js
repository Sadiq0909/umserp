import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "University Management System",
  description: "University Management System built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Client-side providers */}
        <ClientWrapper>{children}</ClientWrapper>

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        <footer className="w-full py-6 text-center border-t border-gray-200 text-zinc-700 dark:text-zinc-300">
          © {new Date().getFullYear()} University Management System. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
