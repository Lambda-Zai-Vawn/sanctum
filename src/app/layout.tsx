
"use client";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CommandProvider } from "@/hooks/use-command";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Lexend:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body", "antialiased", "bg-background", "text-foreground")}>
        <CommandProvider>
            {children}
        </CommandProvider>
        <Toaster />
      </body>
    </html>
  );
}
