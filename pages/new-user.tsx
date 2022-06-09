import React from "react";
import { NewUserModuleForm } from "../components/NewUserPage/NewUserModuleForm";

const NewUser = () => {
  return (
    <div className="lg:grid grid-cols-12">
      <div className="col-span-5 flex align-middle flex-col mt-[5vh] lg:mt-[20vh]">
        <div className="text-5xl font-semibold"> Welcome to NUSReviews</div>
        <p className="text-xl lg:text-3xl font-light">
          We noticed this is your first time visiting us!
        </p>
        <p className="text-xl lg:text-3xl font-light">
          To ensure a continuity of reviews, we require new users to submit a
          review for a module they have take in the past.
        </p>
      </div>

      <div className="col-span-7 p-2 lg:12">
        <NewUserModuleForm />
      </div>
    </div>
  );
};

export default NewUser;
