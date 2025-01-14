import React, { useState } from "react";
import { Listing } from "../types/properties";
import PropertyCarousel from "./imagesCarousell";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons

const decodeHtmlEntities = (text: string) => {
  const element = document.createElement("div");
  element.innerHTML = text;
  return element.innerText;
};

const PropertyDetails = ({ property }: { property: Listing }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Track toggle state
  //   const [imageLoading, setImageLoading] = useState(true); // Track image loading
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  };
  const basicAmenities = [
    property.BedroomsTotal && !isNaN(property.BedroomsTotal)
      ? { label: `${property.BedroomsTotal} Bedrooms`, value: true }
      : null,
    property.BathroomsFull && !isNaN(property.BathroomsFull)
      ? { label: `${property.BathroomsFull} Bathrooms`, value: true }
      : null,
    property.PoolPrivate === "Y"
      ? { label: "Private Pool", value: true }
      : null,
    property.Garage === "Y" ? { label: "Garage", value: true } : null,
    property.GatedCommunity === "Y"
      ? { label: "Gated Community", value: true }
      : null,
    property.Cooling === "Y" ? { label: "Cooling System", value: true } : null,
    property.Furnishedyn === "Y" ? { label: "Furnished", value: true } : null,
    property.MaidRoom === "Y" ? { label: "Maid Room", value: true } : null,
    property.Viewyn === "Y" ? { label: "Scenic View", value: true } : null,
    property.GarageSpaces > 0
      ? { label: `${property.GarageSpaces} Garage Spaces`, value: true }
      : null,
    property.LotSizeArea && property.LotSizeUnits && property.LotSizeArea !== 0
      ? {
          label: `Lot Size: ${property.LotSizeArea} ${property.LotSizeUnits}`,
          value: true,
        }
      : null,
  ].filter(Boolean);
  const decodedDescription = decodeHtmlEntities(property.PublicRemarks_en);
  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-12">
      {/* Header Section */}
      {/* Header Section */}
      <div className="flex flex-col items-center lg:items-start lg:justify-between mb-12">
        {/* Title and Location */}
        <div className="text-center lg:text-left mb-6 lg:mb-0">
          <h1 className="text-3xl lg:text-5xl font-bold mb-2">
            {property.ListingTitle_en}
          </h1>
        </div>

        {/* Price and Book Button */}
        <div className="flex flex-col lg:flex-row w-full justify-between  items-center gap-4">
          <div>
            <p className="text-gray-500 text-lg">
              {property.Location}, {property.Country}{" "}
              <span className="mx-2">|</span>
              {property.FirstName} {property.LastName}
            </p>
          </div>
          <div className="flex flex-col w-full lg:w-auto lg:flex-row items-center gap-4">
            <span className="text-2xl font-bold text-red-600">
              ${property.ListPrice}
            </span>
            <button className="bg-red-500 w-full lg:w-auto text-white px-3 py-3 rounded-full text-md font-semibold hover:bg-red-600 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full rounded-lg overflow-hidden mb-12">
        {/* {imageLoading && (
          <div className="w-full h-[400px] bg-gray-300 animate-pulse"></div>
        )} */}
        <PropertyCarousel
          images={property.Images.split("|")}
          className="lg:min-h-[600px]"
        />
      </div>

      {/* Overview Section */}
      <div className="mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {isExpanded
            ? decodedDescription // Show full text when expanded
            : truncateText(decodedDescription, 400)}{" "}
          {/* Limit to 300 chars */}
        </p>
        {decodedDescription.length > 400 && (
          <button
            onClick={toggleReadMore}
            className="text-blue-600 font-semibold mt-2 hover:underline focus:outline-none">
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Basic Amenities Section */}
      {basicAmenities.length > 0 && (
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Basic Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {
              // Remove any null values
              basicAmenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b border-gray-200 pb-2">
                  {amenity?.value ? (
                    <FaCheckCircle className="text-green-500 text-xl" />
                  ) : (
                    <FaTimesCircle className="text-red-500 text-xl" />
                  )}
                  <span className="text-gray-700 font-medium text-lg">
                    {amenity?.label}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* Policies Section */}
      {/* Policies Section */}
      <div className="mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Policies</h2>
        <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <tbody>
              {/* Check-In */}
              <tr className="border-b border-gray-300">
                <td className="px-6 py-4 font-semibold text-gray-700">
                  Property Type
                </td>
                <td className="px-6 py-4">
                  {property.PropertyTypeName_en} |{" "}
                  {property.PropertyTypeName_es}
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="px-6 py-4 font-semibold text-gray-700">
                  Check - In
                </td>
                <td className="px-6 py-4">-</td>
              </tr>

              {/* Check-Out */}
              <tr className="border-b border-gray-300">
                <td className="px-6 py-4 font-semibold text-gray-700">
                  Check - Out
                </td>
                <td className="px-6 py-4">-</td>
              </tr>

              {/* Cancellation / Payment */}
              <tr className="border-b border-gray-300">
                <td className="px-6 py-4 font-semibold text-gray-700">
                  Cancellation / Payment
                </td>
                <td className="px-6 py-4">-</td>
              </tr>

              {/* Children and Extra Beds */}
              <tr className="border-b border-gray-300">
                <td className="px-6 py-4 font-semibold text-gray-700">
                  Children and Extra Beds
                </td>
                <td className="px-6 py-4">-</td>
              </tr>

              {/* Accepted Credit Cards */}
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-700">
                  Accepted Credit Cards
                </td>
                <td className="px-6 py-4">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Location Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Location</h2>
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          <iframe
            title="Property Location"
            src={`https://www.google.com/maps?q=${property.Latitude},${property.Longitude}&output=embed`}
            className="w-full h-full border-0"
            loading="lazy"></iframe>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
