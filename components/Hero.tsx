"use client";

import { heroContent } from "@/data/content";
import { useEffect, useState } from "react";

export default function Hero() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, "0");
      setCurrentTime(`${displayHours}:${displayMinutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <div className="mb-8">
          <p className="text-6xl md:text-8xl font-bold mb-4">{currentTime}</p>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {heroContent.headline1}
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          {heroContent.headline2}
        </h2>
        <p className="text-xl md:text-2xl mb-4">{heroContent.services}</p>
        <p className="text-lg md:text-xl text-gray-600">{heroContent.bio}</p>
      </div>
    </section>
  );
}
