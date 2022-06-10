import React from "react";
import { NewUserModuleForm } from "../../components/NewUserPage/NewUserModuleForm";
import Coffee from "../../assets/images/coffee.svg";
import Image from "next/image";

const NewUser = () => {
  return (
    <div className="lg:grid grid-cols-12 gap-12">
      <div className="col-span-5 flex align-middle flex-col gap-4 mt-[5vh] lg:mt-[5vh]">
        <div className="text-5xl font-semibold mb-2">
          {" "}
          Welcome to NUSReviews
        </div>
        <p className="text-md lg:text-lg font-light">
          We notice this is your first time visiting us!
        </p>

        <p className="text-md lg:text-lg font-light mb-4 lg:mb-20">
          To ensure a continuity of reviews, we require new users to submit a
          review for a module they have taken in the past.
        </p>

        <Image height={500} src={Coffee} />
      </div>

      <div className="col-span-7 p-2 lg:12">
        <NewUserModuleForm />
      </div>
    </div>
  );
};

export default NewUser;
