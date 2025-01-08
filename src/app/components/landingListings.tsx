"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Listing } from "../types/properties";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Import ShadCN Card components

const CACHE_KEY = "belize_mls_listings"; // Key to store data in localStorage

const HotelListing = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);

        // Check if data exists in localStorage
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setListings(parsedData);
          setLoading(false);
          return;
        }

        // If no cached data, fetch from API
        const response = await axios.get<Listing[]>(
          "https://api.remax-cca.com/api/Properties/F24351D8-A865-4C79-A6E8-9921718CD84E"
        );
        const data = response.data.slice(1, 7); // Take only the first 6 listings

        // Cache the fetched data in localStorage
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));

        setListings(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center pt-[80px] md:pt-[200px] pb-[40px] md:pb-[80px] w-full">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
          Belize MLS Listings
        </h1>
        <img
          decoding="async"
          width="215"
          height="32"
          src="https://devasw7xy5fu5.cloudfront.net/hotel-listing-3/wp-content/uploads/sites/303/2019/10/tittle-style.png?x79901"
          data-src="https://devasw7xy5fu5.cloudfront.net/hotel-listing-3/wp-content/uploads/sites/303/2019/10/tittle-style.png?x79901"
          className="attachment-large size-large wp-image-332 lazy loaded"
          alt=""
          data-was-processed="true"
        />
      </div>

      <div className="hotel-listing grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card
            key={listing.ListingId}
            className="w-[362px] min-h-[580px] flex flex-col justify-between items-start shadow-lg">
            <CardHeader className="p-0 h-full w-full">
              <div className="relative w-full h-[340px]">
                <Image
                  src={listing.Images.split("|")[0]}
                  alt={listing.ListingKey}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl font-semibold">
                {listing.ListingTitle_en}
              </CardTitle>
              <CardDescription className="text-gray-600 mb-2">
                {listing.Location}
              </CardDescription>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="text-gray-500">- 105 Reviews</span>
              </div>
              <div className="text-gray-800 font-medium mt-2">
                <span className="text-red-600 font-bold">
                  ${listing.ListPrice}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Link
        href="/listings"
        target="_blank"
        className="block text-center my-32 text-blue-600 underline">
        <Button className="bg-mainColor py-8 px-12 font-bold rounded-full text-white hover:bg-secondaryColor">
          View All Listings
        </Button>
      </Link>
    </div>
  );
};

export default HotelListing;
