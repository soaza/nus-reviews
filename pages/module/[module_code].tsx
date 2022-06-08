import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IModuleInformation } from "../../utils/interfaces";
import { getModule } from "../api/api";

const ModulePage = () => {
  const router = useRouter();
  const pageModuleCode = router.query.module_code as string;

  const { data } = useQuery(["module", pageModuleCode], async () => {
    const data = await getModule(pageModuleCode.toUpperCase());
    return data;
  });

  if (!data) {
    return <div> Module not found.</div>;
  }

  return (
    <>
      {data && (
        <div className=" flex-col gap-4">
          <div className=" text-gray-500 font-bold text-4xl">
            {data.moduleCode}
          </div>

          <div className=" font-medium text-4xl">{data.title}</div>

          <div>{data.description}</div>
        </div>
      )}
    </>
  );
};

export default ModulePage;
