import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

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

// export const getCompanies: () => Promise<{
//   companies: ICompany[];
// }> = async () => {
//   const res = await axiosWrapper({ url: "companies", method: "GET" });

//   return res;
// };
