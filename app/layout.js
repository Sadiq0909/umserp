// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Script from "next/script";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "University Management System",
  description: "University Management System built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              className: '',
              duration: 5000,
              style: {
                background: 'hsl(0 0% 100%)',
                color: 'hsl(240 10% 3.9%)',
                border: '1px solid hsl(240 5.9% 90%)',
              },
              dark: {
                style: {
                  background: 'hsl(240 10% 3.9%)',
                  color: 'hsl(0 0% 98%)',
                  border: '1px solid hsl(240 3.7% 15.9%)',
                },
              },
              success: {
                duration: 3000,
                iconTheme: { primary: '#10B981', secondary: 'white' },
              },
              error: {
                duration: 3000,
                iconTheme: { primary: '#EF4444', secondary: 'white' },
              },
            }}
          />
          {/* ✅ Wrap both Header + children inside AuthProvider */}
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="afterInteractive"
          />
          <footer className="w-full py-6 text-center border-t border-gray-200 text-zinc-700 dark:text-zinc-300">
            © {new Date().getFullYear()} University Management System. All rights reserved.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
