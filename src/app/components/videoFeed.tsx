"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the video type
type Video = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
};

const VideoFeed = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [mainVideo, setMainVideo] = useState<Video | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const videosPerPage = 9; // Number of videos to display per page

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/test"); // Fetch from backend
        setVideos(response.data);
        setMainVideo(response.data[0] || null); // Set the first video as the main video
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Calculate total pages
  const totalPages = Math.ceil(videos.length / videosPerPage);

  // Get the videos to display on the current page
  const currentVideos = videos.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 mt-48 px-4 lg:px-8">
      <h1 className="text-center  text-3xl text-secondaryColor  md:text-6xl  font-bold mb-8">
        Belize Real Estate Videos
      </h1>

      {/* Main Video */}
      {mainVideo && (
        <div className="relative w-full h-0 pb-[56.25%] mb-8">
          <iframe
            src={`https://www.youtube.com/embed/${mainVideo.id}`}
            title={mainVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVideos.map((video, index) => (
          <div
            key={index}
            onClick={() => setMainVideo(video)}
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-white text-lg font-semibold">
                {video.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">
          Prev
        </button>
        <span className="text-lg">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">
          Next
        </button>
      </div>

      {/* YouTube Channel Button */}
      <div className="flex justify-center mt-12">
        <a
          href="https://www.youtube.com/@WillMitchellBelize"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-red-600 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-red-700">
          YouTube Channel
        </a>
      </div>
    </div>
  );
};

export default VideoFeed;
