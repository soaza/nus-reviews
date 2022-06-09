import React, { useState } from "react";

export const NewUserModuleForm = () => {
  const [range, setRange] = useState(0);

  const ratings = [
    { ratingType: "Difficulty", rating: 5 },
    { ratingType: "Workload", rating: 3 },
    { ratingType: "Practicality", rating: 4 },
    { ratingType: "Enjoyability", rating: 4 },
  ];

  return (
    <form className="bg-white rounded px-8 pt-6 pb-8">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Module
        </label>
        <input
          className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="module"
          type="text"
          placeholder="Module"
        />
      </div>

      {ratings.map((rating) => {
        return (
          <div className="mb-6 ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {rating.ratingType}
            </label>
            <div className="flex flex-row gap-4 align-middle">
              <input
                id="minmax-range"
                type="range"
                min="0"
                max="5"
                value={range}
                onChange={(e) => setRange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className=" text-base text-gray-400">{range}/5</div>
            </div>
          </div>
        );
      })}

      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold dark:text-gray-300">
          Review
        </label>
        <textarea className="block w-full p-4  border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 " />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
