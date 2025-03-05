
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface BackgroundImageProps {
  children: React.ReactNode;
  fullHeight?: boolean;
  backgroundImageUrl?: string;
  usePlainBackground?: boolean;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  children, 
  fullHeight = true, 
  backgroundImageUrl = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80",
  usePlainBackground = false
}) => {
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (usePlainBackground) {
      setLoaded(true);
      return;
    }
    
    const img = new Image();
    img.src = backgroundImageUrl;
    img.onload = () => setLoaded(true);
  }, [backgroundImageUrl, usePlainBackground]);

  return (
    <div className={cn(
      "relative w-full overflow-hidden transition-colors duration-300",
      fullHeight ? 'min-h-screen' : 'min-h-[calc(100vh-64px)]'
    )}>
      {usePlainBackground ? (
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card transition-colors duration-300" />
      ) : (
        <>
          <div 
            className={cn(
              "absolute inset-0 bg-background transition-all duration-1000 ease-in-out",
              loaded ? 'opacity-0' : 'opacity-100'
            )}
          />
          <div 
            className={cn(
              "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out",
              loaded ? 'opacity-100' : 'opacity-0'
            )}
            style={{ 
              backgroundImage: `url("${backgroundImageUrl}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }} 
          >
            <div className="absolute inset-0 cosmos-overlay transition-all duration-300" />
          </div>
        </>
      )}
      <div className="relative z-10 h-full pb-16">{children}</div>
    </div>
  );
};

export default BackgroundImage;
