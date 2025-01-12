"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Listing } from "../types/properties";
import PropertyCarousel from "./imagesCarousell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const facilitiesOptions = [
  { label: "Garage", field: "Garage" },
  { label: "Pool", field: "PoolPrivate" },
  { label: "Gated Community", field: "GatedCommunity" },
  { label: "Fitness", field: "FitnessCenter" }, // Assuming it exists in the API
];

const tagsOptions = ["5 Star Hotel", "4 Star Hotel", "3 Star Hotel", "Resort"];

const fetchProperties = async () => {
  const response = await axios.get<Listing[]>(
    "https://api.remax-cca.com/api/Properties/F24351D8-A865-4C79-A6E8-9921718CD84E"
  );
  return response.data;
};

const AllListings = () => {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 12;

  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const propertyType = searchParams.get("propertyType") || "";

  const {
    data: listings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  // Handle facility checkbox changes
  const handleFacilityChange = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  // Handle tag checkbox changes
  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Filter listings based on selected filters
  const filteredListings = listings?.filter((listing) => {
    const price = listing.ListPrice;
    const matchesPriceRange = price >= priceRange[0] && price <= priceRange[1];

    const matchesLocation = location
      ? listing.Location.toLowerCase().includes(location.toLowerCase())
      : true;

    const matchesPropertyType = propertyType
      ? listing.PropertyTypeName_en.toLowerCase().includes(
          propertyType.toLowerCase()
        )
      : true;

    const matchesFacilities = selectedFacilities.every((facility) => {
      const facilityField = facilitiesOptions.find(
        (f) => f.label === facility
      )?.field;
      return listing[facilityField as keyof Listing] === "Y";
    });

    // Assume tags are part of PublicRemarks_en for simplicity
    const matchesTags = selectedTags.every((tag) =>
      listing.PublicRemarks_en?.toLowerCase().includes(tag.toLowerCase())
    );

    return (
      matchesPriceRange &&
      matchesLocation &&
      matchesPropertyType &&
      matchesFacilities &&
      matchesTags
    );
  });

  // Calculate listings for the current page
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings?.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const totalPages = Math.ceil(
    (filteredListings?.length || 0) / listingsPerPage
  );

  useEffect(() => {
    const initialPriceRange = searchParams.get("priceRange");
    if (initialPriceRange) {
      const [min, max] = initialPriceRange.split("-").map(Number);
      setPriceRange([min, max]);
    }

    const initialFacilities = searchParams.get("facilities");
    if (initialFacilities) {
      setSelectedFacilities(initialFacilities.split(","));
    }

    const initialTags = searchParams.get("tags");
    if (initialTags) {
      setSelectedTags(initialTags.split(","));
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-8 2xl:px-24 py-12">
        {/* Sidebar skeleton */}
        <div className="w-full lg:w-1/6 2xl:w-1/4 space-y-8">
          {/* Price Range skeleton */}
          <div className="p-6 border rounded-lg shadow-sm">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded mt-4"></div>
            <div className="flex justify-between mt-2">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Facilities skeleton */}
          <div className="p-6 border rounded-lg shadow-sm">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags skeleton */}
          <div className="p-6 border rounded-lg shadow-sm">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 w-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg shadow-sm">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading listings.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-8 2xl:px-24 py-12">
      {/* Sidebar - Filters */}
      <div className="w-full lg:w-1/6 2xl:w-1/4 space-y-8">
        {/* Price Range Filter */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Price Range</h2>
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={0}
            max={500000}
            step={10000}
            className="mt-4"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Facilities Filter */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Facilities</h2>
          <div className="space-y-2">
            {facilitiesOptions.map((facility) => (
              <div key={facility.label} className="flex items-center space-x-2">
                <Checkbox
                  id={facility.label}
                  checked={selectedFacilities.includes(facility.label)}
                  onCheckedChange={() => handleFacilityChange(facility.label)}
                />
                <label htmlFor={facility.label} className="text-sm">
                  {facility.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          <div className="space-y-2">
            {tagsOptions.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => handleTagChange(tag)}
                />
                <label htmlFor={tag} className="text-sm">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Listings */}
      <div className="flex flex-col w-full lg:w-5/6 2xl:w-3/4">
        {currentListings?.length === 0 ? (
          <div className="text-center text-gray-500">No properties found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentListings?.map((listing) => (
              <Card
                key={listing.ListingId}
                className="w-full md:w-[362px] min-h-[580px] cursor-pointer flex flex-col justify-between items-start shadow-lg">
                <CardHeader className="p-0 h-full w-full">
                  <PropertyCarousel
                    images={listing.Images.split("|")}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/property/${listing.ListingTitle_en}`);
                    }}
                  />
                </CardHeader>
                <CardContent
                  onClick={() =>
                    router.push(`/property/${listing.ListingTitle_en}`)
                  }
                  className="p-4 cursor-pointer">
                  <CardTitle className="text-xl font-semibold">
                    {listing.ListingTitle_en}
                  </CardTitle>
                  <CardDescription className="text-gray-500 text-sm">
                    {listing.Location}
                  </CardDescription>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                    <span className="text-gray-500">- 105 Reviews</span>
                  </div>
                  <div className="text-gray-800 font-medium mt-2">
                    Starting from{" "}
                    <span className="text-red-600">${listing.ListPrice}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentListings && currentListings.length > 0 && (
          <div className="flex justify-center items-center mt-8 mb-4">
            <Button
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
              }}
              disabled={currentPage === 1}
              className="mr-2">
              Previous
            </Button>
            <span className="text-sm mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              }}
              disabled={currentPage === totalPages}
              className="ml-2">
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllListings;
