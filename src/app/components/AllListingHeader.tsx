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
import bg from "@/i/Images/Remax-Belize-MLS-Hero-Image.jpg";

const AllListingHeader = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    router.push(
      `/listing?location=${encodeURIComponent(
        location
      )}&propertyType=${encodeURIComponent(
        propertyType
      )}&priceRange=${encodeURIComponent(priceRange)}`
    );
  };

  const handleClearLocation = () => setLocation("");
  const handleClearPropertyType = () => setPropertyType("");
  const handleClearPriceRange = () => setPriceRange("");

  return (
    <section
      className="relative w-full h-[300px] lg:h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-6xl font-bold mb-4">All Listing</h1>
        <p className="text-lg">
          Find awesome Hotels, Bars, Restaurants and Activities.
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="absolute mt-[-180px] mb-0 lg:bottom-[-60px] left-1/2 transform -translate-x-1/2 z-20 w-full lg:max-w-5xl lg:scale-100 scale-[0.65]">
        <div className="flex flex-col lg:px-0 lg:flex-row items-center justify-center w-full bg-white shadow-lg rounded-r-lg">
          {/* Search Inputs */}
          <div className="flex flex-col lg:flex-row items-center w-full p-4 gap-4 lg:gap-0">
            {/* Location Select */}
            <div className="relative min-h-[120px] w-full lg:w-1/3 p-4 flex flex-col gap-4 justify-center border-r border-gray-300">
              <label
                className={`absolute text-3xl font-medium text-gray-700 cursor-pointer transition-all duration-300 ease-in-out ${
                  location
                    ? "top-0 translate-y-0 scale-75 text-blue-500"
                    : "top-1/2 -translate-y-1/2"
                } group-focus-within:top-0 group-focus-within:translate-y-0 group-focus-within:scale-75 group-focus-within:text-blue-500`}>
                Location
              </label>
              <div className="flex items-center">
                <Select
                  value={location}
                  onValueChange={(value) => setLocation(value)}>
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
                {location && (
                  <button
                    onClick={handleClearLocation}
                    className="ml-2 text-sm text-red-500 hover:underline">
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Property Type Select */}
            <div className="relative min-h-[120px] w-full lg:w-1/3 p-4 flex flex-col gap-4 justify-center border-r border-gray-300">
              <label
                className={`absolute text-3xl font-medium text-gray-700 cursor-pointer transition-all duration-300 ease-in-out ${
                  propertyType
                    ? "top-0 translate-y-0 scale-75 text-blue-500"
                    : "top-1/2 -translate-y-1/2"
                } group-focus-within:top-0 group-focus-within:translate-y-0 group-focus-within:scale-75 group-focus-within:text-blue-500`}>
                Property Type
              </label>
              <div className="flex items-center">
                <Select
                  value={propertyType}
                  onValueChange={(value) => setPropertyType(value)}>
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
                {propertyType && (
                  <button
                    onClick={handleClearPropertyType}
                    className="ml-2 text-sm text-red-500 hover:underline">
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Price Range Select */}
            <div className="relative min-h-[120px] w-full lg:w-1/3 p-4 flex flex-col gap-4 justify-center">
              <label
                className={`absolute text-3xl font-medium text-gray-700 cursor-pointer transition-all duration-300 ease-in-out ${
                  priceRange
                    ? "top-0 translate-y-0 scale-75 text-blue-500"
                    : "top-1/2 -translate-y-1/2"
                } group-focus-within:top-0 group-focus-within:translate-y-0 group-focus-within:scale-75 group-focus-within:text-blue-500`}>
                Price Range
              </label>
              <div className="flex items-center">
                <Select
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value)}>
                  <SelectTrigger className="relative text-gray-900 w-full !border-none !focus:border-none bg-transparent focus:ring-0 flex justify-between items-center">
                    <SelectValue
                      placeholder=""
                      className="text-gray-900 peer text-lg mt-2"
                    />
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
                {priceRange && (
                  <button
                    onClick={handleClearPriceRange}
                    className="ml-2 text-sm text-red-500 hover:underline">
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="bg-secondaryColor w-full lg:w-1/4 min-h-[160px] rounded-[0px] h-full text-4xl text-white hover:bg-mainColor">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AllListingHeader;
