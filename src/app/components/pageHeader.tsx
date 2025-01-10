import bg from "@/i/Images/ContactCover.jpg";

const pageHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
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
        <h1 className="text-6xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>

      {/* Search Bar Section */}
    </section>
  );
};

export default pageHeader;
