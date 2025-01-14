"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyDetails from "@/app/components/PropertyDetails"; // Import the PropertyDetails component
import axios from "axios";
import { Listing } from "@/app/types/properties";

const PropertyPage = () => {
  const params = useParams<{ name: string }>(); // Get params object
  const name = params?.name; // Get the property name from the URL
  // const searchParams = useSearchParams();
  // const name = searchParams?.get("name");
  const [property, setProperty] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        console.log("Fetching property with name:", name);
        const decodedName = decodeURIComponent(name as string);

        const response = await axios.get(`/api/properties`, {
          params: {
            name: decodedName,
          },
        });

        const matchedProperty = response.data?.data[0]; // Assuming the backend returns an array
        if (matchedProperty) {
          setProperty(matchedProperty);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
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
