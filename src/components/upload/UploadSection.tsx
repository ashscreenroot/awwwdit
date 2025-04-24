
import React, { useCallback, useState } from "react";
import { UploadIcon } from "./UploadIcon";
import { SettingsPanel } from "./SettingsPanel";

export const UploadSection: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    // Handle file upload logic here
    console.log("Files dropped:", files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      // Handle file upload logic here
      console.log("Files selected:", files);
    };
    input.click();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center w-[630px] relative bg-[#6D0E10] rounded-[20px] max-md:w-4/5 max-sm:w-[90%] overflow-hidden"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex flex-col items-center gap-6 w-full px-4 py-[115px]">
        <button
          onClick={handleClick}
          className="flex justify-center items-center w-14 h-14 bg-[#0C0B0A] rounded-[50%] hover:bg-opacity-90 transition-colors"
          aria-label="Upload screenshot"
        >
          <UploadIcon />
        </button>
        <div className="flex flex-col items-center gap-2">
          <span className="font-bold text-2xl text-white text-center max-md:text-xl max-sm:text-lg">
            Upload a screenshot
          </span>
          <span className="font-normal text-base text-white/90 text-center max-md:text-sm max-sm:text-xs">
            Web or mobile, any screen you've got
          </span>
        </div>
      </div>
      
      <div 
        className="absolute bottom-0 w-full"
        onMouseEnter={() => setShowSettings(true)}
        onMouseLeave={() => setShowSettings(false)}
      >
        <div 
          className={`transform transition-all duration-300 ease-in-out ${
            showSettings 
              ? "translate-y-0 opacity-100" 
              : "translate-y-full opacity-0"
          }`}
        >
          <div className="w-10 h-1.5 mx-auto bg-black rounded-[20px] hover:bg-opacity-80 transition-all duration-300 cursor-pointer max-md:w-[30px] max-md:h-[5px] max-sm:w-5 max-sm:h-1 mb-2" />
          <SettingsPanel />
        </div>

        {!showSettings && (
          <div className="w-10 h-1.5 mx-auto bg-black rounded-[20px] hover:bg-opacity-80 transition-all duration-300 cursor-pointer max-md:w-[30px] max-md:h-[5px] max-sm:w-5 max-sm:h-1 mb-2" />
        )}
      </div>
    </div>
  );
};

