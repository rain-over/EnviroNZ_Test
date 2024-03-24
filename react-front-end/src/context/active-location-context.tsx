import React, { createContext, useContext, useState } from 'react';
import { Position, Suburb } from '../lib/types';

// const defaultLocation: Position = [-41.2728, 173.2994];
const defaultLocation: Suburb = {
  id: 0,
  suburbName: '',
  latitude: -36.8508,
  longitude: 174.7645,
};

type ActiveLocationContextProviderProps = {
  children: React.ReactNode;
};

type ActiveLocationContextProviderType = {
  activeLocation: Suburb;
  setActiveLocation: React.Dispatch<React.SetStateAction<Suburb>>;
};

export const ActiveLocationContext =
  createContext<ActiveLocationContextProviderType | null>(null);

export default function ActiveLocationContextProvider({
  children,
}: ActiveLocationContextProviderProps) {
  const [activeLocation, setActiveLocation] = useState<Suburb>(defaultLocation);

  return (
    <ActiveLocationContext.Provider
      value={{ activeLocation, setActiveLocation }}
    >
      {children}
    </ActiveLocationContext.Provider>
  );
}

export function useActiveLocationContext() {
  const context = useContext(ActiveLocationContext);

  if (context === null) {
    console.log('error: useActiveLocationContext');
    throw new Error(
      'useActiveLocationContext must be used within an ActiveLocationContextProvider'
    );
  }

  return context;
}
