"use client";
import { Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
import AllListingHeader from "../components/AllListingHeader";
import AllListings from "../components/AllListings";

function ListingContent() {
  return (
    <div className=" pt-[300px] mb-0 lg:mt-0 mx-auto p-4 md:p-8 lg:p-12 xl:p-48">
      <AllListings />
    </div>
  );
}

export default function Listing() {
  return (
    <div className="mx-auto w-full">
      <AllListingHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <ListingContent />
      </Suspense>
    </div>
  );
}
