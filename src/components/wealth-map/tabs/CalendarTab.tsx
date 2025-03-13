
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CalendarTabProps {
  fullAnalysis: any;
}

const CalendarTab: React.FC<CalendarTabProps> = ({ fullAnalysis }) => {
  const formatCalendarDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long'
    };
    
    try {
      return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-cosmos-gold">Calendario Financiero</h3>
      <p className="text-xs italic mb-4">Fechas clave para tomar decisiones económicas en los próximos meses</p>
      
      <ScrollArea className="max-h-[400px] pr-2">
        <div className="space-y-3">
          {fullAnalysis.financialCalendar.map((entry: any, index: number) => (
            <div key={index} className="bg-cosmos-pink/10 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium text-cosmos-darkGold">
                  {formatCalendarDate(entry.date)}
                </h4>
                <span className="text-xs bg-yellow-500/20 px-2 py-0.5 rounded-full text-yellow-700">
                  {entry.transitType}
                </span>
              </div>
              <p className="text-xs">{entry.recommendation}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CalendarTab;
