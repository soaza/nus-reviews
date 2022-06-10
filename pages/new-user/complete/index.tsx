import React from "react";
import Image from "next/image";
import LovingImage from "../../../assets/images/loving.svg";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";

const NewUserCompletePage = () => {
  return (
    <div className="flex justify-center flex-col mt-[5vh] lg:mt-[5vh] text-center">
      <div className="text-5xl font-semibold mb-4">
        {" "}
        Thanks for submitting your review!
      </div>

      <p className="text-xl lg:text-3xl font-light">
        Every review contributes to our community
      </p>

      <div className="w-full lg:w-1/3 place-self-center">
        <Image src={LovingImage} />
      </div>

      <Link href="/">
        <div className="text-xl cursor-pointer lg:text-3xl font-light hover:bg-gray-100 border-black border-2 rounded-md p-1 w-[60vw] lg:w-[40vw] place-self-center  ">
          To the home page!
        </div>
      </Link>
    </div>
  );
};

export default NewUserCompletePage;
