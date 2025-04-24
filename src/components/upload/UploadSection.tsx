
import React, { useCallback, useState } from "react";
import { UploadIcon } from "./UploadIcon";
import { SettingsPanel } from "./SettingsPanel";
import { X } from "lucide-react";

export const UploadSection: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleImageUpload(files);
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
      handleImageUpload(files);
    };
    input.click();
  }, []);

  const handleClose = () => {
    setUploadedImage(null);
  };

  if (uploadedImage) {
    return (
      <div className="flex flex-col items-center w-[630px] h-[370px] relative bg-[#6D0E10] rounded-[20px] max-md:w-4/5 max-sm:w-[90%] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] bg-white p-4 rounded-[20px] rotate-[-3.3deg] shadow-2xl mt-[20px]">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
            <img 
              src={uploadedImage} 
              alt="Uploaded screenshot" 
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/90 rounded-full flex items-center justify-center hover:bg-black transition-colors"
            aria-label="Close preview"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <SettingsPanel />
        </div>
      </div>
    );
  }

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
