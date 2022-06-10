import { Formik } from "formik";
import router from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllModules } from "../../pages/api/api";
import { ratingTypes } from "../../utils/common";
import useDebounce from "../../utils/hooks";
import { IModuleInformation } from "../../utils/interfaces";
import { OverallRatingScore } from "../common/OverallRatingScore";

export const NewUserModuleForm = () => {
  const initialRatings = {
    Difficulty: 0,
    Workload: 0,
    Practicality: 0,
    Enjoyability: 0,
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const [modulesFiltered, setModulesFiltered] = useState<IModuleInformation[]>(
    []
  );

  const debouncedSearch = useDebounce(searchKeyword, 0);

  const { isLoading } = useQuery(["modules", debouncedSearch], async () => {
    if (searchKeyword) {
      const data = await getAllModules();
      setModulesFiltered(
        data
          .filter((module) =>
            module.moduleCode.includes(searchKeyword.toUpperCase())
          )
          .splice(0, 5)
      );
    }
  });

  const calculateOverallScore = (values) => {
    return (
      parseFloat(
        ratingTypes.reduce((x, y) => {
          return x + values[y];
        }, 0)
      ) / 4
    );
  };

  return (
    <Formik
      initialValues={{ ...initialRatings, module_code: "" }}
      validate={(values) => {
        const errors: any = {};
        if (!values.module_code || !searchKeyword) {
          errors.module_code = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
        router.push("/new-user/complete");
      }}
    >
      {({
        values,
        errors,
        setValues,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded px-8 pt-6 pb-8"
        >
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Module
            </label>
            <input
              autoComplete="off"
              className=" appearance-none border rounded w-full lg:w-[50vw] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => setSearchKeyword(e.target.value)}
              value={searchKeyword}
              name="module_code"
              placeholder="Module"
            />
            {searchKeyword && modulesFiltered.length > 0 && (
              <ul className="absolute bg-white border border-gray-100 w-[70vw] lg:w-[50vw]">
                {modulesFiltered.map((module, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setValues({
                          ...values,
                          module_code: module.moduleCode,
                        });
                        setSearchKeyword(
                          `${module.moduleCode}: ${module.title}`
                        );
                      }}
                      className="pl-4 pr-2 py-1  border-gray-100 relative cursor-pointer hover:bg-blue-200 hover:text-gray-900"
                    >
                      {`${module.moduleCode}: ${module.title}`}
                    </li>
                  );
                })}
              </ul>
            )}
            {errors.module_code && (
              <div className="text-red-400 text-sm font-bold">
                *{errors.module_code}
              </div>
            )}
          </div>

          {ratingTypes.map((ratingType, index) => {
            return (
              <div key={index} className="mb-6 ">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {ratingType}
                </label>
                <div className="flex flex-row gap-4 align-middle">
                  <input
                    type="range"
                    name={ratingType}
                    min="0"
                    max="5"
                    value={values[ratingType]}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className=" text-base text-gray-400">
                    {values[ratingType]}/5
                  </div>
                </div>
              </div>
            );
          })}

          <div className="text-center text-gray-400">
            Overall Score :{" "}
            <OverallRatingScore
              score={calculateOverallScore(values)}
              hideText
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold dark:text-gray-300">
              Review (optional)
            </label>
            <textarea
              className="block w-full p-4 border border-gray-300 rounded-lg bg-gray-50 h-[30vh] sm:text-md focus:ring-blue-500 focus:border-blue-500 "
              name="review"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
