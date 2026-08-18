import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { AppView } from '../types/hive';

interface AppContextValue {
  view: AppView;
  setView: (view: AppView) => void;
  denseTables: boolean;
  setDenseTables: (value: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useLocalStorage<AppView>('hiveyard.view', 'dashboard');
  const [denseTables, setDenseTables] = useLocalStorage('hiveyard.dense', false);

  return (
    <AppContext.Provider value={{ view, setView, denseTables, setDenseTables }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useAppContext must be used within AppProvider');
  return value;
}
