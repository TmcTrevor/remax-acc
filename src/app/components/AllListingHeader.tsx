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
  const [location, setLocation] = useState(
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("location") || ""
      : ""
  );
  const [propertyType, setPropertyType] = useState(
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("propertyType") || ""
      : ""
  );
  const [priceRange, setPriceRange] = useState(
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("priceRange") || ""
      : ""
  );

  const router = useRouter();

  const handleSearch = () => {
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
    <section
      className="relative w-full h-[500px] bg-cover bg-center"
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
      <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 z-20 w-full max-w-5xl">
        <div className="flex flex-col px-48 lg:px-0 lg:flex-row items-center justify-center w-full bg-white shadow-lg rounded-r-lg">
          {/* Search Inputs */}
          <div className="flex flex-col  lg:flex-row items-center w-full p-4 gap-4 lg:gap-0">
            {/* Location Input */}
            <div className="relative min-h-[120px] w-full lg:w-1/3 p-4 flex flex-col hover:bg-gray-100 justify-center border-r border-gray-300 items-start group">
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
            <div className="relative min-h-[120px] w-full lg:w-1/3 p-4 flex flex-col hover:bg-gray-100 justify-center border-r border-gray-300 items-start group">
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
            <div className="relative min-h-[120px] w-full lg:w-1/3 p-4 flex flex-col hover:bg-gray-100 justify-center items-start group">
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
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="bg-secondaryColor w-full lg:w-1/4 min-h-[160px] rounded-[0px] h-full text-4xl text-white  hover:bg-mainColor">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AllListingHeader;
