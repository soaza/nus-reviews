import React, { useState } from "react";
import { FilterBarTab } from "./FilterBarTab";

export const FilterBar = () => {
  const TAB_CATEGORIES = [
    {
      name: "most_reviewed",
      label: "🔥 Most Reviewed Modules",
    },
    {
      name: "top_rated_modules",
      label: "🌟 Top Rated Modules",
    },
    {
      name: "top_rated_general_modules",
      label: "📚 Top Rated General Modules",
    },
  ];

  const [selectedTab, setSelectedTab] = useState("most_reviewed");

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-white">
      {TAB_CATEGORIES.map((category) => {
        return (
          <FilterBarTab
            active={selectedTab === category.name}
            category={category}
            setSelectedTab={setSelectedTab}
          />
        );
      })}
    </ul>
  );
};
