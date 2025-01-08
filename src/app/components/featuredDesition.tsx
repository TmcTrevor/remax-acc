"use client";

import Image from "next/image";
import destination1 from "@/i/Images/gallery/destination-1.jpg";
import destination2 from "@/i/Images/gallery/destination-2.jpg";
import destination3 from "@/i/Images/gallery/destination-3.jpg";
import destination4 from "@/i/Images/gallery/destination-4.jpg";
import destination5 from "@/i/Images/gallery/destination-5.jpg";
import destination6 from "@/i/Images/gallery/destination-6.jpg";

const FeaturedDestination = () => {
  const destinations = [
    { title: "Ambergris Caye", image: destination1 },
    { title: "Belize City", image: destination2 },
    { title: "Belmopan", image: destination3 },
    { title: "Caye Caulker", image: destination4 },
    { title: "Corozal", image: destination5 },
    { title: "Hopkins", image: destination6 },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center pt-[80px] md:pt-[200px] pb-[40px] md:pb-[80px] w-full">
        <h1 className="text-3xl text-mainColor font-bold">Explore The World</h1>
        <h1 className="text-8xl text-secondaryColor font-bold">
          Featured Destination
        </h1>
        <Image
          decoding="async"
          width={215}
          height={32}
          src="https://devasw7xy5fu5.cloudfront.net/hotel-listing-3/wp-content/uploads/sites/303/2019/10/tittle-style.png?x79901"
          alt="Title Style"
          className="mt-4"
        />
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 w-full">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="relative group overflow-hidden h-[300px] sm:h-[400px]">
            {/* Destination Image */}
            <Image
              src={destination.image}
              alt={destination.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay with Title */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center pb-3">
              <h2 className="text-white text-3xl font-bold">
                {destination.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDestination;
