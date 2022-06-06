import React from "react";
import { useQuery } from "react-query";
import { getModule } from "../api/api";

const ModulePage = () => {
  const {
    isLoading,
    isError,
    data: module,
    error,
    refetch,
  } = useQuery("modules", async () => {
    const data = await getModule("CS1101S");
    return data;
  });

  return (
    <div>
      {module && <h1 className=" font-bold text-6xl">{module.title}</h1>}
    </div>
  );
};

export default ModulePage;
