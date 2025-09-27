"use client";

import { ThemeProvider } from "./theme-provider";
import { SessionProvider } from "next-auth/react";
import Header from "./header";

export default function ClientWrapper({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SessionProvider>
        <Header />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
