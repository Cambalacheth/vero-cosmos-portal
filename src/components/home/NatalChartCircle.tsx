
import React from 'react';
import { NatalChartData } from '@/lib/natal-chart';

interface NatalChartCircleProps {
  natalChart: NatalChartData;
  className?: string;
}

const NatalChartCircle: React.FC<NatalChartCircleProps> = ({ natalChart, className }) => {
  const planetPositions = [
    { key: 'sun', name: 'Sol', data: natalChart.sun, color: '#FFD700' },
    { key: 'moon', name: 'Luna', data: natalChart.moon, color: '#C0C0C0' },
    { key: 'mercury', name: 'Mercurio', data: natalChart.mercury, color: '#B87333' },
    { key: 'venus', name: 'Venus', data: natalChart.venus, color: '#E6E6FA' },
    { key: 'mars', name: 'Marte', data: natalChart.mars, color: '#FF4500' },
    { key: 'jupiter', name: 'Júpiter', data: natalChart.jupiter, color: '#DAA520' },
    { key: 'saturn', name: 'Saturno', data: natalChart.saturn, color: '#708090' },
    { key: 'uranus', name: 'Urano', data: natalChart.uranus, color: '#40E0D0' },
    { key: 'neptune', name: 'Neptuno', data: natalChart.neptune, color: '#9370DB' },
    { key: 'pluto', name: 'Plutón', data: natalChart.pluto, color: '#800000' },
  ];

  const zodiacSigns = [
    { sign: "Aries", color: "#FF5733", element: "Fuego" },
    { sign: "Tauro", color: "#C70039", element: "Tierra" },
    { sign: "Géminis", color: "#FFC300", element: "Aire" },
    { sign: "Cáncer", color: "#2ECC71", element: "Agua" },
    { sign: "Leo", color: "#FF5733", element: "Fuego" },
    { sign: "Virgo", color: "#C70039", element: "Tierra" },
    { sign: "Libra", color: "#FFC300", element: "Aire" },
    { sign: "Escorpio", color: "#2ECC71", element: "Agua" },
    { sign: "Sagitario", color: "#FF5733", element: "Fuego" },
    { sign: "Capricornio", color: "#C70039", element: "Tierra" },
    { sign: "Acuario", color: "#FFC300", element: "Aire" },
    { sign: "Piscis", color: "#2ECC71", element: "Agua" }
  ];

  // Calcular posición en el círculo
  const getPositionInCircle = (sign: string, degree: number, radius: number) => {
    const signIndex = zodiacSigns.findIndex(s => s.sign === sign);
    const anglePerSign = 30; // 360° / 12 signos = 30° por signo
    const totalAngle = (signIndex * anglePerSign) + (degree * anglePerSign / 30);
    const angleInRadians = (totalAngle - 90) * (Math.PI / 180); // -90 para comenzar en la parte superior
    
    return {
      x: radius * Math.cos(angleInRadians) + 150, // +150 para centrar en el SVG
      y: radius * Math.sin(angleInRadians) + 150
    };
  };

  return (
    <div className={`${className} flex flex-col items-center`}>
      <h3 className="text-lg font-medium mb-4 text-cosmos-gold text-center">Visualización de la Carta Natal</h3>
      
      <div className="relative w-[300px] h-[300px]">
        <svg width="300" height="300" viewBox="0 0 300 300" className="rotate-0">
          {/* Círculo exterior - signos zodiacales */}
          <circle cx="150" cy="150" r="145" fill="none" stroke="#DDD" strokeWidth="1" />
          
          {/* Líneas divisorias para los signos */}
          {zodiacSigns.map((_, index) => {
            const angle = index * 30;
            const radians = (angle - 90) * (Math.PI / 180);
            const x2 = 150 + 145 * Math.cos(radians);
            const y2 = 150 + 145 * Math.sin(radians);
            
            return (
              <line 
                key={`line-${index}`} 
                x1="150" 
                y1="150" 
                x2={x2} 
                y2={y2} 
                stroke="#DDD" 
                strokeWidth="0.5" 
              />
            );
          })}
          
          {/* Círculo para casas */}
          <circle cx="150" cy="150" r="115" fill="none" stroke="#AAA" strokeWidth="0.5" />
          
          {/* Círculo interior */}
          <circle cx="150" cy="150" r="85" fill="none" stroke="#888" strokeWidth="0.5" />
          
          {/* Etiquetas de signos zodiacales */}
          {zodiacSigns.map((sign, index) => {
            const angle = index * 30;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = 150 + 130 * Math.cos(radians);
            const y = 150 + 130 * Math.sin(radians);
            
            return (
              <text 
                key={`sign-${index}`} 
                x={x} 
                y={y} 
                textAnchor="middle" 
                dominantBaseline="middle"
                fontSize="10"
                fill={sign.color}
              >
                {sign.sign.substring(0, 3)}
              </text>
            );
          })}
          
          {/* Casas astrológicas */}
          {natalChart.houses.map((house, index) => {
            const position = getPositionInCircle(house.sign, house.degree, 100);
            
            return (
              <g key={`house-${index}`}>
                <text 
                  x={position.x} 
                  y={position.y} 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  fontSize="9"
                  fill="#FFF"
                  className="font-bold"
                >
                  {house.house}
                </text>
              </g>
            );
          })}
          
          {/* Planetas */}
          {planetPositions.map((planet, index) => {
            const position = getPositionInCircle(planet.data.sign, planet.data.degree, 65);
            
            return (
              <g key={`planet-${index}`}>
                <circle 
                  cx={position.x} 
                  cy={position.y} 
                  r="6" 
                  fill={planet.color} 
                  opacity="0.7"
                />
                <text 
                  x={position.x} 
                  y={position.y} 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  fontSize="8"
                  fill="#000"
                  fontWeight="bold"
                >
                  {planet.data.icon}
                </text>
              </g>
            );
          })}
          
          {/* Ascendente - destacado */}
          {(() => {
            const position = getPositionInCircle(natalChart.ascendant.sign, natalChart.ascendant.degree, 145);
            
            return (
              <g>
                <circle 
                  cx={position.x} 
                  cy={position.y} 
                  r="8" 
                  fill="#FFD700" 
                  opacity="0.9"
                />
                <text 
                  x={position.x} 
                  y={position.y} 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  fontSize="10"
                  fill="#000"
                  fontWeight="bold"
                >
                  ⬆️
                </text>
              </g>
            );
          })()}
        </svg>
      </div>
      
      <div className="mt-4 grid grid-cols-5 gap-2">
        {planetPositions.map((planet) => (
          <div key={planet.key} className="flex flex-col items-center">
            <div 
              className="w-4 h-4 rounded-full mb-1" 
              style={{ backgroundColor: planet.color }}
            ></div>
            <span className="text-xs">{planet.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NatalChartCircle;
