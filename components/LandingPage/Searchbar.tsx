import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllModules } from "../../utils/api";
import useDebounce, { useKeyPress } from "../../utils/hooks";
import { IModuleInformation } from "../../utils/nus_module_interfaces";
import router from "next/router";

export const Searchbar = () => {
  const [keyword, setKeyword] = useState("");
  const [modulesFiltered, setModulesFiltered] = useState<IModuleInformation[]>(
    []
  );
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");

  useEffect(() => {
    if (modulesFiltered.length && downPress) {
      setHighlightedIndex((prevState) =>
        prevState < modulesFiltered.length - 1 ? prevState + 1 : 0
      );
    }
  }, [downPress]);

  useEffect(() => {
    if (modulesFiltered.length && upPress) {
      setHighlightedIndex((prevState) =>
        prevState > 0 ? prevState - 1 : modulesFiltered.length - 1
      );
    }
  }, [upPress]);

  useEffect(() => {
    if (modulesFiltered.length && enterPress) {
      router.push(`/module/${modulesFiltered[highlightedIndex].moduleCode}`);
    }
  }, [highlightedIndex, enterPress]);

  useEffect(() => {
    if (modulesFiltered.length && hovered) {
      setHighlightedIndex(modulesFiltered.indexOf(hovered));
    }
  }, [hovered]);

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
          {modulesFiltered.map((module, index) => {
            return (
              <Link key={index} href={`/module/${module.moduleCode}`}>
                <li
                  onMouseEnter={() => setHovered(module)}
                  onMouseLeave={() => setHovered(undefined)}
                  className={`${
                    highlightedIndex == index ? "bg-blue-200" : ""
                  } pl-4 pr-2 py-1  border-gray-100 relative cursor-pointer hover:bg-blue-200 hover:text-gray-900`}
                >
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
