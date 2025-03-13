
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import StarryBackground from '../components/StarryBackground';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';

import Step1BirthInfo from '@/components/onboarding/Step1BirthInfo';
import Step2Purpose from '@/components/onboarding/Step2Purpose';
import Step3TarotCard from '@/components/onboarding/Step3TarotCard';
import Step4Interests from '@/components/onboarding/Step4Interests';
import Step5Theme from '@/components/onboarding/Step5Theme';

const OnboardingSteps = () => {
  const { currentStep } = useOnboarding();
  
  return (
    <>
      {currentStep === 1 && <Step1BirthInfo />}
      {currentStep === 2 && <Step2Purpose />}
      {currentStep === 3 && <Step3TarotCard />}
      {currentStep === 4 && <Step4Interests />}
      {currentStep === 5 && <Step5Theme />}
    </>
  );
};

const OnboardingProgress = () => {
  const { currentStep, totalSteps } = useOnboarding();
  
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-cosmos-darkGold">Paso {currentStep} de {totalSteps}</span>
        <span className="text-sm text-cosmos-darkGold">{Math.round((currentStep / totalSteps) * 100)}%</span>
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
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !session) {
      navigate('/auth');
    }
  }, [loading, session, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cosmos-gold"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <StarryBackground />
      <BackgroundImage 
        backgroundImageUrl="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1413&q=80"
        usePlainBackground={false}
      >
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10">
          <div className="w-full max-w-md mx-auto">
            <OnboardingProgress />
            
            <div className="glass-card p-6 rounded-xl overflow-hidden">
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
