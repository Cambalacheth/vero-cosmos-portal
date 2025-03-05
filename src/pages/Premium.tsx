
import React, { useState, useEffect } from 'react';
import { Lock, LucideHeartHandshake, GraduationCap, Timer, BookText, Sparkles, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';
import { toast } from '@/components/ui/use-toast';

interface PremiumFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  comingSoon?: boolean;
}

const Premium = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    setLoaded(true);
  }, []);

  const premiumFeatures: PremiumFeature[] = [
    {
      id: 'chart-comparison',
      title: 'Carta Natal Comparativa',
      description: 'Compara tu carta natal con la de otra persona para descubrir vuestra compatibilidad astrológica y potencial de relación.',
      icon: LucideHeartHandshake
    },
    {
      id: 'learning-center',
      title: 'Centro de Aprendizaje Avanzado',
      description: 'Accede a contenido educativo exclusivo sobre astrología avanzada, incluyendo videos, guías y tutoriales.',
      icon: GraduationCap
    },
    {
      id: 'meditation-timer',
      title: 'Temporizador de Meditación',
      description: 'Meditaciones guiadas basadas en las influencias astrológicas actuales, con música específica y ritmos de vibración sintonizados.',
      icon: Timer
    },
    {
      id: 'journal',
      title: 'Diario Astrológico',
      description: 'Lleva un registro de tus estados de ánimo y experiencias correlacionadas con eventos celestes para identificar patrones personales.',
      icon: BookText,
      comingSoon: true
    },
    {
      id: 'ai-insights',
      title: 'Análisis AI Personalizados',
      description: 'Interpretaciones más detalladas y personalizadas de tránsitos planetarios generadas por IA avanzada.',
      icon: Sparkles,
      comingSoon: true
    },
    {
      id: 'ad-free',
      title: 'Experiencia Sin Anuncios',
      description: 'Disfruta de una experiencia sin interrupciones publicitarias en toda la plataforma.',
      icon: Ban
    }
  ];

  const handleSubscribe = () => {
    toast({
      title: "Suscripción en proceso",
      description: "El sistema de pagos estará disponible próximamente.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={false}>
        <div className="container mx-auto px-4 py-6 pb-20">
          <div 
            className={`w-full transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-3xl text-center font-playfair font-semibold mb-6 clip-text">Vero Cosmos Premium</h2>
            <p className="text-center mb-8 max-w-2xl mx-auto">Desbloquea todo el potencial de tu camino astrológico con funciones exclusivas diseñadas para profundizar tu conexión con el cosmos.</p>
            
            {/* Pricing Toggle */}
            <div className="flex justify-center mb-8">
              <div className="glass-card p-1 rounded-full flex">
                <button 
                  className={`px-4 py-1.5 rounded-full text-sm flex items-center ${selectedPlan === 'monthly' ? 'bg-cosmos-pink bg-opacity-30 text-cosmos-darkGold' : 'text-gray-500'}`}
                  onClick={() => setSelectedPlan('monthly')}
                >
                  Mensual
                </button>
                <button 
                  className={`px-4 py-1.5 rounded-full text-sm flex items-center ${selectedPlan === 'yearly' ? 'bg-cosmos-pink bg-opacity-30 text-cosmos-darkGold' : 'text-gray-500'}`}
                  onClick={() => setSelectedPlan('yearly')}
                >
                  Anual <span className="ml-1 text-xs bg-cosmos-darkGold text-white px-1.5 py-0.5 rounded-full">-20%</span>
                </button>
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="glass-card p-6 rounded-xl mb-8 max-w-md mx-auto bg-gradient-to-r from-cosmos-gold/20 to-cosmos-darkGold/20 border border-cosmos-gold/30">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-playfair font-semibold text-cosmos-darkGold">Plan Premium</h3>
                <div className="mt-2">
                  {selectedPlan === 'monthly' ? (
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-bold">$9.99</span>
                      <span className="ml-1 text-sm">/mes</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center">
                        <span className="text-3xl font-bold">$95.90</span>
                        <span className="ml-1 text-sm">/año</span>
                      </div>
                      <span className="text-xs text-cosmos-darkGold">Equivalente a $7.99/mes</span>
                    </div>
                  )}
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {premiumFeatures.map(feature => (
                  <li key={feature.id} className="flex items-start">
                    <span className="flex-shrink-0 mt-1 text-cosmos-darkGold">✨</span>
                    <span className="ml-2">{feature.title}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={handleSubscribe}
                className="w-full button-effect px-4 py-6 bg-cosmos-darkGold/60 rounded-lg text-white border border-cosmos-gold/50 mt-2 h-auto"
              >
                Suscribirme Ahora
              </Button>
              <p className="text-xs text-center mt-3 opacity-70">Cancela en cualquier momento. Sin compromisos.</p>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {premiumFeatures.map(feature => (
                <div 
                  key={feature.id} 
                  className="glass-card p-4 rounded-xl relative overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]"
                >
                  {feature.comingSoon && (
                    <div className="absolute top-2 right-2 bg-cosmos-pink text-xs px-2 py-0.5 rounded-full text-cosmos-darkGold">
                      Próximamente
                    </div>
                  )}
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-cosmos-pink bg-opacity-20 flex items-center justify-center mr-3">
                      <feature.icon size={20} className="text-cosmos-darkGold" />
                    </div>
                    <h3 className="text-lg font-medium">{feature.title}</h3>
                  </div>
                  <p className="text-sm opacity-80">{feature.description}</p>
                </div>
              ))}
            </div>
            
            {/* FAQ Section */}
            <div className="glass-card p-6 rounded-xl mb-6">
              <h3 className="text-xl font-playfair text-cosmos-darkGold mb-4 text-center">Preguntas Frecuentes</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">¿Puedo cancelar mi suscripción en cualquier momento?</h4>
                  <p className="text-sm opacity-80">Sí, puedes cancelar tu suscripción Premium en cualquier momento. Seguirás teniendo acceso a las funciones Premium hasta el final del período de facturación.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">¿Cómo funciona la carta natal comparativa?</h4>
                  <p className="text-sm opacity-80">Nuestra herramienta de comparación analiza ambas cartas natales y proporciona un análisis detallado de compatibilidad en áreas como comunicación, valores, romance y desafíos potenciales.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">¿Qué incluye el Centro de Aprendizaje Avanzado?</h4>
                  <p className="text-sm opacity-80">Incluye tutoriales en video, artículos detallados y guías paso a paso sobre temas avanzados como progresiones secundarias, revoluciones solares y técnicas predictivas.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">¿Las meditaciones se actualizan regularmente?</h4>
                  <p className="text-sm opacity-80">Sí, añadimos nuevas meditaciones guiadas cada mes, sincronizadas con los tránsitos planetarios actuales y especialmente diseñadas para las fases lunares.</p>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="text-center">
              <Button 
                onClick={handleSubscribe}
                className="button-effect px-8 py-3 bg-cosmos-darkGold/60 rounded-lg text-white border border-cosmos-gold/50 mt-2 h-auto"
              >
                Comenzar Mi Viaje Premium
              </Button>
            </div>
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default Premium;
