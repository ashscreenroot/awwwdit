
import React from "react";
import { ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";

export const SettingsPanel: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-full h-[60px] bg-black px-6 rounded-b-[20px]">
      <div className="flex items-center gap-4">
        <span className="text-[#8B8B8B] text-sm">Number of Callouts</span>
        <div className="flex items-center gap-4">
          <button className="text-[#8B8B8B] hover:text-white transition-colors">
            <Minus size={20} />
          </button>
          <span className="text-white text-lg font-medium">08</span>
          <button className="text-[#8B8B8B] hover:text-white transition-colors">
            <Plus size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-[#8B8B8B] text-sm">Style of Callouts</span>
        <select className="bg-[#2C2C2C] text-white text-sm px-4 py-1.5 rounded-lg border-none outline-none appearance-none cursor-pointer hover:bg-[#3C3C3C] transition-colors min-w-[120px]">
          <option>UX Critique</option>
        </select>
      </div>
    </div>
  );
};
