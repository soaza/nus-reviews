import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllModules } from "../../pages/api/api";
import {
  calculateOverallScore,
  calculateTotalScore,
  capitaliseWord,
  initialRatings,
  ratingTypes,
} from "../../utils/common";
import { UserContext } from "../../utils/context";
import useDebounce from "../../utils/hooks";
import { IModuleInformation } from "../../utils/nus_module_interfaces";
import { supabase } from "../../utils/supabase";
import { OverallRatingScore } from "../common/OverallRatingScore";
import { popNotification } from "../common/ToastNotif";
import { DescriptionEditor } from "./DescriptionEditor";

export const SubmitReviewForm = () => {
  const router = useRouter();
  const predefinedModule = router.query.module
    ? (router.query.module as string)
    : "";

  const [searchKeyword, setSearchKeyword] = useState(predefinedModule);
  const [description, setDescription] = useState("");
  const [modulesFiltered, setModulesFiltered] = useState<IModuleInformation[]>(
    []
  );

  useEffect(() => {
    if (router.query.module) {
      setSearchKeyword(router.query.module as string);
    }
  }, [predefinedModule]);

  const { user } = useContext(UserContext);
  const debouncedSearch = useDebounce(searchKeyword, 0);
  useQuery(["modules", debouncedSearch], async () => {
    if (searchKeyword && !predefinedModule) {
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

  return (
    <Formik
      initialValues={{
        ...initialRatings,
        review_module_code: predefinedModule,
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.review_module_code || !searchKeyword) {
          errors.review_module_code = "Required";
        }
        if (predefinedModule) {
          delete errors.review_module_code;
        }
        return errors;
      }}
      onSubmit={(values) => {
        if (predefinedModule) {
          values = { ...values, review_module_code: predefinedModule };
        }
        const uploadFormData = async () => {
          const totalScore = calculateTotalScore(values);
          await supabase.from("Reviews").insert([
            {
              review_user: user?.user_uuid,
              total_score: totalScore,
              review_description: description,
              ...values,
            },
          ]);

          popNotification("Review submitted!");
        };

        uploadFormData();
        router.push("/submit-review/complete");
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
        <form onSubmit={handleSubmit} className="bg-white rounded pt-6 pb-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Module
            </label>
            <input
              disabled={predefinedModule !== ""}
              autoComplete="off"
              className=" appearance-none border rounded w-full lg:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => setSearchKeyword(e.target.value)}
              value={searchKeyword}
              name="review_module_code"
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
                          review_module_code: module.moduleCode,
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

            {errors.review_module_code && (
              <div className="text-red-400 text-sm font-bold">
                *{errors.review_module_code}
              </div>
            )}
          </div>

          {ratingTypes.map((ratingType, index) => {
            return (
              <div key={index} className="mb-6 ">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {capitaliseWord(ratingType)}
                </label>
                <div className="flex flex-row gap-4 align-middle">
                  <input
                    type="range"
                    name={ratingType}
                    min="0"
                    max="5"
                    value={values[ratingType]}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
            <label className="block mb-2 text-sm font-bold ">
              Review (optional)
            </label>

            <DescriptionEditor setDescription={setDescription} />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="w-full lg:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
