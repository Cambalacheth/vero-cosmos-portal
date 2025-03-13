
import React, { createContext, useContext, useState } from 'react';

// Tipos para los datos que recolectamos en el onboarding
export type OnboardingData = {
  // Paso 1: Datos para la Carta Astral
  birthDate: string | null;
  birthTime: string | null;
  birthPlace: string | null;
  knowsBirthTime: 'yes' | 'approximate' | 'no' | null;
  
  // Paso 2: Propósito y Expectativas
  reasons: string[];
  
  // Paso 3: Tarot
  selectedCard: string | null;
  
  // Paso 4: Áreas de Interés
  interests: string[];
  
  // Paso 5: Personalización Estética
  theme: string;
  darkMode: boolean;
};

type OnboardingContextType = {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  totalSteps: number;
};

const defaultData: OnboardingData = {
  birthDate: null,
  birthTime: null,
  birthPlace: null,
  knowsBirthTime: null,
  reasons: [],
  selectedCard: null,
  interests: [],
  theme: 'cosmic-blue',
  darkMode: true,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prevData => ({ ...prevData, ...newData }));
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  return (
    <OnboardingContext.Provider value={{
      data,
      updateData,
      currentStep,
      goToNextStep,
      goToPreviousStep,
      goToStep,
      totalSteps
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
