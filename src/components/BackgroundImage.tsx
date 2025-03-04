
import React, { useState, useEffect } from 'react';

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
    <div className={`relative ${fullHeight ? 'min-h-screen' : 'min-h-[calc(100vh-64px)]'} w-full overflow-hidden`}>
      {usePlainBackground ? (
        <div className="absolute inset-0 bg-gradient-to-b from-cosmos-lavender to-white" />
      ) : (
        <>
          <div 
            className={`absolute inset-0 bg-cosmos-lavender transition-opacity duration-1000 ease-in-out ${loaded ? 'opacity-0' : 'opacity-100'}`}
          />
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundImage: `url("${backgroundImageUrl}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }} 
          >
            <div className="absolute inset-0 cosmos-overlay" />
          </div>
        </>
      )}
      <div className="relative z-10 h-full pb-16">{children}</div>
    </div>
  );
};

export default BackgroundImage;
