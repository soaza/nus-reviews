import React from "react";
import { FilterBarTab } from "./FilterBarTab";

export const FilterBar = (props: { selectedTab }) => {
  const { selectedTab } = props;

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
    {
      name: "top_rated_cs_modules",
      label: "🤖 Top Rated CS Modules",
    },
  ];

  return (
    <ul className="flex flex-col lg:flex-row flex-wrap text-sm font-medium text-center text-white">
      {TAB_CATEGORIES.map((category, index) => {
        return (
          <FilterBarTab
            key={index}
            active={selectedTab === category.name}
            category={category}
          />
        );
      })}
    </ul>
  );
};
