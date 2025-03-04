
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { CalendarDays, ChevronLeft, ChevronRight, Moon, Info } from 'lucide-react';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';
import { format, addMonths, subMonths, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { getDailyAstrologyData } from '@/lib/astrology-service';
import AstrologyDayDetails from '@/components/AstrologyDayDetails';
import CelestialPositions from '@/components/CelestialPositions';

const Calendar = () => {
  const [loaded, setLoaded] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDayData, setSelectedDayData] = useState(getDailyAstrologyData(new Date()));
  const [todayData, setTodayData] = useState(getDailyAstrologyData(new Date()));

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
    setDate(day);
    setSelectedDayData(getDailyAstrologyData(day));
  };

  // Function to render the day cell with indicators
  const renderDay = (day: Date, selectedDay: Date) => {
    const dayAstro = getDailyAstrologyData(day);
    const hasLunarEvent = dayAstro.lunarPhase !== undefined;
    const hasAstroEvent = dayAstro.astroEvents.length > 0;
    const isSelected = isSameDay(day, selectedDay);
    
    return (
      <div className="relative h-full w-full">
        <div className={`${isSelected ? 'bg-primary' : ''} rounded-full h-7 w-7 flex items-center justify-center`}>
          {day.getDate()}
        </div>
        <div className="absolute -bottom-1 left-0 right-0 flex justify-center space-x-1">
          {hasLunarEvent && (
            <span className="block h-1 w-1 rounded-full bg-cosmos-gold animate-pulse-soft" />
          )}
          {hasAstroEvent && (
            <span className="block h-1 w-1 rounded-full bg-cosmos-pink animate-pulse-soft" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={false} usePlainBackground={true}>
        <div className="container mx-auto px-4 py-6 pb-20">
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
                  {todayData.lunarPhase ? `Luna ${todayData.lunarPhase.phase} ${todayData.lunarPhase.icon}` : 'Luna en tránsito'}
                </p>
              </div>
              
              {todayData.astroEvents.length > 0 && todayData.astroEvents.map((event, index) => (
                <div key={index} className="flex space-x-2 mb-1">
                  <Info size={16} className="text-cosmos-darkGold" />
                  <p className="text-sm">{event.event} {event.icon}</p>
                </div>
              ))}
              
              <p className="text-sm italic mt-3">
                {todayData.dailyMessage}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
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
                        handleDayClick(date);
                      }
                    }}
                    month={currentMonth}
                    className="rounded-md border-none"
                    components={{
                      Day: ({ day }) => renderDay(day, date)
                    }}
                  />
                </div>

                {/* Celestial Positions */}
                <CelestialPositions />
              </div>
              
              <div>
                {/* Selected day details */}
                <div className="glass-card p-4 rounded-xl mb-6">
                  <AstrologyDayDetails data={selectedDayData} />
                  
                  <button className="w-full mt-5 button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink">
                    Añadir Ritual Personal
                  </button>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="glass-card p-4 rounded-xl mb-6 mt-6">
              <h3 className="text-lg font-playfair text-cosmos-darkGold mb-2">Leyenda</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
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
                <div className="flex items-center">
                  <span className="mr-2">♂️</span>
                  <span className="text-sm">Marte</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">♃</span>
                  <span className="text-sm">Júpiter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default Calendar;
