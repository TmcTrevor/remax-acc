"use client";

import { useEffect, useState } from "react";
import bg from "@/i/Images/slidingImage.jpg";

const LatestBelizeVideos = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center pt-[80px] md:pt-[200px] w-full">
        <h1 className="text-2xl md:text-4xl px-12 mb-12 lg:px-0lg:text-6xl font-bold">
          Latest Belize Videos
        </h1>
      </div>
      <section
        className="relative w-full h-[600px] overflow-hidden"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPositionY: `${offsetY * 0.01}px`, // Smooth parallax effect
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
          style={{
            opacity: offsetY > 100 ? 1 : 0, // Fade-in effect on scroll
            transform: offsetY > 100 ? "translateY(0)" : "translateY(10px)",
          }}>
          <h1 className="text-5xl font-bold">Latest Belize Videos</h1>
          <p className="mt-4 text-lg">
            Explore beautiful Belize through our curated video collection.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LatestBelizeVideos;
