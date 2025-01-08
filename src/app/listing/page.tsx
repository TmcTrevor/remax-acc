"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AllListingHeader from "../components/AllListingHeader";
import AllListings from "../components/AllListings";

export default function Listing() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get query parameters

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    // Retrieve query parameters from URL
    const locationParam = searchParams.get("location") || "";
    const propertyTypeParam = searchParams.get("propertyType") || "";
    const priceRangeParam = searchParams.get("priceRange") || "";

    setLocation(locationParam);
    setPropertyType(propertyTypeParam);
    setPriceRange(priceRangeParam);

    // Log the values for debugging
    console.log("Location:", locationParam);
    console.log("Property Type:", propertyTypeParam);
    console.log("Price Range:", priceRangeParam);
  }, [searchParams]);

  return (
    <div className=" mx-auto  w-full">
      <AllListingHeader />
      <div className=" mx-auto p-48">
        <AllListings />
        <h1 className="text-4xl font-bold mb-6">Listings</h1>
        <p>Location: {location}</p>
        <p>Property Type: {propertyType}</p>
        <p>Price Range: {priceRange}</p>

        <div className="mt-6">
          {location || propertyType || priceRange ? (
            <div className="p-4 border border-gray-300 rounded-lg mb-4">
              <h2 className="text-2xl font-semibold">Filtered Listings</h2>
              <p>Showing results for:</p>
              <ul className="list-disc ml-6">
                {location && <li>Location: {location}</li>}
                {propertyType && <li>Property Type: {propertyType}</li>}
                {priceRange && <li>Price Range: {priceRange}</li>}
              </ul>
            </div>
          ) : (
            <p>No filters applied. Showing all listings.</p>
          )}
        </div>
      </div>
    </div>
  );
}
