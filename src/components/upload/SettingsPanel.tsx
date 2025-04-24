
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { ChevronDown } from "lucide-react";

export const SettingsPanel: React.FC = () => {
  const [callouts, setCallouts] = useState(8);

  const handleIncrement = () => {
    if (callouts < 10) {
      setCallouts(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (callouts > 3) {
      setCallouts(prev => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-[70px] bg-black px-8">
      <div className="flex items-center gap-6">
        <span className="text-white text-base font-medium">Number<br/>of Callouts</span>
        <div className="flex items-center gap-4">
          <button 
            className={`text-white hover:text-white/80 transition-colors ${
              callouts <= 3 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleDecrement}
            disabled={callouts <= 3}
          >
            <Minus size={24} />
          </button>
          <span className="text-white text-3xl font-medium tabular-nums">{callouts.toString().padStart(2, '0')}</span>
          <button 
            className={`text-white hover:text-white/80 transition-colors ${
              callouts >= 10 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleIncrement}
            disabled={callouts >= 10}
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <span className="text-white text-base font-medium">Style<br/>of Callouts</span>
        <select className="appearance-none bg-[#2C2C2C] text-white text-base px-6 py-2 pr-10 rounded-lg border-none outline-none cursor-pointer hover:bg-[#3C3C3C] transition-colors min-w-[180px]">
          <option value="ux">UX Critique</option>
          <option value="design">Design Critique</option>
          <option value="recommendations">Recommendations</option>
          <option value="ideas">Ideas</option>
        </select>
        <ChevronDown className="absolute right-12 text-white pointer-events-none" size={20} />
      </div>
    </div>
  );
};
