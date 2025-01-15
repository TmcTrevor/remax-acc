"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Listing, PropertiesResponse } from "../types/properties";
import PropertyCarousel from "./imagesCarousell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

// Available filters
const facilitiesOptions = [
  { label: "Garage", field: "Garage" },
  { label: "Pool", field: "PoolPrivate" },
  { label: "Gated Community", field: "GatedCommunity" },
  { label: "Fitness", field: "FitnessCenter" },
  { label: "Lounge", field: "Lounge" },
  { label: "Laundry", field: "Laundry" },
];

// const propertyTypeOptions = ["Homes", "Condos", "Commercial", "Land"];
const propertyTypeOptions = [
  { label: "Homes", value: "House/Villa" },
  { label: "Condos", value: "Condo" },
  { label: "Commercial", value: "Commercial" },
  { label: "Land", value: "Land" },
];
const locationOptions = [
  "Ambergris Caye",
  "Belize City",
  "Belmopan",
  "Caye Caulker",
  "Corozal",
  "Hopkins",
  "Placencia",
  "San Ignacio",
  "San Pedro",
];

// Fetch properties from backend API with filters and pagination
const fetchProperties = async ({
  page,
  perPage,
  minPrice,
  maxPrice,
  facilities,
  propertyType,
  location,
  sortBy,
}: {
  page: number;
  perPage: number;
  minPrice: number;
  maxPrice: number;
  facilities: string[];
  propertyType: string;
  location: string;
  sortBy: string;
}) => {
  const response = await axios.get<PropertiesResponse>("/api/properties", {
    params: {
      page,
      perPage,
      minPrice,
      maxPrice,
      facilities: facilities.join(","),
      propertyType,
      location,
      sortBy,
    },
  });
  return response.data;
};

const AllListings = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters
  const defaultLocation = searchParams?.get("location") || "";
  const defaultPropertyType = searchParams?.get("propertyType") || "";

  // Parse priceRange from the query parameter
  const priceRangeParam = searchParams?.get("priceRange") || "0-14000000";
  const [defaultMinPrice, defaultMaxPrice] = priceRangeParam
    .split("-")
    .map(Number);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    defaultMinPrice,
    defaultMaxPrice,
  ]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPropertyType, setSelectedPropertyType] =
    useState<string>(defaultPropertyType);
  const [selectedLocation, setSelectedLocation] =
    useState<string>(defaultLocation);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 12;

  const {
    data: listings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "properties",
      currentPage,
      priceRange,
      selectedFacilities,
      selectedPropertyType,
      selectedLocation,
      sortBy,
    ],
    queryFn: () =>
      fetchProperties({
        page: currentPage,
        perPage: listingsPerPage,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        facilities: selectedFacilities,
        propertyType: selectedPropertyType,
        location: selectedLocation,
        sortBy,
      }),
  });

  // Handle facility checkbox changes
  const handleFacilityChange = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const totalPages = listings?.totalPages || 1;

  if (isError) {
    return <div>Error loading listings. Please try again later.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-8 2xl:px-24 py-12">
      {/* Sidebar - Filters */}
      <div className="w-full lg:w-1/6 2xl:w-1/4 space-y-8">
        {/* Price Range Filter */}
        {/* Price Range Filter */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Price Range</h2>
          <div className="flex gap-4 items-center">
            {/* Min Price Input */}
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="min-price"
                className="text-sm font-medium text-gray-700">
                Min Price
              </label>
              <input
                id="min-price"
                type="number"
                min={0}
                max={priceRange[1] - 10000}
                value={priceRange[0]}
                onChange={(e) => {
                  const newMin = Math.min(
                    Number(e.target.value),
                    priceRange[1] - 1
                  );
                  setPriceRange([newMin, priceRange[1]]);
                }}
                className="p-2 border rounded text-sm"
              />
            </div>

            {/* Max Price Input */}
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="max-price"
                className="text-sm font-medium text-gray-700">
                Max Price
              </label>
              <input
                id="max-price"
                type="number"
                min={priceRange[0] + 10000}
                max={500000}
                value={priceRange[1]}
                onChange={(e) => {
                  const newMax = Math.max(
                    Number(e.target.value),
                    priceRange[0] + 1
                  );
                  setPriceRange([priceRange[0], newMax]);
                }}
                className="p-2 border rounded text-sm"
              />
            </div>
          </div>

          {/* Slider for visual adjustment */}
          {/* <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={0}
            max={100000000}
            step={10000}
            className="mt-4"
          /> */}
          <DualRangeSlider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={0}
            max={14000000}
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
                  checked={selectedFacilities.includes(facility.field)}
                  onCheckedChange={() => handleFacilityChange(facility.field)}
                />
                <label htmlFor={facility.label} className="text-sm">
                  {facility.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Property Type Filter */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Property Type</h2>
          <select
            value={selectedPropertyType}
            onChange={(e) => setSelectedPropertyType(e.target.value)}
            className="w-full p-2 border rounded">
            <option value="">All Types</option>
            {propertyTypeOptions.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full p-2 border rounded">
            <option value="">All Locations</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Sort By</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded">
            <option value="newest">Newest</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Property Listings */}
      <div className="flex flex-col w-full lg:w-5/6 2xl:w-3/4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: listingsPerPage }).map((_, index) => (
              <Skeleton key={index} className="h-80 w-full" />
            ))}
          </div>
        ) : listings?.data?.length === 0 ? (
          <div className="text-center text-gray-500">No properties found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {listings?.data?.map((listing: Listing) => (
              <Card
                key={listing.ListingId}
                className="w-full md:w-[362px] xl:w-[330px] 3xl:w-[362px] min-h-[580px] cursor-pointer flex flex-col justify-between items-start shadow-lg">
                <CardHeader className="p-0 h-full w-full">
                  <PropertyCarousel images={listing.Images.split("|")} />
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
                  <div className="text-gray-800 font-medium mt-2">
                    Starting from{" "}
                    <span className="text-red-600">${listing.ListPrice}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && listings && listings?.data?.length > 0 && (
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
