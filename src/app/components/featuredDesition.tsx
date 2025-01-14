"use client";

import Image from "next/image";
import destination1 from "@/i/Images/gallery/destination-1.jpg";
import destination2 from "@/i/Images/gallery/destination-2.jpg";
import destination3 from "@/i/Images/gallery/destination-3.jpg";
import destination4 from "@/i/Images/gallery/destination-4.jpg";
import destination5 from "@/i/Images/gallery/destination-5.jpg";
import destination6 from "@/i/Images/gallery/destination-6.jpg";

const FeaturedDestination = () => {
  // const destinations = [
  //   { title: "Ambergris Caye", image: destination1 },
  //   { title: "Belize City", image: destination2 },
  //   { title: "Belmopan", image: destination3 },
  //   { title: "Caye Caulker", image: destination4 },
  //   { title: "Corozal", image: destination5 },
  //   { title: "Hopkins", image: destination6 },
  // ];

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center pt-[80px] md:pt-[100px] pb-[40px] md:pb-[80px] w-full">
        <h1 className="text-2xl md:text-4xl lg:text-6xl text-mainColor font-bold">
          Explore Locations
        </h1>
        <h1 className="text-3xl md:text-6xl lg:text-8xl text-secondaryColor font-bold">
          Belize Property
        </h1>
      </div>

      {/* Destinations Mosaic Grid */}
      <div className="grid grid-cols-1  md:grid-cols-7 gap-0 w-full">
        {/* Row 1 */}
        <div className="md:col-span-3 h-[300px] sm:h-[400px] relative group overflow-hidden">
          <Image
            src={destination1}
            alt="Ambergris Caye"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center pb-3">
            <h2 className="text-white text-3xl font-bold">Ambergris Caye</h2>
          </div>
        </div>

        <div className="md:col-span-2 h-[300px] sm:h-[400px] relative group overflow-hidden">
          <Image
            src={destination2}
            alt="Belize City"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center pb-3">
            <h2 className="text-white text-3xl font-bold">Belize City</h2>
          </div>
        </div>

        <div className="md:col-span-2 h-[300px] sm:h-[400px] relative group overflow-hidden">
          <Image
            src={destination3}
            alt="Belmopan"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center pb-3">
            <h2 className="text-white text-3xl font-bold">Belmopan</h2>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1  md:grid-cols-6 gap-0 w-full">
        <div className="md:col-span-2 h-[300px] md:h-[500px] w-full  relative group overflow-hidden">
          <Image
            src={destination4}
            alt="Caye Caulker"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center pb-3">
            <h2 className="text-white text-3xl font-bold">Caye Caulker</h2>
          </div>
        </div>
        <div className="md:col-span-2 h-[300px] md:h-[500px] w-full  relative group overflow-hidden">
          <Image
            src={destination5}
            alt="Corozal"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center pb-3">
            <h2 className="text-white text-3xl font-bold">Corozal</h2>
          </div>
        </div>
        <div className="md:col-span-2 h-[300px] md:h-[500px] w-full relative group overflow-hidden">
          <Image
            src={destination6}
            alt="Hopkins"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center pb-3">
            <h2 className="text-white text-3xl font-bold">Hopkins</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDestination;
