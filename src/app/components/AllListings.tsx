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
// Mock data for filters
const facilitiesOptions = [
  "Garage",
  "Parking",
  "Pool",
  "Fitness",
  "Lounge",
  "Laundry",
];
const tagsOptions = ["5 Star Hotel", "4 Star Hotel", "3 Star Hotel", "Resort"];

const fetchProperties = async () => {
  const response = await axios.get<Listing[]>(
    "https://api.remax-cca.com/api/Properties/F24351D8-A865-4C79-A6E8-9921718CD84E"
  );
  return response.data;
};

const AllListings = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [location] = useState("");
  const [propertyType] = useState("");
  const searchParams = useSearchParams();

  const {
    data: listings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  const handleFacilityChange = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Filter listings based on URL params and selected filters
  const filteredListings = listings?.filter((listing) => {
    const price = listing.ListPrice;
    const matchesPriceRange = price >= priceRange[0] && price <= priceRange[1];
    // const matchesLocation = listing.Location === location;
    // const matchesPropertyType = listing.PropertyTypeName_en === propertyType;

    // const matchesFacilities = selectedFacilities.every((facility) =>
    //   listing.Facilities?.includes(facility)
    // );

    // const matchesTags = selectedTags.every((tag) =>
    //   listing.Tags?.includes(tag)
    // );
    console.log(listing.Location);
    console.log(location);
    console.log(listing.PropertyTypeName_en);
    console.log(propertyType);
    // return matchesPriceRange && matchesLocation && matchesPropertyType;
    return matchesPriceRange;
  });

  useEffect(() => {
    // const locationParam = searchParams.get("location") || "";
    // const propertyTypeParam = searchParams.get("propertyType") || "";
    // Sync initial filters with URL query params
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading listings.</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-8 py-12">
      {/* Sidebar - Filters */}
      <div className="w-full lg:w-1/4 space-y-8">
        {/* Price Range Filter */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Price Range</h2>
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={0}
            max={5000}
            step={100}
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
              <div key={facility} className="flex items-center space-x-2">
                <Checkbox
                  id={facility}
                  checked={selectedFacilities.includes(facility)}
                  onCheckedChange={() => handleFacilityChange(facility)}
                />
                <label htmlFor={facility} className="text-sm">
                  {facility}
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

        <Button className="w-full mt-6 bg-secondaryColor text-white">
          Apply Filters
        </Button>
      </div>

      {/* Property Listings */}
      <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings?.map((listing) => (
          <div
            key={listing.ListingId}
            className="border p-4 w-full rounded-lg shadow-md hover:shadow-lg transition-shadow">
            {/* <div className="relative w-full h-[200px]">
              <Image
                src={listing.Images.split("|")[0]}
                alt={listing.ListingTitle_en}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div> */}
            <PropertyCarousel images={listing.Images.split("|")} />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-mainColor">
                {listing.ListingTitle_en}
              </h3>
              <p className="text-gray-500 text-sm">{listing.Location}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="text-gray-500">- Reviews</span>
              </div>
              <div className="mt-2 text-lg font-semibold text-red-600">
                Starting from ${listing.ListPrice}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllListings;
