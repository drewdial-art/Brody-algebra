import React from 'react';
import { Rocket, Flame } from 'lucide-react';

interface RocketDisplayProps {
  fuelLevel: number;
  isLaunched: boolean;
  stageColor: string;
}

export const RocketDisplay: React.FC<RocketDisplayProps> = ({ fuelLevel, isLaunched, stageColor }) => {
  return (
    <div className="relative h-full min-h-[300px] w-full max-w-xs mx-auto flex flex-col items-center justify-end bg-gray-900/50 rounded-xl border border-gray-700 p-4 overflow-hidden shadow-inner">
      
      {/* Stars Background Effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
        <div className="absolute bottom-32 left-1/2 w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
      </div>

      {/* Fuel Tank UI */}
      <div className="absolute left-4 top-4 bottom-4 w-4 bg-gray-800 rounded-full overflow-hidden border border-gray-600 z-10">
        <div 
          className={`absolute bottom-0 w-full transition-all duration-1000 ease-out ${fuelLevel > 80 ? 'bg-green-500' : 'bg-orange-500'}`}
          style={{ height: `${fuelLevel}%` }}
        />
      </div>
      <div className="absolute left-10 top-4 text-xs font-mono text-gray-400">FUEL</div>

      {/* Rocket Container */}
      <div className={`relative z-20 transition-all duration-[2000ms] ease-in-out ${isLaunched ? '-translate-y-[600px]' : 'translate-y-0'}`}>
        <Rocket 
          size={120} 
          className={`text-gray-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-colors duration-500`} 
          fill={isLaunched ? "#e5e7eb" : "#1f2937"}
        />
        
        {/* Main Engine Flame */}
        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 ${isLaunched ? 'opacity-100' : (fuelLevel > 0 ? 'opacity-30' : 'opacity-0')}`}>
           <Flame size={60} className="text-orange-500 animate-bounce" fill="orange" />
           {isLaunched && <Flame size={80} className="text-yellow-400 absolute top-2 animate-ping" fill="yellow" />}
        </div>
      </div>

      {/* Launch Pad */}
      <div className="absolute bottom-0 w-32 h-2 bg-gray-600 rounded-full blur-[2px]"></div>
      
      {isLaunched && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
             <div className="text-4xl font-black text-white italic animate-ping">BLAST OFF!</div>
        </div>
      )}
    </div>
  );
};
