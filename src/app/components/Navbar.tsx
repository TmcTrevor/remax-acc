"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import logo from "@/i/Images/remaxbelizelogo.webp";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-white h-[120px] flex w-full items-center justify-center">
      <div className="container mx-auto flex px-48 items-center justify-between py-4">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Remax Belize MLS" width={200} height={200} />
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="flex flex-row justify-evenly items-center">
          <NavigationMenuList className="flex space-x-14">
            <NavigationMenuItem>
              <Link href="/" passHref>
                <p className="text-gray-600 hover:text-gray-800">Home</p>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/listing" passHref>
                <p className="text-gray-600 hover:text-gray-800">Listings</p>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/agents" passHref>
                <p className="text-gray-600 hover:text-gray-800">Agents</p>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/locations" passHref>
                <p className="text-gray-600 hover:text-gray-800">Locations</p>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" passHref>
                <Button className="text-white bg-mainColor px-8 py-4 rounded-full hover:bg-secondaryColor">
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
