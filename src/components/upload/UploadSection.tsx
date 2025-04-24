import React, { useCallback } from "react";
import { UploadIcon } from "./UploadIcon";

export const UploadSection: React.FC = () => {
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
      className="flex flex-col items-center justify-center w-[630px] h-[347px] relative max-md:w-4/5 max-md:h-auto max-sm:w-[90%] max-sm:h-auto"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex flex-col items-center gap-[18px] w-[248px] h-[117px] absolute top-[115px] max-md:w-[70%] max-md:h-auto max-sm:w-[90%] max-sm:h-auto">
        <button
          onClick={handleClick}
          className="flex justify-center items-center w-14 h-14 bg-[#0C0B0A] rounded-[50%] hover:bg-opacity-90 transition-colors"
          aria-label="Upload screenshot"
        >
          <UploadIcon />
        </button>
        <div className="flex flex-col items-center gap-[9px]">
          <span className="font-bold text-lg text-[#FBE9E9] text-center max-md:text-base max-sm:text-sm">
            Upload a screenshot
          </span>
          <span className="font-normal text-sm text-[#FBE9E9] text-center max-md:text-xs max-sm:text-[10px]">
            Web or mobile, any screen you've got
          </span>
        </div>
      </div>
      <div className="w-10 h-1.5 absolute bg-black rounded-[20px] top-[331px] bottom-[bar] max-md:w-[30px] max-md:h-[5px] max-sm:w-5 max-sm:h-1" />
    </div>
  );
};
