// LandingPage.tsx (or .js)
import Hero from "@/app/components/Hero";
import LandingListings from "@/app/components/landingListings";
import FeaturedDesition from "@/app/components/featuredDesition";
import LatestVideo from "@/app/components/LatestVideo";
import VideoFeed from "@/app/components/videoFeed";

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col mx-auto">
        <div style={{ position: "relative" }}>
          {/* Video Background */}
          <video
            src="/Videos/SliderVideo2.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -2,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: -1,
            }}></div>

          <Hero />
        </div>
        <LandingListings />
        <FeaturedDesition />
        <VideoFeed />
        <LatestVideo />
      </div>
    </>
  );
}
