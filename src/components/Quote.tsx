
import React, { useState, useEffect } from 'react';

const quotes = [
  "Lo que buscás afuera, ya está escrito en tus estrellas.",
  "Tu destino es un diálogo entre el cielo y vos.",
  "El tarot te muestra el camino, vos elegís cómo caminarlo.",
  "Cada carta es un espejo de tu alma.",
  "Las estrellas trazan el mapa, tu corazón elige el rumbo.",
  "Hoy el universo tiene un mensaje para vos.",
  "Escuchá lo que el cielo quiere contarte.",
  "Tus ciclos, tus lunas, tus caminos.",
  "La magia sucede cuando te alineás con vos misma.",
  "Tu historia escrita en las estrellas y reflejada en las cartas.",
  "Abrí el portal y descubrí tu destino.",
  "Cada signo, un secreto. Cada carta, una llave.",
  "Tu carta del día te espera.",
  "El universo conspira cuando te escuchás.",
  "Cielo, tarot y energía. Todo en un mismo lugar.",
  "El horóscopo es la brújula, el tarot es el mapa.",
  "Cuando las estrellas hablan, el alma responde.",
  "Tu energía cambia cada día, conocela.",
  "Cada fase lunar es un ciclo dentro tuyo.",
  "Tu carta natal es el contrato sagrado entre vos y el universo."
];

const Quote: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setIsChanging(false);
      }, 500);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative h-16 sm:h-20 flex items-center justify-center overflow-hidden px-6">
      <p 
        className={`text-center text-sm sm:text-base md:text-lg italic font-nunito text-cosmos-gold
                    transition-all duration-500 ease-in-out
                    ${isChanging ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'}`}
      >
        &ldquo;{quotes[currentQuoteIndex]}&rdquo;
      </p>
    </div>
  );
};

export default Quote;
