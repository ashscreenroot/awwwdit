
import React from "react";
import { Header } from "@/components/layout/Header";
import { BottomBar } from "@/components/layout/BottomBar";
import { UploadSection } from "@/components/upload/UploadSection";

const Index: React.FC = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
      />
      <main className="max-w-none flex flex-col items-center justify-center w-full h-screen relative bg-[#D72226] mx-auto max-md:max-w-[991px] max-sm:max-w-screen-sm pt-[50px]">
        <Header />
        <UploadSection />
        <BottomBar />
      </main>
    </>
  );
};

export default Index;
