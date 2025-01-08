import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import logo from "@/i/Images/remaxbelizelogo.webp";

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed w-full top-0 z-50 grid grid-cols-3 shadow-lg bg-white p-5 xl:px-8 items-center">
      <div
        className="relative flex items-center h-10 w-36 cursor-pointer my-auto "
        onClick={() => router.push("/")}>
        <Image
          src={logo}
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          alt="logo"
        />
      </div>

      {/* Middle links */}
      <div className="hidden md:flex space-x-6 justify-center">
        <Link
          className="relative md:flex h-10 w-10 cursor-pointer hover:opacity-80 transition duration-150"
          href="#one">
          One
        </Link>
        <Link
          className="relative h-10 w-10 cursor-pointer hover:opacity-80 transition duration-150"
          href="#two">
          Two
        </Link>
        <Link
          className="relative h-10 w-10 cursor-pointer hover:opacity-80 transition duration-150"
          href="#three">
          Three
        </Link>

        <Link
          className="relative h-10 w-10 cursor-pointer hover:opacity-80 transition duration-150"
          href="#four">
          Four
        </Link>
        <Link
          className="relative h-10 w-10 cursor-pointer hover:opacity-80 transition duration-150"
          href="#five">
          Five
        </Link>
        <Link
          className="relative h-10 w-10 cursor-pointer hover:opacity-80 transition duration-150"
          href="#six">
          Six
        </Link>
      </div>

      {/* Right - Socials */}
      <div className="hidden md:flex space-x-4 justify-end">
        <a
          className="relative h-10 w-10 cursor-pointer hover:opacity-80 transition duration-150"
          href="https://discord.com/">
          <Image
            src="/Discord-Logo-Color.png"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            alt="Discord"
          />
        </a>
        <a
          className="relative h-10 w-10 cursor-pointer hover:opacity-80 transition duration-150"
          href="https://twitter.com/">
          <Image
            src="/Twitter social icons - circle - blue.png"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            alt="Twitter"
          />
        </a>
        <a
          className="relative h-10 w-10 cursor-pointer hover:opacity-80 transition duration-150"
          href="https://www.instagram.com/">
          <Image
            src="/Instagram_Glyph_Gradient_RGB.png"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            alt="Instagram"
          />
        </a>

        <a
          className="relative h-10 w-10 cursor-pointer hover:opacity-80 transition duration-150"
          href="https://opensea.io/">
          <Image
            src="/Opensea-Logomark-Blue.png"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            alt="Opensea"
          />
        </a>
      </div>
    </header>
  );
}
