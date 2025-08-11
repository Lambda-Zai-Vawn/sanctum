
"use client";

import * as React from 'react';

/**
 * @typedef CommandContextType
 * @property {boolean} open - Whether the command palette is open.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setOpen - Function to set the open state of the command palette.
 * @property {string} searchTerm - The current search term in the command palette.
 * @property {React.Dispatch<React.SetStateAction<string>>} setSearchTerm - Function to set the search term.
 */
type CommandContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const CommandContext = React.createContext<CommandContextType | undefined>(undefined);

/**
 * Provides a context for managing the state of a command palette.
 * This includes its open state and the current search term.
 * @param {{children: React.ReactNode}} props - The children to be wrapped by the provider.
 */
export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <CommandContext.Provider value={{ open, setOpen, searchTerm, setSearchTerm }}>
      {children}
    </CommandContext.Provider>
  );
}

/**
 * A custom hook to access the command palette's context.
 * Must be used within a CommandProvider.
 * @returns {CommandContextType} The command context.
 * @throws {Error} If used outside of a CommandProvider.
 */
export function useCommand() {
  const context = React.useContext(CommandContext);
  if (context === undefined) {
    throw new Error('useCommand must be used within a CommandProvider');
  }
  return context;
}
