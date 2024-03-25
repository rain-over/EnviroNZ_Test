import React, { createContext, useContext, useState } from 'react';
import { defualtPosition } from '../lib/contants';
import { Suburb } from '../lib/types';

// const defaultLocation: Position = [-41.2728, 173.2994];
const [defaultLatitude, defualtLongitude] = defualtPosition;

const defaultLocation: Suburb = {
  id: 0,
  suburbName: '',
  latitude: defaultLatitude,
  longitude: defualtLongitude,
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
