import Link from "next/link";
import React from "react";
import { useMobile } from "../../utils/hooks";
import HamburgerImage from "../../assets/images/hamburger.svg";
import Image from "next/image";
import { MobileNavbar } from "./MobileNavbar";

export const Navbar = () => {
  const mobile = useMobile();

  return (
    <nav className="bg-white border-gray-200 py-2.5 ">
      <div className="flex justify-between items-center">
        <Link href="/">
          <a className="cursor-pointer self-center text-3xl font-semibold whitespace-nowrap ">
            NUSReviews.
          </a>
        </Link>

        {!mobile && (
          <ul className="flex md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium ">
            <li className="flex flex-row gap-2">
              <Link href={"/leaderboard"}>
                <a className="block bg-white border-black border hover:bg-gray-200 rounded-md cursor-pointer text-base p-2">
                  Leaderboard
                </a>
              </Link>

              <Link href={"/submit-review"}>
                <a className="block bg-black text-white border-b border-gray-100 md:border-0 hover:bg-gray-700  rounded-md cursor-pointer text-base p-2">
                  Submit Review
                </a>
              </Link>
            </li>
          </ul>
        )}

        {mobile && <MobileNavbar />}
      </div>
    </nav>
  );
};
