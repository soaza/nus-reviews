import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const NavbarItems = ["Search modules", "Submit Review"];

  return (
    <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-800">
      <div className="container flex flex-row justify-between items-center">
        <Link href="/">
          <span className="cursor-pointer self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            NUSReviews
          </span>
        </Link>

        <div className="hidden md:block ">
          <ul className="flex mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium ">
            {NavbarItems.map((item, index) => {
              return (
                <li key={index}>
                  <a className="block text-gray-700 border-b border-gray-100 md:border-0 hover:bg-gray-200  rounded-md cursor-pointer text-base p-2">
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
