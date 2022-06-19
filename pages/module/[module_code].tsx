import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Divider } from "../../components/common/Divider";
import { OverallRating } from "../../components/ModuleCodePage/OverallRating";
import { Reviews } from "../../components/ModuleCodePage/Reviews";
import { parseModuleSemesterData } from "../../utils/common";
import { getModule } from "../api/api";

const ModuleCodePage = () => {
  const router = useRouter();
  const pageModuleCode = router.query.module_code as string;

  const { data: module, isLoading } = useQuery(
    ["module", pageModuleCode],
    async () => {
      if (pageModuleCode) {
        const data = await getModule(pageModuleCode?.toUpperCase());
        return data;
      }
    }
  );

  if (!module && !isLoading) {
    return <div> Module not found.</div>;
  }

  const leftSection = (
    <>
      {module && (
        <div className="">
          <div className="break-words">{module.description}</div>

          <div>
            <div className="font-medium text-xl w-3/4 break-words">
              Prerequisite
            </div>
            <div>{module.prerequisite ? module.prerequisite : "-"}</div>
          </div>
          <div>
            <div className="font-medium text-xl ">Preclusion</div>
            <div className="w-3/4 break-words">{module.preclusion}</div>
          </div>

          <OverallRating moduleCode={module.moduleCode} />

          <div className="flex flex-col gap-4">
            <a
              className="text-center bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-md text-sm font-medium  p-2"
              target="_blank"
              rel="noreferrer"
              href={`https://nusmods.com/modules/${module.moduleCode}`}
            >
              Find out more on NUSMods
            </a>

            <Link href={`/submit-review?module=${module.moduleCode}`}>
              <button className="text-center bg-blue-100 hover:bg-blue-200  text-blue-700 rounded-md text-sm font-medium  p-2">
                Submit a review
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
  const rightSection = (
    <>{module && <Reviews moduleCode={module.moduleCode} />}</>
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

            <div className=" col-span-12 lg:col-span-7 lg:p-8 lg:h-screen lg:overflow-y-auto">
              {rightSection}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModuleCodePage;
