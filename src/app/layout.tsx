import type { Metadata } from "next";
import { Comfortaa, Lexend } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comfortaa",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: {
    default: "ΛΞVON OS: The Digital Temple of Sovereign Workflows",
    template: "%s | ΛΞVON OS",
  },
  description: "ΛΞVON OS is not another tool. It is the obliteration of the stack. A radically integrated, AI-native operating system designed to restore sovereignty to the operator.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", comfortaa.variable, lexend.variable)}>
      <body className={cn("font-body", "antialiased", "bg-background", "text-foreground")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
