
"use client";

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CommandProvider } from "@/hooks/use-command";

const metadata: Metadata = {
  metadataBase: new URL('https://www.aevon.io'),
  title: {
    default: "ΛΞVON OS: The Last Operating System You'll Ever Need",
    template: "%s | ΛΞVON Sanctum",
  },
  description: "ΛΞVON OS is a sovereign agentic operating system designed to make fragmented SaaS obsolete. Reclaim your digital sovereignty.",
  openGraph: {
    title: "ΛΞVON OS: The Last Operating System You'll Ever Need",
    description: "ΛΞVON OS is a sovereign agentic operating system designed to make fragmented SaaS obsolete. Reclaim your digital sovereignty.",
    url: "https://www.aevon.io",
    siteName: "ΛΞVON Sanctum",
    images: [
      {
        url: 'https://placehold.co/1200x630.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ΛΞVON OS: The Last Operating System You'll Ever Need",
    description: "ΛΞVON OS is a sovereign agentic operating system designed to make fragmented SaaS obsolete.",
    images: ['https://placehold.co/1200x630.png'],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ΛΞVON",
  "url": "https://www.aevon.io",
  "logo": "https://placehold.co/200x200.png",
  "description": "ΛΞVON builds agentic mythware to replace outdated SaaS, a unified OS for business sovereignty.",
  "sameAs": []
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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
