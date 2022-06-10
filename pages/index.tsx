import LandingPageImage from "../assets/images/landing-page.svg";
import Image from "next/image";
import { Searchbar } from "../components/LandingPage/Searchbar";

const IndexPage = () => {
  return (
    <div className="lg:flex flex-row justify-center">
      <div className="w-full lg:w-1/2">
        <Image src={LandingPageImage} />
      </div>

      <div className="w-full lg:w-1/2 place-content-center flex flex-col align-middle gap-5">
        <div className="font-bold text-5xl">NUSReviews</div>
        <div className="font-light text-xl text-gray-400">
          Read module reviews from the NUS community and submit your own!
        </div>

        <Searchbar />
      </div>
    </div>
  );
};
export default IndexPage;
