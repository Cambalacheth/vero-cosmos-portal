
import React from 'react';
import { Moon, Sun, Droplet, Wind, Flame, Mountain } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function ThemeSelector() {
  const { theme, toggleTheme, elementTheme, setElementTheme } = useTheme();

  const elements = [
    { value: 'fire', label: 'Fuego', icon: <Flame className="h-4 w-4" /> },
    { value: 'earth', label: 'Tierra', icon: <Mountain className="h-4 w-4" /> },
    { value: 'air', label: 'Aire', icon: <Wind className="h-4 w-4" /> },
    { value: 'water', label: 'Agua', icon: <Droplet className="h-4 w-4" /> },
  ];

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        )}
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="gap-2"
          >
            {elements.find(el => el.value === elementTheme)?.icon}
            <span>Elemento</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]">
          <div className="grid grid-cols-2 gap-2">
            {elements.map((element) => (
              <Button
                key={element.value}
                variant="outline"
                className={cn(
                  "justify-start gap-2",
                  elementTheme === element.value && "border-primary bg-primary/10"
                )}
                onClick={() => setElementTheme(element.value as any)}
              >
                {element.icon}
                {element.label}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
