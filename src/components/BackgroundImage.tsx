
import React, { useState, useEffect, useRef } from 'react';
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
  backgroundImageUrl = "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80",
  usePlainBackground = false
}) => {
  const [loaded, setLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (usePlainBackground) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      // Calculate mouse position relative to the center of the screen
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [usePlainBackground]);

  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden transition-colors duration-300",
        fullHeight ? 'min-h-screen' : 'min-h-[calc(100vh-64px)]'
      )}
      ref={backgroundRef}
    >
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
              transform: `translate(${position.x}px, ${position.y}px) scale(1.1)`,
              transition: 'transform 0.2s ease-out',
            }} 
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 cosmos-overlay transition-all duration-300" />
          </div>
        </>
      )}
      <div className="relative z-10 h-full pb-16">{children}</div>
    </div>
  );
};

export default BackgroundImage;
