"use client";
import Hero from "@/app/components/Hero";
import bgImage from "@/i/Images/home-banner.jpg";
import LandingListings from "@/app/components/landingListings";
import FeaturedDesition from "@/app/components/featuredDesition";
import LatestVideo from "@/app/components/LatestVideo";
export default function LandingPage() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        {/* <Navbar /> */}
        <Hero />
      </div>
      <LandingListings />
      <FeaturedDesition />
      <LatestVideo />
      {/* <Footer /> */}
    </>
  );
}
