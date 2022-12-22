import React from "react";

export const FilterBarTab = (props: { category; active; setSelectedTab }) => {
  const { category, active, setSelectedTab } = props;

  return (
    <>
      <li className="mr-2">
        <div
          onClick={() => setSelectedTab(category.name)}
          className={`mt-4 py-3 px-4 cursor-pointer ${
            active
              ? "bg-black text-white"
              : "bg-white border-black border text-black hover:bg-gray-200"
          } rounded-lg `}
          aria-current="page"
        >
          {category.label}
        </div>
      </li>
    </>
  );
};
