import { useQuery } from "react-query";
import LandingPageImage from "../assets/images/landing-page.svg";
import Image from "next/image";

const IndexPage = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "modules",
    async () => {
      // const data = await getAllModules();
      // console.log({ data });
    }
  );

  return (
    <div className="flex flex-row justify-center">
      <div className="w-1/2">
        <Image src={LandingPageImage} alt="Picture of the author" />
      </div>

      <div className="w-1/2">
        <div className=" font-bold text-6xl">NUSReviews</div>
        <div className=" font-medium text-2xl text-gray-400">
          Read module reviews from the NUS community and submit your own!
        </div>
      </div>
    </div>
  );
};
export default IndexPage;
