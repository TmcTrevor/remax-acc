"use client";
import { Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
import AllListingHeader from "../components/AllListingHeader";
import AllListings from "../components/AllListings";

function ListingContent() {
  // const searchParams = useSearchParams(); // Get query parameters

  // const [location, setLocation] = useState("");
  // const [propertyType, setPropertyType] = useState("");
  // const [priceRange, setPriceRange] = useState("");

  // useEffect(() => {
  //   // Retrieve query parameters from URL
  //   const locationParam = searchParams.get("location") || "";
  //   const propertyTypeParam = searchParams.get("propertyType") || "";
  //   const priceRangeParam = searchParams.get("priceRange") || "";

  //   setLocation(locationParam);
  //   setPropertyType(propertyTypeParam);
  //   setPriceRange(priceRangeParam);

  //   // Log the values for debugging
  //   console.log("Location:", locationParam);
  //   console.log("Property Type:", propertyTypeParam);
  //   console.log("Price Range:", priceRangeParam);
  // }, [searchParams]);

  return (
    <div className=" mx-auto p-48">
      <AllListings />
    </div>
  );
}

export default function Listing() {
  return (
    <div className="mx-auto w-full">
      <AllListingHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <ListingContent />
      </Suspense>
    </div>
  );
}
