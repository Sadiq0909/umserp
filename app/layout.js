import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import ClientWrapper from "@/components/ClientWrapper";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
=======
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Script from "next/script";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
>>>>>>> 9370099b9a5143d38fa1efb384675318f0cdc566

export const metadata = {
  title: "University Management System",
  description: "University Management System built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
<<<<<<< HEAD
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
=======
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
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: 'hsl(0 0% 100%)', // light mode background
                color: 'hsl(240 10% 3.9%)',   // light mode text
                border: '1px solid hsl(240 5.9% 90%)', // light mode border
              },
              
              // Apply styles for dark mode
              dark: {
                style: {
                  background: 'hsl(240 10% 3.9%)',  // dark mode background
                  color: 'hsl(0 0% 98%)',      // dark mode text
                  border: '1px solid hsl(240 3.7% 15.9%)', // dark mode border
                },
              },

              // Custom styles for specific toast types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981', // green-500
                  secondary: 'white',
                },
              },
              error: {
                duration: 3000,
                iconTheme: {
                  primary: '#EF4444', // red-500
                  secondary: 'white',
                },
              },
            }}
          />
          <Header />
          {children}
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="afterInteractive"
          />
          <footer className="w-full py-6 text-center border-t border-gray-200 text-zinc-700 dark:text-zinc-300">
            © {new Date().getFullYear()} University Management System. All
            rights reserved.
          </footer>
        </ThemeProvider>
>>>>>>> 9370099b9a5143d38fa1efb384675318f0cdc566
      </body>
    </html>
  );
}
