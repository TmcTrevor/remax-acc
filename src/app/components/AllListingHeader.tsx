"use client";

import bg from "@/i/Images/Remax-Belize-MLS-Hero-Image.jpg";

const AllListingHeader = () => {
  // const [location, setLocation] = useState("");
  // const [propertyType, setPropertyType] = useState("");
  // const [priceRange, setPriceRange] = useState("");

  // const router = useRouter();

  // const handleSearch = () => {
  //   router.push(
  //     `/listing?location=${encodeURIComponent(
  //       location
  //     )}&propertyType=${encodeURIComponent(
  //       propertyType
  //     )}&priceRange=${encodeURIComponent(priceRange)}`
  //   );
  // };

  // const handleClearLocation = () => setLocation("");
  // const handleClearPropertyType = () => setPropertyType("");
  // const handleClearPriceRange = () => setPriceRange("");

  return (
    <section
      className="relative w-full h-[300px] lg:h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-6xl font-bold mb-4">All Listing</h1>
        <p className="text-lg">
          Find awesome Hotels, Bars, Restaurants and Activities.
        </p>
      </div>

      {/* Search Bar Section */}
    </section>
  );
};

export default AllListingHeader;
