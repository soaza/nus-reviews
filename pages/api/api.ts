import axios from "axios";
import { IModuleInformation } from "../../utils/interfaces";

const BASE_URL = process.env.NEXT_PUBLIC_NUS_MODS_API;
interface IFetchWrapper {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

const axiosWrapper = ({ url, method }: IFetchWrapper) => {
  switch (method) {
    case "GET":
      const res = axios.get(`${BASE_URL}/${url}`).then((res) => {
        return res.data;
      });
      return res;

    case "POST":
      break;

    case "PUT":
      break;

    case "DELETE":
      break;
  }
};

export const getAllModules: () => Promise<{
  companies: IModuleInformation[];
}> = async () => {
  const res = await axiosWrapper({
    url: "2021-2022/moduleList.json",
    method: "GET",
  });

  return res;
};

// export const getCompanies: () => Promise<{
//   companies: ICompany[];
// }> = async () => {
//   const res = await axiosWrapper({ url: "companies", method: "GET" });

//   return res;
// };
