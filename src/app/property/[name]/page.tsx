"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyDetails from "@/app/components/PropertyDetails"; // Import the PropertyDetails component
import axios from "axios";
import { Listing } from "@/app/types/properties";

const fetchProperties = async () => {
  const response = await axios.get(
    "https://api.remax-cca.com/api/Properties/F24351D8-A865-4C79-A6E8-9921718CD84E"
  );
  return response.data;
};

const PropertyPage = () => {
  const { name } = useParams(); // Get the property name from the URL
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const data = await fetchProperties();
        const decodedName = decodeURIComponent(name as string).replace(
          /-/g,
          " "
        );
        const matchedProperty = data.find(
          (p: Listing) =>
            p.ListingTitle_en.toLowerCase() === decodedName.toLowerCase()
        );
        if (matchedProperty) {
          setProperty(matchedProperty);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperty();
  }, [name]);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-12">
        <div className="animate-pulse">
          {/* Title Skeleton */}
          <div className="h-10 w-2/3 bg-gray-300 rounded mb-6"></div>
          {/* Location Skeleton */}
          <div className="h-6 w-1/3 bg-gray-300 rounded mb-12"></div>
          {/* Image Skeleton */}
          <div className="w-full h-[400px] bg-gray-300 rounded-lg mb-12"></div>
          {/* Overview Skeleton */}
          <div className="h-8 w-1/4 bg-gray-300 rounded mb-4"></div>
          <div className="h-6 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-5/6 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-4/6 bg-gray-200 rounded mb-2"></div>
          {/* Price Skeleton */}
          <div className="h-8 w-1/4 bg-gray-300 rounded mt-8"></div>
        </div>
      </div>
    );
  }

  if (isError || !property) {
    return <div>Error loading property details or property not found.</div>;
  }

  return (
    <div>
      <PropertyDetails property={property} />
    </div>
  );
};

export default PropertyPage;
