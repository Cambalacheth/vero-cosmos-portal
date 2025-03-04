
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { CalendarDays, ChevronLeft, ChevronRight, Moon, Info } from 'lucide-react';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';
import { format, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

// Lunar phases data (simplified example)
const lunarPhases = [
  { date: new Date(2023, 9, 5), phase: 'Nueva', icon: '🌑' },
  { date: new Date(2023, 9, 12), phase: 'Creciente', icon: '🌓' },
  { date: new Date(2023, 9, 19), phase: 'Llena', icon: '🌕' },
  { date: new Date(2023, 9, 26), phase: 'Menguante', icon: '🌗' },
];

// Astrological events (simplified example)
const astroEvents = [
  { date: new Date(2023, 9, 8), event: 'Venus entra en Libra', icon: '♀️' },
  { date: new Date(2023, 9, 14), event: 'Mercurio Retrógrado termina', icon: '☿️' },
  { date: new Date(2023, 9, 22), event: 'Sol entra en Escorpio', icon: '☉' },
];

// Custom day rendering for the calendar
const getCustomDayContent = (day: Date) => {
  const lunarEvent = lunarPhases.find(event => 
    event.date.getDate() === day.getDate() && 
    event.date.getMonth() === day.getMonth() && 
    event.date.getFullYear() === day.getFullYear()
  );
  
  const astroEvent = astroEvents.find(event => 
    event.date.getDate() === day.getDate() && 
    event.date.getMonth() === day.getMonth() && 
    event.date.getFullYear() === day.getFullYear()
  );

  return (
    <div className="flex flex-col items-center">
      <div>{day.getDate()}</div>
      {lunarEvent && <div className="text-xs">{lunarEvent.icon}</div>}
      {astroEvent && <div className="text-xs">{astroEvent.icon}</div>}
    </div>
  );
};

const Calendar = () => {
  const [loaded, setLoaded] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  };

  const handleDayClick = (day: Date) => {
    // Find events for the selected day
    const lunarEvent = lunarPhases.find(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth()
    );
    
    const astroEvent = astroEvents.find(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth()
    );

    setSelectedEvent({ 
      date: day, 
      lunar: lunarEvent, 
      astro: astroEvent 
    });
  };

  const eventsForToday = () => {
    const today = new Date();
    const lunar = lunarPhases.find(event => 
      event.date.getDate() === today.getDate() && 
      event.date.getMonth() === today.getMonth()
    );
    
    const astro = astroEvents.find(event => 
      event.date.getDate() === today.getDate() && 
      event.date.getMonth() === today.getMonth()
    );

    return { lunar, astro };
  };

  const { lunar: todayLunar, astro: todayAstro } = eventsForToday();

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={false} usePlainBackground={true}>
        <div className="container mx-auto px-4 py-6">
          <div 
            className={`w-full transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-2xl text-center font-playfair font-semibold mb-6 clip-text">Agenda Cósmica</h2>
            
            {/* Today's cosmic weather */}
            <div className="glass-card p-4 mb-6 rounded-xl">
              <div className="flex items-center mb-2">
                <CalendarDays size={18} className="text-cosmos-darkGold mr-2" />
                <h3 className="text-lg font-playfair text-cosmos-darkGold">Hoy: {format(new Date(), 'd MMMM, yyyy', { locale: es })}</h3>
              </div>
              
              <div className="flex space-x-2 mb-2">
                <Moon size={16} className="text-cosmos-darkGold" />
                <p className="text-sm">
                  {todayLunar ? `Luna ${todayLunar.phase} ${todayLunar.icon}` : 'Luna en tránsito'}
                </p>
              </div>
              
              {todayAstro && (
                <div className="flex space-x-2">
                  <Info size={16} className="text-cosmos-darkGold" />
                  <p className="text-sm">{todayAstro.event} {todayAstro.icon}</p>
                </div>
              )}
              
              <p className="text-sm italic mt-3">
                "Buen día para la meditación y conectar con tu intuición."
              </p>
            </div>
            
            {/* Calendar section */}
            <div className="glass-card p-4 rounded-xl mb-6">
              <div className="flex justify-between items-center mb-3">
                <button onClick={handlePreviousMonth} className="p-1 glass-card rounded-full">
                  <ChevronLeft size={18} className="text-cosmos-darkGold" />
                </button>
                <h3 className="text-lg font-playfair text-cosmos-darkGold">
                  {format(currentMonth, 'MMMM yyyy', { locale: es })}
                </h3>
                <button onClick={handleNextMonth} className="p-1 glass-card rounded-full">
                  <ChevronRight size={18} className="text-cosmos-darkGold" />
                </button>
              </div>
              
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(date) => {
                  if (date) {
                    setDate(date);
                    handleDayClick(date);
                  }
                }}
                month={currentMonth}
                className="rounded-md border-none"
              />
            </div>
            
            {/* Legend */}
            <div className="glass-card p-4 rounded-xl mb-6">
              <h3 className="text-lg font-playfair text-cosmos-darkGold mb-2">Leyenda</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <span className="mr-2">🌑</span>
                  <span className="text-sm">Luna Nueva</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🌓</span>
                  <span className="text-sm">Cuarto Creciente</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🌕</span>
                  <span className="text-sm">Luna Llena</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🌗</span>
                  <span className="text-sm">Cuarto Menguante</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">♀️</span>
                  <span className="text-sm">Venus</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">☿️</span>
                  <span className="text-sm">Mercurio</span>
                </div>
              </div>
            </div>
            
            {/* Selected day details */}
            {selectedEvent && (
              <div className="glass-card p-4 rounded-xl mb-6">
                <h3 className="text-lg font-playfair text-cosmos-darkGold mb-2">
                  {format(selectedEvent.date, 'd MMMM, yyyy', { locale: es })}
                </h3>
                
                {selectedEvent.lunar && (
                  <div className="mb-2 flex space-x-2">
                    <span>{selectedEvent.lunar.icon}</span>
                    <p className="text-sm">Luna {selectedEvent.lunar.phase}</p>
                  </div>
                )}
                
                {selectedEvent.astro && (
                  <div className="mb-2 flex space-x-2">
                    <span>{selectedEvent.astro.icon}</span>
                    <p className="text-sm">{selectedEvent.astro.event}</p>
                  </div>
                )}
                
                {!selectedEvent.lunar && !selectedEvent.astro && (
                  <p className="text-sm italic">No hay eventos cósmicos registrados para este día.</p>
                )}
                
                <button className="w-full mt-3 button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink">
                  Añadir Ritual Personal
                </button>
              </div>
            )}
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default Calendar;
