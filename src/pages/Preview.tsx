
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
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
      />
      <main className="max-w-none flex flex-col items-center justify-center w-full h-screen relative bg-[#D72226] mx-auto max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <Header />
        <div className="flex flex-col items-center w-[630px] relative bg-[#6D0E10] rounded-[20px] max-md:w-4/5 max-sm:w-[90%] overflow-hidden">
          <div className="relative w-full p-6">
            <div className="relative w-full bg-white p-5 rounded-[20px] transform rotate-[3.3deg] shadow-2xl">
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
                className="absolute top-4 right-4 w-8 h-8 bg-transparent hover:opacity-80 transition-opacity"
                aria-label="Close preview"
              >
                <X size={24} className="text-black" />
              </button>
            </div>
          </div>
          <SettingsPanel />
        </div>
        <BottomBar />
      </main>
    </>
  );
};

export default Preview;
