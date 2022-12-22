import React from "react";
import { FilterBarTab } from "./FilterBarTab";

export const FilterBar = (props: { selectedTab; setSelectedTab }) => {
  const { selectedTab, setSelectedTab } = props;

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

  return (
    <ul className="flex flex-col lg:flex-row flex-wrap text-sm font-medium text-center text-white">
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
