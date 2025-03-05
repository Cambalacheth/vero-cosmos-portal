
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-background/50 backdrop-blur-sm"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all animate-pulse" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all animate-pulse" />
      )}
    </Button>
  );
};

export default ThemeToggleButton;
