"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import remaxLogo from "@/i/Images/remaxbelizelogo.webp";
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa"; // Import social icons

const Footer = () => {
  return (
    <footer className="relative w-full bg-gray-100 py-16 h-[500px] bottom-0">
      <div className="container mx-auto px-4 md:px-20 lg:px-32 flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Left Section: Logo and Description */}
        <div className="flex-1">
          <Image
            src={remaxLogo.src}
            alt="Remax Belize Logo"
            width={150}
            height={50}
          />
          <p className="mt-4 text-gray-600">
            RE/MAX Belize is the regional office for RE/MAX and one of the
            leading real estate brokerages in the country specializing in
            investments and new developments.
          </p>
          <div className="flex mt-6 space-x-4">
            <Button className="bg-red-600 text-white p-2 rounded-full">
              <FaFacebookF />
            </Button>
            <Button className="bg-red-600 text-white p-2 rounded-full">
              <FaYoutube />
            </Button>
            <Button className="bg-red-600 text-white p-2 rounded-full">
              <FaTwitter />
            </Button>
          </div>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Listings
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Agents
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Locations
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Contact Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">Contact Info</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>
              <span className="font-bold text-red-600">Phone:</span> +1 (650)
              653-2088
            </li>
            <li>
              <span className="font-bold text-red-600">Email:</span>{" "}
              info@remaxbelizemls.com
            </li>
            <li>
              <span className="font-bold text-red-600">Address:</span> Mahogany
              Bay Village, San Pedro Town, Belize
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-300 pt-4 text-center text-gray-600">
        © 2025 REMAX BELIZE MLS, ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
