import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Divider } from "../../components/common/Divider";
import { OverallRating } from "../../components/ModulePage/OverallRating";
import { Reviews } from "../../components/ModulePage/Reviews";
import { parseModuleSemesterData } from "../../utils/common";
import { getModule } from "../api/api";

const ModulePage = () => {
  const router = useRouter();
  const pageModuleCode = router.query.module_code as string;

  const { data: module } = useQuery(["module", pageModuleCode], async () => {
    if (pageModuleCode) {
      const data = await getModule(pageModuleCode?.toUpperCase());
      return data;
    }
  });

  if (!module) {
    return <div> Module not found.</div>;
  }

  const leftSection = (
    <>
      <div>{module.description}</div>

      <div>
        <div className="font-medium text-xl">Prerequisite</div>
        <div>{module.prerequisite ? module.prerequisite : "-"}</div>
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
    </>
  );
  const rightSection = (
    <>
      <Reviews moduleCode={module.moduleCode} />
      {/* {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => (
        <Review key={index} />
      ))} */}
    </>
  );

  return (
    <>
      {module && (
        <div className=" flex-col">
          <div className=" text-gray-400 font-bold text-4xl">
            {module.moduleCode}
          </div>

          <div className="font-medium text-4xl mb-2">{module.title}</div>
          <div className="text-xl">{module.moduleCredit} MCs</div>

          <div className="text-xl">
            {parseModuleSemesterData(module.semesterData)}
          </div>
          <Divider />

          <div className="grid lg:grid-cols-12 gap-4 lg:divide-x-2">
            <div className="col-span-12 lg:col-span-5 flex gap-4 flex-col overflow-y-auto">
              {leftSection}
            </div>

            <div className="col-span-12 lg:col-span-7 lg:p-8 lg:h-screen lg:overflow-y-auto">
              {rightSection}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModulePage;
