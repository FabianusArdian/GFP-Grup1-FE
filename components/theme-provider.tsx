"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { THEMES, STORAGE_KEY, THEME_ATTRIBUTE, type Theme } from '@/lib/constants/theme';
import { useThemeDetection } from '@/lib/hooks/use-theme-detection';
import { getLocalStorage, setLocalStorage } from '@/lib/utils/storage';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: THEMES.SYSTEM,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = THEMES.SYSTEM,
  storageKey = STORAGE_KEY,
  attribute = THEME_ATTRIBUTE,
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const systemPrefersDark = useThemeDetection();

  // Once mounted on client, get the theme from localStorage
  useEffect(() => {
    setMounted(true);
    const savedTheme = getLocalStorage(storageKey, defaultTheme);
    if (savedTheme && Object.values(THEMES).includes(savedTheme as Theme)) {
      setTheme(savedTheme as Theme);
    }
  }, [storageKey, defaultTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === THEMES.SYSTEM && enableSystem) {
      root.classList.add(systemPrefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
  }, [theme, systemPrefersDark, enableSystem]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setLocalStorage(storageKey, theme);
      setTheme(theme);
    },
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
