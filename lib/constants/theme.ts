export const STORAGE_KEY = 'ui-theme' as const;
export const THEME_ATTRIBUTE = 'data-theme' as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type Theme = typeof THEMES[keyof typeof THEMES];