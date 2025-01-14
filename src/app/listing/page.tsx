"use client";
import { Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
import AllListingHeader from "../components/AllListingHeader";
import AllListings from "../components/AllListings";

function ListingContent() {
  return (
    <div className="pt-[300px] md:pt-[100px] mb-0 lg:mt-0 ">
      <AllListings />
    </div>
  );
}

export default function Listing() {
  return (
    <div className="mx-auto w-full">
      <AllListingHeader />
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-16 h-16 border-4 border-mainColor border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
        <ListingContent />
      </Suspense>
    </div>
  );
}
