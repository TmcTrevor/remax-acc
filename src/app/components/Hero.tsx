"use client";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    // Redirect to the listing page with query parameters
    // Redirect to the listing page with query parameters
    router.push(
      `/listing?location=${encodeURIComponent(
        location
      )}&propertyType=${encodeURIComponent(
        propertyType
      )}&priceRange=${encodeURIComponent(priceRange)}`
    );
  };

  return (
    <section className="relative bg-cover bg-center h-[80vh] w-full">
      {/* Overlay */}

      {/* Content */}
      <div className="container mx-auto relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-5xl font-bold mb-4">FIND YOUR BELIZE PROPERTY</h1>
        <p className="text-lg mb-8 tracking-wide font-semibold">
          REMAX BELIZE MLS
        </p>

        {/* Search Form */}
        <div className="flex justify-center items-center w-full max-w-6xl">
          <div className="bg-white rounded-l-lg shadow-lg max-w-6xl w-3/4">
            <div className="flex flex-col w-full justify-between p-4 items-center lg:flex-row gap-4">
              {/* Location Input */}
              <div className="relative min-h-[120px] w-1/3 p-4 flex flex-col hover:bg-gray-100 justify-center border-r border-gray-300 items-start group">
                <label
                  htmlFor="location"
                  className={`absolute text-3xl font-medium text-gray-700 cursor-pointer transition-all duration-300 ease-in-out 
                    ${
                      location
                        ? "top-0 translate-y-0 scale-75 text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    } group-focus-within:top-0 group-focus-within:translate-y-0 group-focus-within:scale-75 group-focus-within:text-blue-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100`}>
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border-0 focus:border-transparent bg-transparent focus:outline-none focus:ring-0 text-gray-900 transition-all duration-300 ease-in-out peer"
                />
              </div>
              {/* Property Type Select */}
              <div className="relative min-h-[120px] w-1/3 p-4 flex flex-col hover:bg-gray-100 justify-center border-r border-gray-300 items-start group">
                <label
                  className={`absolute text-3xl font-medium text-gray-700 cursor-pointer transition-all duration-300 ease-in-out 
                    ${
                      propertyType
                        ? "top-0 translate-y-0 scale-75 text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    } group-focus-within:top-0 group-focus-within:translate-y-0 group-focus-within:scale-75 group-focus-within:text-blue-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100`}>
                  Property Type
                </label>
                <Select onValueChange={(value) => setPropertyType(value)}>
                  <SelectTrigger className="relative text-gray-900 w-full !border-none !focus:border-none bg-transparent focus:ring-0 flex justify-between items-center">
                    <SelectValue
                      placeholder=""
                      className="text-gray-900 peer text-lg mt-2"
                    />
                  </SelectTrigger>
                  <SelectContent className="z-50 mt-2 border border-gray-200 rounded-lg shadow-lg bg-white text-gray-900 text-sm">
                    <SelectItem
                      value="house"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      House
                    </SelectItem>
                    <SelectItem
                      value="apartment"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Apartment
                    </SelectItem>
                    <SelectItem
                      value="land"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Land
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Select */}
              <div className="relative min-h-[120px] w-1/3 p-4 flex flex-col hover:bg-gray-100 justify-center items-start group">
                <label
                  className={`absolute text-3xl font-medium text-gray-700 cursor-pointer transition-all duration-300 ease-in-out 
                    ${
                      priceRange
                        ? "top-0 translate-y-0 scale-75 text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    } group-focus-within:top-0 group-focus-within:translate-y-0 group-focus-within:scale-75 group-focus-within:text-blue-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100`}>
                  Price Range
                </label>
                <Select onValueChange={(value) => setPriceRange(value)}>
                  <SelectTrigger className="relative text-gray-900 w-full border-none bg-transparent focus:ring-0 flex justify-between items-center">
                    <SelectValue
                      placeholder=""
                      className="text-gray-900 peer text-lg mt-2"
                    />
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg> */}
                  </SelectTrigger>
                  <SelectContent className="z-50 mt-2 border border-gray-200 rounded-lg shadow-lg bg-white text-gray-900 text-sm">
                    <SelectItem
                      value="0-100000"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      $0 - $100,000
                    </SelectItem>
                    <SelectItem
                      value="100000-250000"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      $100,000 - $250,000
                    </SelectItem>
                    <SelectItem
                      value="250000-500000"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      $250,000 - $500,000
                    </SelectItem>
                    <SelectItem
                      value="500000+"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      $500,000+
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type Select */}
            </div>

            {/* Search Button */}
          </div>
          <Button
            onClick={handleSearch}
            className="bg-secondaryColor w-1/4 h-full text-4xl text-white rounded-r-lg hover:bg-mainColor">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}
