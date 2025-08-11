
"use client";

import * as React from 'react';

type CommandContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const CommandContext = React.createContext<CommandContextType | undefined>(undefined);

export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <CommandContext.Provider value={{ open, setOpen, searchTerm, setSearchTerm }}>
      {children}
    </CommandContext.Provider>
  );
}

export function useCommand() {
  const context = React.useContext(CommandContext);
  if (context === undefined) {
    throw new Error('useCommand must be used within a CommandProvider');
  }
  return context;
}
