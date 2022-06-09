import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllModules } from "../../pages/api/api";

export const Searchbar = () => {
  const [keyword, setKeyword] = useState("");
  const [modulesFiltered, setModulesFiltered] = useState([]);

  useQuery(["modules", keyword], async () => {
    if (keyword) {
      const data = await getAllModules();
      setModulesFiltered(
        data
          .filter((module) => module.moduleCode.includes(keyword.toUpperCase()))
          .map((module) => module.moduleCode)
          .splice(0, 5)
      );
    }
  });

  return (
    <div>
      <input
        onChange={(e) => setKeyword(e.target.value)}
        type="text"
        name="name"
        placeholder="Search modules..."
        className="relative w-[90vw] lg:w-[25vw] py-2 border-b-2 border-black outline-none focus:border-gray-400 text-xl"
      />

      {keyword && modulesFiltered.length > 0 && (
        <ul className="absolute bg-white border border-gray-100 w-[90vw] lg:w-[25vw] mt-2">
          {modulesFiltered.map((module) => {
            return (
              <li className="pl-4 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                <b>{keyword}</b> {module}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
