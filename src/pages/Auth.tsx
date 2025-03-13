
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Star, Moon, Mail, Lock, UserPlus, LogIn, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import BackgroundImage from '../components/BackgroundImage';
import StarryBackground from '../components/StarryBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? false : true;
  
  const [loaded, setLoaded] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

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
        navigate('/onboarding');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (isLoginMode) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido/a de vuelta",
        });
        
        navigate('/home');
      } else {
        // Sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: "Registro exitoso",
          description: "Por favor, verifica tu correo electrónico para continuar",
        });
        
        // Redirect to a verification page or show a message
        navigate('/auth/verify', { state: { email } });
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      // Handle different error messages
      if (error.message.includes('Email not confirmed')) {
        setErrorMessage('Por favor confirma tu correo electrónico antes de iniciar sesión.');
      } else if (error.message.includes('Invalid login credentials')) {
        setErrorMessage('Credenciales incorrectas. Verifica tu correo y contraseña.');
      } else if (error.message.includes('User already registered')) {
        setErrorMessage('Este correo ya está registrado. Intenta iniciar sesión.');
      } else {
        setErrorMessage(error.message || 'Ocurrió un error al procesar tu solicitud.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrorMessage('');
  };
  
  // Check if we have a remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

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
            
            <h1 className="text-4xl sm:text-5xl font-playfair font-semibold tracking-tight mb-2 text-cosmos-darkGold text-shadow-lg">
              Vero Cosmos
            </h1>
            
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cosmos-gold to-transparent my-5" />
            
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-2xl font-playfair mb-4 text-cosmos-darkGold">
                {isLoginMode ? 'Inicia tu viaje cósmico' : 'Únete al universo'}
              </h2>
              
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}
              
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cosmos-darkGold opacity-70" />
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-white/30 border-cosmos-gold/30"
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cosmos-darkGold opacity-70" />
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 bg-white/30 border-cosmos-gold/30"
                    />
                  </div>
                </div>
                
                {isLoginMode && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="rememberMe" 
                      checked={rememberMe} 
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                      className="border-cosmos-gold/50 data-[state=checked]:bg-cosmos-gold/70"
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-cosmos-darkGold">
                      Recordar mis datos
                    </Label>
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full button-effect glass-card bg-cosmos-gold/20 hover:bg-cosmos-gold/40 text-cosmos-darkGold border border-cosmos-gold/30"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-cosmos-darkGold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Cargando...
                    </span>
                  ) : isLoginMode ? (
                    <span className="flex items-center justify-center">
                      <LogIn className="mr-2 h-5 w-5" />
                      Iniciar Sesión
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Registrarse
                    </span>
                  )}
                </Button>
              </form>
              
              <div className="mt-4">
                <button 
                  onClick={toggleMode} 
                  className="text-sm text-cosmos-darkGold hover:underline transition-all"
                >
                  {isLoginMode 
                    ? '¿No tienes una cuenta? Regístrate aquí' 
                    : '¿Ya tienes una cuenta? Inicia sesión aquí'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
};

export default Auth;
