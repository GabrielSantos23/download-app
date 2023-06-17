import { createContext } from 'react';
interface IThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext({
  theme: 'light',
  setTheme: (theme: string) => {},
});
