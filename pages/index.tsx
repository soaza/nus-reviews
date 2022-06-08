import { useQuery } from "react-query";
import { getAllModules } from "./api/api";

const IndexPage = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "modules",
    async () => {
      // const data = await getAllModules();
      // console.log({ data });
    }
  );

  return <h1>Hello Next.js 👋</h1>;
};
export default IndexPage;
