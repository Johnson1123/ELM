"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Rubik } from "next/font/google";
import { ThemeProvider } from "@/utils/theme-provider";
import dynamic from "next/dynamic";
import { useState } from "react";
import StoreProvider from "./providers/Redux.provided";
import ToastProvider from "./providers/Toast.Notification";
import { SessionProvider } from "next-auth/react";

const Header = dynamic(() => import("./components/Header"));

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
  variable: "--font-Poppins",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
  variable: "--font-Rubik",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${rubik.variable} !bg-white dark:bg-black bg-no-repeat dark:from-gray-900 dark:to-black duration-300`}
      >
        <StoreProvider>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem={true}
            >
              <ToastProvider />
              <Header open={open} activeItem={activeItem} setOpen={setOpen} />
              {children}
            </ThemeProvider>
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
