import React, { useCallback, useState, useEffect } from "react";
import { UploadIcon } from "./UploadIcon";
import { SettingsPanel } from "./SettingsPanel";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { analyzeImage } from "../../services/geminiService";
import type { GeminiAuditResponse } from "./SettingsPanel";
import Confetti from 'react-confetti';

export const UploadSection: React.FC = () => {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showAuditSummary, setShowAuditSummary] = useState<boolean>(false);
  const [callouts, setCallouts] = useState(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<GeminiAuditResponse | { error: string } | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setShowAuditSummary(false);
      setCallouts(3);
      setApiResponse(null);
      setShowConfetti(false);
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
    setShowAuditSummary(false);
    setCallouts(3);
    setApiResponse(null);
    setShowConfetti(false);
  };

  const handleAwwwditClick = async () => {
    if (!uploadedImage) return;

    setIsLoading(true);
    setShowAuditSummary(true);
    setApiResponse(null);
    setShowConfetti(false);

    try {
      const data = await analyzeImage(uploadedImage, callouts);
      setApiResponse(data);
      setShowConfetti(true);

      toast({
        title: "Audit Complete!",
        description: "The AI has analyzed your image.",
        duration: 3000,
      });

      setTimeout(() => setShowConfetti(false), 7000);

    } catch (error) {
      console.error("Error calling analyzeImage service:", error);
      let errorMessage = "Failed to get audit summary.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setApiResponse({ error: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrementCallouts = () => {
    if (callouts < 10) {
      setCallouts(prev => prev + 1);
    }
  };

  const handleDecrementCallouts = () => {
    if (callouts > 1) {
      setCallouts(prev => prev - 1);
    }
  };

  const wrapperClasses = showAuditSummary 
    ? "w-full flex flex-col items-center"
    : "pt-[100px] pb-[100px] mb-[100px] w-full flex flex-col items-center";

  return (
    <div className={wrapperClasses}>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} />}
      {uploadedImage ? (
        <div className="flex flex-col items-center">
          <div className={`flex flex-col w-[630px] ${showAuditSummary ? 'h-auto max-h-[2000px]' : 'h-[370px] max-h-[370px]'} bg-[#6D0E10] rounded-[20px] max-md:w-4/5 max-sm:w-[90%] overflow-hidden transition-all duration-500 ease-in-out`}>
            <div className="relative w-full h-[310px] flex items-center justify-center pt-5">
              <div className="w-56 bg-white p-4 rounded-[20px] rotate-[-3.3deg] shadow-2xl">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded screenshot" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handleClose}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-black/90 rounded-full flex items-center justify-center hover:bg-black transition-colors z-20"
                  aria-label="Close preview"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>
            <div className="w-full">
              <SettingsPanel 
                showAuditSummary={showAuditSummary} 
                callouts={callouts} 
                onIncrementCallouts={handleIncrementCallouts}
                onDecrementCallouts={handleDecrementCallouts}
                isLoading={isLoading} 
                apiResponse={apiResponse}
              />
            </div>
          </div>
          <Button 
            className="mt-4 bg-[#0C0B0A] text-white font-medium px-[32px] py-[17px] rounded-[32px]"
            onClick={handleAwwwditClick}
            disabled={isLoading}
          >
            {isLoading ? "Awwwditing..." : "Awwwdit now"}
          </Button>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center w-[630px] h-[370px] relative bg-[#6D0E10] rounded-[20px] max-md:w-4/5 max-sm:w-[90%] overflow-hidden mx-auto"
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
        </div>
      )}
    </div>
  );
};
