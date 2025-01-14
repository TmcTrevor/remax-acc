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
        <h1 className="text-5xl font-bold mb-4">Belize Real Estate </h1>
        <p className="text-lg mb-8 tracking-wide font-semibold">
          Search Property in Belize
        </p>

        {/* Search Form */}
        <div className="flex flex-col px-8 lg:px-0 rounded-0 lg:flex-row justify-center items-center w-full max-w-6xl">
          <div className="bg-white rounded-l-lg shadow-lg max-w-6xl w-full lg:w-2/4">
            <div className="flex flex-col w-full justify-between items-center xl:flex-row gap-4 ">
              {/* Location Select */}
              <div className="relative  w-full md:w-1/3 p-4 flex flex-col hover:bg-gray-100 justify-center md:border-r border-gray-300 items-start group">
                <label
                  className={`absolute text-md font-medium text-gray-700 cursor-pointer transition-all duration-300 ease-in-out 
                    ${
                      location
                        ? "top-0 translate-y-0 scale-75 text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    } group-focus-within:top-0 group-focus-within:translate-y-0 group-focus-within:scale-75 group-focus-within:text-blue-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100`}>
                  Location
                </label>
                <Select onValueChange={(value) => setLocation(value)}>
                  <SelectTrigger className="relative text-gray-900 w-full !border-none !focus:border-none bg-transparent focus:ring-0 flex justify-between items-center">
                    <SelectValue
                      placeholder=""
                      className="text-gray-900 peer text-lg mt-2"
                    />
                  </SelectTrigger>
                  <SelectContent className="z-50 mt-2 border border-gray-200 rounded-lg shadow-lg bg-white text-gray-900 text-sm">
                    <SelectItem
                      value="Ambergris Caye"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Ambergris Caye
                    </SelectItem>
                    <SelectItem
                      value="Belize City"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Belize City
                    </SelectItem>
                    <SelectItem
                      value="Belmopan"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Belmopan
                    </SelectItem>
                    <SelectItem
                      value="Caye Caulker"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Caye Caulker
                    </SelectItem>
                    <SelectItem
                      value="Corozal"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Corozal
                    </SelectItem>
                    <SelectItem
                      value="Hopkins"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Hopkins
                    </SelectItem>
                    <SelectItem
                      value="Placencia"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Placencia
                    </SelectItem>
                    <SelectItem
                      value="San Ignacio"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      San Ignacio
                    </SelectItem>
                    <SelectItem
                      value="San Pedro"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      San Pedro
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Property Type Select */}
              <div className="relative  w-full md:w-1/3 p-4 flex flex-col hover:bg-gray-100 justify-center md:border-r border-gray-300 items-start group">
                <label
                  className={`absolute text-md font-medium text-gray-700 cursor-pointer transition-all duration-300 ease-in-out 
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
                      value="Homes"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Homes
                    </SelectItem>
                    <SelectItem
                      value="Condos"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Condos
                    </SelectItem>
                    <SelectItem
                      value="Commercial"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Commercial
                    </SelectItem>
                    <SelectItem
                      value="Land"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      Land
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Select */}
              <div className="relative   w-full md:w-1/3 p-4 flex flex-col hover:bg-gray-100 justify-center  items-start group">
                <label
                  className={`absolute text-md font-medium text-gray-700 cursor-pointer transition-all duration-300 ease-in-out 
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
          </div>
          <div className="flex justify-center p-2 h-full bg-white w-full lg:w-1/6 items-center rounded-[0px] ">
            <Button
              onClick={handleSearch}
              className="bg-secondaryColor h-full w-full text-xl text-white  rounded-[0px] hover:bg-mainColor mt-4 lg:mt-0">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
