import { Formik } from "formik";
import router from "next/router";
import React, { useContext, useState } from "react";
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
import { DescriptionEditor } from "../SubmitReviewPage/DescriptionEditor";

export const NewUserModuleForm = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [description, setDescription] = useState("");
  const [modulesFiltered, setModulesFiltered] = useState<IModuleInformation[]>(
    []
  );

  const { user } = useContext(UserContext);

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

  return (
    <Formik
      initialValues={{
        ...initialRatings,
        review_module_code: "",
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.review_module_code || !searchKeyword) {
          errors.review_module_code = "Required";
        }
        return errors;
      }}
      onSubmit={(values) => {
        const uploadFormData = async () => {
          const { data, error } = await supabase.from("Reviews").insert([
            {
              review_user: user.user_uuid,
              total_score: calculateTotalScore(values),
              review_description: description,
              ...values,
            },
          ]);
          popNotification("Review submitted!");
          if (data) {
            router.push("/new-user/complete");
          }
        };
        uploadFormData();
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        // }, 400);
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
              autoComplete="off"
              className=" appearance-none border rounded w-full lg:w-[50vw] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
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
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
