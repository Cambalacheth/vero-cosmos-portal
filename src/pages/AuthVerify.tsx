
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, Moon, Mail, CheckCircle } from 'lucide-react';
import BackgroundImage from '../components/BackgroundImage';
import StarryBackground from '../components/StarryBackground';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const AuthVerify = () => {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  useEffect(() => {
    setLoaded(true);
    
    // Check if user is already logged in
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/onboarding');
      }
    };
    
    checkUser();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/onboarding');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleBackToLogin = () => {
    navigate('/auth?mode=login');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <StarryBackground />
      <BackgroundImage 
        backgroundImageUrl="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1413&q=80"
        usePlainBackground={false}
      >
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10">
          <div 
            className={`w-full max-w-md mx-auto text-center transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="celestial-icons flex justify-center items-center gap-3 mb-4">
              <Star className="h-6 w-6 text-cosmos-gold animate-twinkle" />
              <Moon className="h-8 w-8 text-cosmos-gold animate-float" />
              <Star className="h-6 w-6 text-cosmos-gold animate-twinkle" />
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <div className="flex justify-center mb-4">
                <Mail className="h-16 w-16 text-cosmos-gold" />
              </div>
              
              <h2 className="text-2xl font-playfair mb-3 text-cosmos-darkGold">
                Verifica tu correo electrónico
              </h2>
              
              <p className="text-cosmos-darkGold mb-6">
                Hemos enviado un correo de verificación a:
                <span className="block font-medium mt-2">{email || 'tu dirección de correo'}</span>
              </p>
              
              <div className="bg-white/20 rounded-lg p-4 mb-6 border border-cosmos-gold/20">
                <div className="flex items-start space-x-3 text-left">
                  <CheckCircle className="h-5 w-5 text-cosmos-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-cosmos-darkGold">
                      Por favor revisa tu bandeja de entrada y haz clic en el enlace de verificación para activar tu cuenta.
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-cosmos-darkGold mb-6">
                Una vez que hayas verificado tu correo, podrás comenzar el proceso de onboarding y personalizar tu experiencia.
              </p>
              
              <Button 
                onClick={handleBackToLogin}
                className="w-full button-effect glass-card bg-cosmos-gold/20 hover:bg-cosmos-gold/40 text-cosmos-darkGold border border-cosmos-gold/30"
              >
                Volver al inicio de sesión
              </Button>
            </div>
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
};

export default AuthVerify;
