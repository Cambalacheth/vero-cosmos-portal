
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import StarryBackground from '../components/StarryBackground';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

import Step1BirthInfo from '@/components/onboarding/Step1BirthInfo';
import Step2Purpose from '@/components/onboarding/Step2Purpose';
import Step3TarotCard from '@/components/onboarding/Step3TarotCard';
import Step4Interests from '@/components/onboarding/Step4Interests';
import Step5Theme from '@/components/onboarding/Step5Theme';

const VerificationReminder = () => {
  const pendingEmail = localStorage.getItem('pendingVerificationEmail') || '';
  const navigate = useNavigate();
  
  // Function to try to open the user's email client
  const openEmailClient = () => {
    // Try to extract domain from email to guess which email service to open
    if (pendingEmail) {
      const domain = pendingEmail.split('@')[1]?.toLowerCase();
      
      if (domain?.includes('gmail')) {
        window.open('https://mail.google.com', '_blank');
      } else if (domain?.includes('outlook') || domain?.includes('hotmail')) {
        window.open('https://outlook.live.com', '_blank');
      } else if (domain?.includes('yahoo')) {
        window.open('https://mail.yahoo.com', '_blank');
      } else {
        // Generic webmail access attempt
        window.open(`https://${domain}`, '_blank');
      }
    }
  };
  
  return (
    <div className="text-center space-y-6">
      <div className="bg-amber-100/20 p-4 rounded-lg border border-amber-200/30">
        <h2 className="text-2xl font-playfair font-semibold tracking-tight text-white mb-3">
          Un paso más para completar tu registro
        </h2>
        
        <p className="text-white mb-4">
          Te hemos enviado un correo a <span className="font-bold">{pendingEmail}</span> para verificar tu cuenta.
          Por favor revisa tu bandeja de entrada y haz clic en el enlace de verificación.
        </p>
        
        <Button 
          onClick={openEmailClient}
          className="w-full button-effect glass-card bg-white/10 hover:bg-white/20 text-white border border-cosmos-gold/30"
        >
          <Mail className="mr-2 h-5 w-5" />
          Ir a mi correo
        </Button>
        
        <div className="mt-4">
          <Button
            onClick={() => navigate('/home')}
            variant="link"
            className="text-white hover:text-cosmos-gold"
          >
            Continuar a mi perfil sin verificar ahora
          </Button>
        </div>
      </div>
    </div>
  );
};

const OnboardingSteps = () => {
  const { currentStep, totalSteps } = useOnboarding();
  
  return (
    <>
      {currentStep === 1 && <Step1BirthInfo />}
      {currentStep === 2 && <Step2Purpose />}
      {currentStep === 3 && <Step3TarotCard />}
      {currentStep === 4 && <Step4Interests />}
      {currentStep === 5 && <Step5Theme />}
      {currentStep > totalSteps && <VerificationReminder />}
    </>
  );
};

const OnboardingProgress = () => {
  const { currentStep, totalSteps } = useOnboarding();
  
  // Don't show progress bar if we're past all steps
  if (currentStep > totalSteps) return null;
  
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white">Paso {currentStep} de {totalSteps}</span>
        <span className="text-sm text-white">{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-cosmos-gold transition-all duration-300 ease-in-out" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const OnboardingContent = () => {
  const navigate = useNavigate();
  const { currentStep, goToNextStep } = useOnboarding();
  
  // Complete the onboarding process
  useEffect(() => {
    const pendingEmail = localStorage.getItem('pendingVerificationEmail');
    if (!pendingEmail) {
      navigate('/auth');
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <StarryBackground />
      <BackgroundImage 
        backgroundImageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        usePlainBackground={false}
      >
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10">
          <div className="w-full max-w-md mx-auto">
            <OnboardingProgress />
            
            <div className="glass-card p-6 rounded-xl overflow-hidden bg-black/50 backdrop-blur-md">
              <OnboardingSteps />
            </div>
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
};

const Onboarding = () => {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
};

export default Onboarding;
