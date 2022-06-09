import Link from "next/link";
import React from "react";
import { Navbar } from "./Navbar";

export const Layout = (props) => {
  const { children } = props;

  const BookIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );

  const SideBar = (
    <ul className="space-y-2">
      <li>
        <Link href={"/"}>
          <a className="h-12 p-2 flex items-center rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="ml-3 font-semibold text-2xl select-none whitespace-nowrap ">
              NUSReviews
            </span>
          </a>
        </Link>
      </li>
      <li>
        <a className="h-12 p-2 flex items-center rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          {BookIcon}
          <span className="ml-3 font-normal select-none whitespace-nowrap ">
            Module Reviews
          </span>
        </a>
      </li>
    </ul>
  );

  return (
    <div>
      <div className="p-4 lg:px-16">
        <Navbar />

        <div>{children}</div>
      </div>
    </div>
  );
};
