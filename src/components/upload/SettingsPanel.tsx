import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { ChevronDown } from "lucide-react";

export const SettingsPanel: React.FC = () => {
  const [callouts, setCallouts] = useState(3);

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
    <div className="flex items-center justify-between w-full h-[60px] bg-black px-6 rounded-b-[20px] rounded-tr-none rounded-tl-none transform transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <span className="text-[#8B8B8B] text-sm">Number of Callouts</span>
        <div className="flex items-center gap-4">
          <button 
            className={`text-[#8B8B8B] hover:text-white transition-colors ${
              callouts <= 3 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleDecrement}
            disabled={callouts <= 3}
          >
            <Minus size={20} />
          </button>
          <span className="text-white text-lg font-medium">{callouts.toString().padStart(2, '0')}</span>
          <button 
            className={`text-[#8B8B8B] hover:text-white transition-colors ${
              callouts >= 10 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleIncrement}
            disabled={callouts >= 10}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4 relative">
        <span className="text-[#8B8B8B] text-sm">Style of Callouts</span>
        <select className="appearance-none bg-[#2C2C2C] text-white text-sm px-4 py-1.5 pr-8 rounded-lg border-none outline-none cursor-pointer hover:bg-[#3C3C3C] transition-colors min-w-[160px]">
          <option value="design">Design Critique</option>
          <option value="recommendations">Recommendations</option>
          <option value="ideas">Ideas</option>
          <option value="ux">UX Principals</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" size={16} />
      </div>
    </div>
  );
};
