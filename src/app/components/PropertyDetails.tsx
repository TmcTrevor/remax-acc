import React from "react";
import { Listing } from "../types/properties";
import PropertyCarousel from "./imagesCarousell";

const PropertyDetails = ({ property }: { property: Listing }) => {
  //   const [imageLoading, setImageLoading] = useState(true); // Track image loading

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
              ⭐⭐⭐⭐⭐ - 105 Reviews <span className="mx-2">|</span>
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
          {property.PublicRemarks_en}
        </p>
      </div>

      {/* Basic Amenities Section */}
      <div className="mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Basic Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            property.PoolPrivate === "Y" && "Private Pool",
            property.Garage === "Y" && "Garage",
            property.GatedCommunity === "Y" && "Gated Community",
            property.Cooling === "Y" && "Cooling System",
            property.Furnishedyn === "Y" && "Furnished",
            property.MaidRoom === "Y" && "Maid Room",
            property.Viewyn === "Y" && "Scenic View",
            property.GarageSpaces > 0 &&
              `${property.GarageSpaces} Garage Spaces`,
            property.LotSizeArea !== 0 &&
              `${property.LotSizeArea} ${property.LotSizeUnits} Lot Size`,
          ]
            .filter(Boolean) // Remove any false or null values
            .map((amenity, index) => (
              <span key={index} className="text-gray-700 font-medium text-lg">
                {amenity}
              </span>
            ))}
        </div>
      </div>

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
