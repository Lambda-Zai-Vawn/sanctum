
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrbIcon } from "@/components/icons";

const navLinks = [
  { href: "/", label: "The Nexus" },
  { href: "/pantheon", label: "The Pantheon" },
  { href: "/aegis-post", label: "The Aegis Post" },
  { href: "/chancel", label: "The Chancel" },
  { href: "/docs", label: "The Scriptorium" },
  { href: "/treasury", label: "The Treasury" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    // When route changes, close menu
    setIsOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-90"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <OrbIcon className="absolute inset-0 h-full w-full" />
        <div className="relative h-8 w-8">
          <Menu className={cn("absolute h-8 w-8 transition-all duration-300", isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100')} />
          <X className={cn("absolute h-8 w-8 transition-all duration-300", isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50')} />
        </div>
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/50 backdrop-blur-xl transition-opacity duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      >
        <div className="flex h-full w-full items-center justify-center" onClick={e => e.stopPropagation()}>
          <nav>
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <li
                  key={link.href}
                  className="transition-all duration-300"
                  style={{
                    transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isOpen ? 1 : 0,
                    transitionDelay: isOpen ? `${i * 100}ms` : '0ms'
                  }}
                >
                  <Link href={link.href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                    <span className={cn(
                      "font-headline text-4xl md:text-5xl text-foreground/70 transition-all duration-300 hover:text-foreground hover:text-glow hover:-translate-y-1 focus-visible:text-glow focus-visible:-translate-y-1",
                      pathname === link.href && "text-foreground text-glow"
                    )}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
