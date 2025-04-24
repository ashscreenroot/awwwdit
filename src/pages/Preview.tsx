
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomBar } from "@/components/layout/BottomBar";
import { X } from "lucide-react";
import { SettingsPanel } from "@/components/upload/SettingsPanel";

const Preview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
      />
      <main className="max-w-none flex flex-col items-center justify-center w-full h-screen relative bg-[#D72226] mx-auto max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <Header />
        <div className="flex flex-col items-center w-[630px] relative bg-[#6D0E10] rounded-[20px] max-md:w-4/5 max-sm:w-[90%] overflow-hidden">
          <div className="relative w-full bg-white p-4 rounded-t-[20px]">
            <div className="relative w-full bg-[#F2FCE2] aspect-video rounded-lg overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No image available
                </div>
              )}
            </div>
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-8 h-8 bg-black/90 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors"
              aria-label="Close preview"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
          <SettingsPanel />
        </div>
        <BottomBar />
      </main>
    </>
  );
};

export default Preview;
