"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useState } from "react";
import logo from "@/i/Images/remaxbelizelogo.webp";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white h-[120px] flex w-full items-center justify-center">
      <div className="container mx-auto flex px-4  lg:px-48 items-center justify-between py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Remax Belize MLS"
            width={150}
            height={150}
            className="w-32 h-auto min-w-[150px]"
          />
        </Link>
        <div className="md:hidden bg-white">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="!bg-white !border-none !shadow-none flex flex-col gap-1.5 p-2">
            <div className="w-6 h-0.5 bg-red-600"></div>
            <div className="w-6 h-0.5 bg-red-600"></div>
            <div className="w-6 h-0.5 bg-red-600"></div>
          </Button>
        </div>

        {/* Fullscreen Navigation Menu */}
        <div
          className={`fixed  inset-0 h-[250px] bg-white z-50 flex flex-col items-center justify-start transform transition-transform duration-300 ${
            isOpen
              ? "translate-y-0  mt-[120px] py-8"
              : "-translate-y-full md:hidden"
          }`}>
          <NavigationMenu className="flex flex-col items-center space-y-8">
            <NavigationMenuList className="flex flex-col space-y-4">
              <NavigationMenuItem>
                <Link href="/" passHref>
                  <p
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => setIsOpen(false)}>
                    Home
                  </p>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/listing" passHref>
                  <p
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => setIsOpen(false)}>
                    Listings
                  </p>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/agents" passHref>
                  <p
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => setIsOpen(false)}>
                    Agents
                  </p>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/locations" passHref>
                  <p
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => setIsOpen(false)}>
                    Locations
                  </p>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" passHref>
                  <Button
                    className="text-white bg-mainColor px-8 py-4 rounded-full hover:bg-secondaryColor"
                    onClick={() => setIsOpen(false)}>
                    Contact Us
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <NavigationMenu className="hidden md:flex flex-row justify-evenly items-center ">
          <NavigationMenuList className="flex flex-row space-x-14">
            <NavigationMenuItem>
              <Link href="/" passHref>
                <p
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setIsOpen(false)}>
                  Home
                </p>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/listing" passHref>
                <p
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setIsOpen(false)}>
                  Listings
                </p>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/agents" passHref>
                <p
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setIsOpen(false)}>
                  Agents
                </p>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/locations" passHref>
                <p
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setIsOpen(false)}>
                  Locations
                </p>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" passHref>
                <Button
                  className="text-white bg-mainColor px-8 py-4 rounded-full hover:bg-secondaryColor"
                  onClick={() => setIsOpen(false)}>
                  Contact Us
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
