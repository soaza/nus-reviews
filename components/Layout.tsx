import React from "react";

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
      <div className="grid lg:grid-cols-12">
        <div className=" hidden lg:block 2xl:col-span-1 2xl:min-w-[10vw] overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
          {SideBar}
        </div>

        <div className="col-span-10 2xl:col-span-11 p-4 lg:p-12">
          {children}
        </div>
      </div>
    </div>
  );
};
