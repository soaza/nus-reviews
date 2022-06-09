import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Divider } from "../../components/common/Divider";
import { FilterDropdown } from "../../components/modulePage/FilterDropdown";
import { OverallRating } from "../../components/modulePage/OverallRating";
import { Ratings } from "../../components/modulePage/Ratings";
import { Review } from "../../components/modulePage/Review";
import { SemesterData } from "../../utils/interfaces";
import { getModule } from "../api/api";

const ModulePage = () => {
  const router = useRouter();
  const pageModuleCode = router.query.module_code as string;

  const { data: module } = useQuery(["module", pageModuleCode], async () => {
    const data = await getModule(pageModuleCode?.toUpperCase());
    return data;
  });

  if (!module) {
    return <div> Module not found.</div>;
  }

  const parseModuleSemesterData = (semesterData: SemesterData[]) => {
    const mappedSemesters = semesterData.map((semester, index) => {
      const semesterNumber = semester.semester;
      const semesterMap = {
        1: "Semester 1",
        2: "Semester 2",
        3: "Special Term I",
        4: "Special Term II",
      };
      if (index == semesterData.length - 1) {
        return `${semesterMap[semesterNumber]}`;
      }

      return `${semesterMap[semesterNumber]} | `;
    });

    return mappedSemesters.join("");
  };

  return (
    <>
      {module && (
        <div className=" flex-col">
          <div className=" text-gray-400 font-bold text-4xl">
            {module.moduleCode}
          </div>

          <div className="font-medium text-4xl mb-4">{module.title}</div>

          <div className="text-xl">
            {parseModuleSemesterData(module.semesterData)}
          </div>
          <Divider />

          <div className="grid lg:grid-cols-12 gap-4 lg:divide-x-4">
            <div className="col-span-12 lg:col-span-4 flex gap-4 flex-col overflow-y-auto">
              <div>{module.description}</div>

              <div>
                <div className="font-medium text-xl">Prerequisite</div>
                <div>{module.prerequisite}</div>
              </div>
              <div>
                <div className="font-medium text-xl">Preclusion</div>
                <div>{module.preclusion}</div>
              </div>

              <OverallRating />

              <a
                className="text-center bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-md text-sm font-medium  p-2"
                target="_blank"
                href={`https://nusmods.com/modules/${module.moduleCode}`}
              >
                Find out more on NUSMods
              </a>
            </div>

            <div className="col-span-12 lg:col-span-8 lg:p-8 lg:h-screen lg:overflow-y-auto">
              <>
                <div className="flex justify-between">
                  <div className="font-medium text-center text-2xl mb-4">
                    376 Reviews
                  </div>

                  <FilterDropdown />
                </div>

                {[0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
                  <Review />
                ))}
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModulePage;
