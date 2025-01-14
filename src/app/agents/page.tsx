"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { Agent } from "./types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import AgentsHeader from "../components/agentsHeader";
import { FaEnvelope, FaPhone, FaLanguage, FaUserTie } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const agentsPerPage = 12; // Define how many agents per page

const fetchAgents = async (page: number) => {
  const response = await axios.get<Agent[]>(
    `https://api.remax-cca.com/api/Agents/F24351D8-A865-4C79-A6E8-9921718CD84E?page=${page}&limit=${agentsPerPage}`
  );
  return response.data;
};

const AgentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["agents", currentPage],
    queryFn: () => fetchAgents(currentPage),
  });

  useEffect(() => {
    const pageParam = searchParams?.get("page");
    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/agents?page=${page}`);
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2  mt-10 p-24 lg:grid-cols-3 gap-6">
          {Array.from({ length: agentsPerPage }).map((_, index) => (
            <Card
              key={index}
              className="w-[362px] min-h-[580px] flex flex-col justify-between items-start shadow-lg">
              <CardHeader className="p-0 h-full w-full">
                <div className="relative w-full h-[340px]">
                  <Skeleton height={340} />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Skeleton width={200} />
                </h2>
                <p className="text-gray-600 mb-2 flex items-center">
                  <Skeleton width={150} />
                </p>
                <p className="text-gray-800 font-medium flex items-center">
                  <Skeleton width={180} />
                </p>
                <p className="text-gray-800 font-medium flex items-center">
                  <Skeleton width={180} />
                </p>
                <p className="text-gray-800 font-medium flex items-center">
                  <Skeleton width={180} />
                </p>
              </CardContent>
              <CardFooter>
                {/* Add any additional footer content here */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) return <div>Error loading agents.</div>;

  const agents = data || [];
  const totalCount = data?.length || 0;
  const indexOfLastListing = currentPage * agentsPerPage;
  const indexOfFirstListing = indexOfLastListing - agentsPerPage;
  const currentAgents = agents?.slice(indexOfFirstListing, indexOfLastListing);
  const totalPages = Math.ceil(totalCount / agentsPerPage);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2  mt-10 lg:p-24 lg:grid-cols-3 gap-6">
        {currentAgents.map((agent: Agent) => (
          <Card
            key={agent.AssociateID}
            className="w-[362px] min-h-[580px] flex flex-col justify-between items-start shadow-lg">
            <CardHeader className="p-0 h-full w-full">
              <div className="relative w-full h-[340px]">
                <img
                  src={agent.UrlImg}
                  alt={`${agent.FirstName} ${agent.LastName}`}
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold flex items-center">
                <FaUserTie className="mr-2 text-gray-700" />
                {agent.FirstName} {agent.LastName}
              </h2>
              <p className="text-gray-600 mb-2 flex items-center">
                <FaUserTie className="mr-2 text-gray-700" />
                {agent.Title} | {agent.TitleEs}
              </p>
              <p className="text-gray-800 font-medium flex items-center">
                <FaEnvelope className="mr-2 text-gray-700" />
                {agent.RemaxEmail}
              </p>
              <p className="text-gray-800 font-medium flex items-center">
                <FaPhone className="mr-2 text-gray-700" />
                {agent.DirectPhone}
              </p>
              <p className="text-gray-800 font-medium flex items-center">
                <FaLanguage className="mr-2 text-gray-700" />
                {agent.Lang}
              </p>
            </CardContent>
            <CardFooter>
              {/* Add any additional footer content here */}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 mb-4">
        <Button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="mr-2">
          Previous
        </Button>
        <span className="text-sm mx-4 p-12">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="ml-2">
          Next
        </Button>
      </div>
    </div>
  );
};

export default function Agents() {
  return (
    <div className="mx-auto w-full">
      <AgentsHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <AgentList />
      </Suspense>
    </div>
  );
}
