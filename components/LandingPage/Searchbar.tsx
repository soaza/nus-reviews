import Module from "module";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllModules } from "../../pages/api/api";
import useDebounce from "../../utils/hooks";
import { IModuleInformation } from "../../utils/interfaces";

export const Searchbar = () => {
  const [keyword, setKeyword] = useState("");
  const [modulesFiltered, setModulesFiltered] = useState<IModuleInformation[]>(
    []
  );
  const debouncedSearch = useDebounce(keyword, 500);

  const { isLoading } = useQuery(["modules", debouncedSearch], async () => {
    if (keyword) {
      const data = await getAllModules();
      setModulesFiltered(
        data
          .filter((module) =>
            module.moduleCode.toUpperCase().includes(keyword.toUpperCase())
          )
          .splice(0, 5)
      );
    }
  });

  return (
    <div>
      <div className="flex-row flex">
        <input
          autoComplete="off"
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          name="name"
          placeholder="Search module code"
          className="font-light relative w-[90vw] lg:w-[25vw] py-2 border-b-2 border-black outline-none focus:border-gray-400 text-xl"
        />
      </div>

      {keyword && modulesFiltered.length > 0 && (
        <ul className="absolute bg-white border border-gray-100 w-[90vw] lg:w-[25vw] mt-2">
          {modulesFiltered.map((module) => {
            return (
              <Link href={`/module/${module.moduleCode}`}>
                <li className="pl-4 pr-2 py-1  border-gray-100 relative cursor-pointer hover:bg-blue-200 hover:text-gray-900">
                  {`${module.moduleCode}: ${module.title}`}
                </li>
              </Link>
            );
          })}
        </ul>
      )}

      {isLoading && (
        <ul className="absolute bg-white border border-gray-100 w-[90vw] lg:w-[25vw] mt-2">
          <li className="pl-4 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-blue-50 hover:text-gray-900">
            Loading...
          </li>
        </ul>
      )}
    </div>
  );
};
