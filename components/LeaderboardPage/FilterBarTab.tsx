import React from "react";
import { useLeaderboardStore } from "../../zustand/store";

export const FilterBarTab = (props: { category; active }) => {
  const { category, active } = props;
  const setCategory = useLeaderboardStore((state) => state.setCategory);

  return (
    <>
      <li className="mr-2">
        <div
          onClick={() => setCategory(category.name)}
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
