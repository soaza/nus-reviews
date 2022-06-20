import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const NavbarItems = ["Submit Review"];

  return (
    <nav className="bg-white border-gray-200 py-2.5 ">
      <div className="flex justify-between items-center">
        <Link href="/">
          <a className="cursor-pointer self-center text-3xl font-semibold whitespace-nowrap ">
            NUSReviews.
          </a>
        </Link>

        <ul className="flex md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium ">
          {NavbarItems.map((item, index) => {
            return (
              <Link key={index} href={"/submit-review"}>
                <li>
                  <a className="block bg-black text-white border-b border-gray-100 md:border-0 hover:bg-gray-700  rounded-md cursor-pointer text-base p-2">
                    {item}
                  </a>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
