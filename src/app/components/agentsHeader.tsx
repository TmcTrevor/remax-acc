"use client";
import bg from "@/i/Images/Remax-Belize-MLS-Hero-Image.jpg";

const AgentsHeader = () => {
  // const searchParams = useSearchParams();

  return (
    <section
      className="relative w-full h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-6xl font-bold mb-4">Agents List</h1>
        <p className="text-lg">Find your best real estate agent.</p>
      </div>

      {/* Search Bar Section */}
    </section>
  );
};

export default AgentsHeader;
