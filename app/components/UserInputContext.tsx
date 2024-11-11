"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface UserInputContextType {
  userInput: string;
  setUserInput: (input: string) => void;
}

const UserInputContext = createContext<UserInputContextType | undefined>(undefined);

export const UserInputProvider = ({ children }: { children: ReactNode }) => {
  const [userInput, setUserInput] = useState<string>('');

  return (
    <UserInputContext.Provider value={{ userInput, setUserInput }}>
      {children}
    </UserInputContext.Provider>
  );
};

export const useUserInput = () => {
  const context = useContext(UserInputContext);
  if (!context) {
    throw new Error('useUserInput must be used within a UserInputProvider');
  }
  return context;
};
