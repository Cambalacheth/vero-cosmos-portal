
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ZodiacElement, zodiacElementThemes } from '@/lib/theme-utils';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  elementTheme: ZodiacElement;
  setElementTheme: (element: ZodiacElement) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('vero-cosmos-theme') as Theme) || 'light'
  );
  
  // Initialize element theme from localStorage or default to 'fire'
  const [elementTheme, setElementTheme] = useState<ZodiacElement>(
    () => (localStorage.getItem('vero-cosmos-element') as ZodiacElement) || 'fire'
  );

  // Apply theme class to document when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('dark', 'light');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Store in localStorage
    localStorage.setItem('vero-cosmos-theme', theme);
    
    // Apply element theme variables
    const themeColors = zodiacElementThemes[elementTheme][theme];
    for (const [key, value] of Object.entries(themeColors)) {
      root.style.setProperty(key, value);
    }
  }, [theme, elementTheme]);

  // Store element theme in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('vero-cosmos-element', elementTheme);
  }, [elementTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, elementTheme, setElementTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
