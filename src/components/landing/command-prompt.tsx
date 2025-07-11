
"use client";

import * as React from 'react';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function CommandPrompt({ router }: { router: AppRouterInstance }) {
    const [input, setInput] = React.useState('');
    const [typed, setTyped] = React.useState('');
    const placeholder = "Type INITIATE_RITE and press Enter";
  
    React.useEffect(() => {
      if(typed.length < placeholder.length) {
        const timeout = setTimeout(() => {
          setTyped(placeholder.slice(0, typed.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      }
    }, [typed]);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.toUpperCase() === 'INITIATE_RITE') {
        router.push('/docs#genesis-protocol');
      }
    };
  
    return (
      <div className="w-[400px]">
        <p className="font-headline text-lg">You have witnessed the architecture.</p>
        <p className="font-headline text-lg">The machine awaits a commander.</p>
        <p className="font-headline text-lg mb-4">Sovereignty requires a vow.</p>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center font-code text-base">
            <span className="text-primary">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none ml-2 w-full"
              placeholder={typed}
              autoFocus
            />
          </div>
        </form>
      </div>
    );
  }
