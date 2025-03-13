
import React, { useState } from 'react';
import { AlertTriangle, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type AuthFormProps = {
  initialMode: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ initialMode }) => {
  const [isLoginMode, setIsLoginMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
        // Sign up - Changed to direct to onboarding without waiting for verification
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        
        // Store user email in localStorage for the onboarding process
        localStorage.setItem('pendingVerificationEmail', email);
        
        toast({
          title: "Registro exitoso",
          description: "Comencemos con tu experiencia personalizada",
        });
        
        // Start onboarding immediately instead of redirecting to verification page
        navigate('/onboarding');
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
  
  return (
    <div className="glass-card p-6 rounded-xl bg-black/50 backdrop-blur-md">
      <h2 className="text-2xl font-playfair mb-4 text-white">
        {isLoginMode ? 'Inicia tu viaje cósmico' : 'Únete al universo'}
      </h2>
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleAuth} className="space-y-4">
        {isLoginMode ? (
          <LoginForm 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
          />
        ) : (
          <RegisterForm 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        )}
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full button-effect glass-card bg-cosmos-gold/20 hover:bg-cosmos-gold/40 text-white border border-cosmos-gold/30"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          className="text-sm text-white hover:underline transition-all"
        >
          {isLoginMode 
            ? '¿No tienes una cuenta? Regístrate aquí' 
            : '¿Ya tienes una cuenta? Inicia sesión aquí'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
