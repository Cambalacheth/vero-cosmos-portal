
import React, { useState, useEffect } from 'react';

interface BackgroundImageProps {
  children: React.ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80";
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div 
        className={`absolute inset-0 bg-cosmos-lavender transition-opacity duration-1000 ease-in-out ${loaded ? 'opacity-0' : 'opacity-100'}`}
      />
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }} 
      >
        <div className="absolute inset-0 cosmos-overlay" />
      </div>
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
};

export default BackgroundImage;
