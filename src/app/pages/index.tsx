"use client";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import bgImage from "@/i/Images/home-banner.jpg";
import LandingListings from "@/app/components/landingListings";
import FeaturedDesition from "@/app/components/featuredDesition";
import LatestVideo from "@/app/components/LatestVideo";
import Footer from "@/app/components/footer";
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
