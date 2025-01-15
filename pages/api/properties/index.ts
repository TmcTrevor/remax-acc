import axios from "axios";
import xml2js from "xml2js";
import { LRUCache } from "lru-cache";
import type { NextApiRequest, NextApiResponse } from "next";
import { Listing } from "@/app/types/properties";

// Set up LRU cache
const cache = new LRUCache<string, Listing[]>({
  max: 1000,
  ttl: 1000 * 60 * 10, // Time to live (10 minutes)
});

// Function to fetch and parse XML, and update cache
const fetchAndUpdateCache = async (): Promise<Listing[]> => {
  const response = await axios.get(
    "https://api.remax-cca.com/api/Properties/F24351D8-A865-4C79-A6E8-9921718CD84E",
    { headers: { Accept: "application/xml" } }
  );

  const parser = new xml2js.Parser({ explicitArray: false });
  const result = await parser.parseStringPromise(response.data);

  if (
    !result.ArrayOfPropertiesInRegion ||
    !result.ArrayOfPropertiesInRegion.PropertiesInRegion
  ) {
    throw new Error(
      "Invalid XML structure: 'ArrayOfPropertiesInRegion' or 'PropertiesInRegion' missing"
    );
  }

  const properties = Array.isArray(
    result.ArrayOfPropertiesInRegion.PropertiesInRegion
  )
    ? result.ArrayOfPropertiesInRegion.PropertiesInRegion
    : [result.ArrayOfPropertiesInRegion.PropertiesInRegion];

  const listings: Listing[] = properties.map((property: Listing) => ({
    AssociateId: property.AssociateId,
    BathroomsFull: property.BathroomsFull || null,
    BedroomsTotal: property.BedroomsTotal || null,
    ConstructionSize: property.ConstructionSize,
    ConstructionSizeUnits: property.ConstructionSizeUnits,
    ContractType_en: property.ContractType_en,
    Country: property.Country,
    CurrencyListPrice: property.CurrencyListPrice,
    ExpirationDate: property.ExpirationDate,
    FirstName: property.FirstName,
    Garage: property.Garage,
    GatedCommunity: property.GatedCommunity,
    Images: property.Images,
    Latitude: property.Latitude,
    ListPrice: property.ListPrice,
    ListingId: property.ListingId,
    ListingTitle_en: property.ListingTitle_en,
    Location: property.Location,
    Longitude: property.Longitude,
    PoolPrivate: property.PoolPrivate,
    PropertyTypeName_en: property.PropertyTypeName_en,
    PublicRemarks_en: property.PublicRemarks_en,
    StateDepProv: property.StateDepProv,
  }));

  // Update cache
  cache.set("properties", listings);
  return listings;
};

// Function to fetch properties with cache and stale-while-revalidate
const fetchAndParseProperties = async (): Promise<Listing[]> => {
  const cachedListings = cache.get("properties");

  // Serve cached data immediately
  if (cachedListings) {
    // Trigger background revalidation
    setTimeout(() => fetchAndUpdateCache(), 0);
    return cachedListings;
  }

  // If no cached data, fetch and return fresh data
  return fetchAndUpdateCache();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const listings = await fetchAndParseProperties();

    // Extract query parameters
    const {
      page = "1",
      name = "",
      perPage = "12",
      minPrice = "0",
      maxPrice = "1000000000",
      facilities = "",
      propertyType = "",
      location = "",
      sortBy = "newest",
    } = req.query;
    console.log("req.query", req.query.propertyType);
    const facilitiesArray = facilities ? (facilities as string).split(",") : [];
    const parsedMinPrice = parseFloat(minPrice as string);
    const parsedMaxPrice = parseFloat(maxPrice as string);
    const parsedPage = parseInt(page as string, 10);
    const parsedPerPage = parseInt(perPage as string, 10);

    // Apply filters
    const filteredListings = listings.filter((listing) => {
      const matchingTitle = listing.ListingTitle_en.toLowerCase().includes(
        (name as string).toLowerCase()
      );
      const matchesPrice =
        listing.ListPrice >= parsedMinPrice &&
        listing.ListPrice <= parsedMaxPrice;

      const matchesPropertyType = propertyType
        ? listing.PropertyTypeName_en.toLowerCase().includes(
            (propertyType as string).toLowerCase()
          )
        : true;

      const matchesLocation = location
        ? listing.Location.toLowerCase().includes(
            (location as string).toLowerCase()
          )
        : true;

      const matchesFacilities = facilitiesArray.every((facility) => {
        return listing[facility as keyof Listing] === "Y";
      });

      return (
        matchesPrice &&
        matchesPropertyType &&
        matchesLocation &&
        matchesFacilities &&
        matchingTitle
      );
    });

    // Apply sorting
    if (sortBy === "priceLowToHigh") {
      filteredListings.sort((a, b) => a.ListPrice - b.ListPrice);
    } else if (sortBy === "priceHighToLow") {
      filteredListings.sort((a, b) => b.ListPrice - a.ListPrice);
    } else if (sortBy === "newest") {
      filteredListings.sort(
        (a, b) =>
          new Date(b.ExpirationDate).getTime() -
          new Date(a.ExpirationDate).getTime()
      );
    }

    // Paginate results
    const totalPages = Math.ceil(filteredListings.length / parsedPerPage);
    const paginatedListings = filteredListings.slice(
      (parsedPage - 1) * parsedPerPage,
      parsedPage * parsedPerPage
    );

    // Set caching headers
    res.setHeader(
      "Cache-Control",
      "public, max-age=600, stale-while-revalidate=300"
    );

    res.status(200).json({
      data: paginatedListings,
      totalPages,
      currentPage: parsedPage,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to load properties" });
  }
}
