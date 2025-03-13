
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import BackgroundImage from '../components/BackgroundImage';
import StarryBackground from '../components/StarryBackground';
import CelestialHeader from '../components/auth/CelestialHeader';
import AuthForm from '../components/auth/AuthForm';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? false : true;
  
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
    
    // Check if user is already logged in
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/home');
      }
    };
    
    checkUser();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/home');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Check if we have a remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      // The email is now handled in the AuthForm component
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <StarryBackground />
      <BackgroundImage 
        backgroundImageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        usePlainBackground={false}
      >
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10">
          <div 
            className={`w-full max-w-md mx-auto text-center transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <CelestialHeader />
            <AuthForm initialMode={initialMode} />
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
};

export default Auth;
