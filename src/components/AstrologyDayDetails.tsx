
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DailyAstrologyData, AstrologicalEvent } from '@/lib/astrology-service';
import { cn } from '@/lib/utils';

interface AstrologyDayDetailsProps {
  data: DailyAstrologyData;
}

const AstrologyDayDetails: React.FC<AstrologyDayDetailsProps> = ({ data }) => {
  if (!data) return null;

  const getEventClassName = (type: AstrologicalEvent['type']) => {
    switch (type) {
      case 'planetary': return 'border-indigo-200 bg-indigo-50 text-indigo-700';
      case 'zodiac': return 'border-amber-200 bg-amber-50 text-amber-700';
      case 'retrograde': return 'border-rose-200 bg-rose-50 text-rose-700';
      default: return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-playfair text-cosmos-darkGold mb-2">
        {format(data.date, 'd MMMM, yyyy', { locale: es })}
      </h3>
      
      {data.lunarPhase && (
        <div className="mb-3 p-3 border rounded-lg glass-card">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">{data.lunarPhase.icon}</span>
            <p className="font-medium">Luna {data.lunarPhase.phase}</p>
          </div>
          <p className="text-sm">{data.lunarPhase.description}</p>
        </div>
      )}
      
      {data.astroEvents.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-cosmos-darkGold">Eventos Astrológicos:</h4>
          {data.astroEvents.map((event, index) => (
            <div key={index} className={cn(
              "p-3 border rounded-lg flex items-start space-x-2",
              getEventClassName(event.type)
            )}>
              <span className="text-xl mt-0.5">{event.icon}</span>
              <div>
                <p className="font-medium">{event.event}</p>
                <p className="text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 p-3 glass-card rounded-lg">
        <h4 className="text-sm font-medium text-cosmos-darkGold mb-2">Recomendación del día:</h4>
        <p className="text-sm italic">{data.dailyMessage}</p>
      </div>
    </div>
  );
};

export default AstrologyDayDetails;
