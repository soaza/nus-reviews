import React from "react";
import { SubmitReviewForm } from "../../components/SubmitReviewPage/SubmitReviewForm";
import SittingImage from "../../assets/images/sitting-reading.svg";
import Image from "next/image";
import { NextPage } from "next";

const criterias = [
  {
    criteria: "Difficulty",
    description: `How difficult the
module is, this can be in terms of how much technical or conceptual
understanding is requried to ace the module`,
  },
  {
    criteria: "Workload",
    description: `How much workload the module entails, this can be in
    terms of the amount of submissions weekly, over the semester or simply
    the number of hours of commitment the module requires`,
  },
  {
    criteria: "Practicality",
    description: `How much practical benefit the module brings to
    the student, this can be in terms of the learning experience from the
    module which can be applied in a work environment.`,
  },
  {
    criteria: "Enjoyability",
    description: `How much fun the module entails, simply put: how
    much the student enjoys taking this module!`,
  },
];

export const SubmitReviewPage: NextPage = () => {
  return (
    <div className="lg:grid grid-cols-12 gap-12">
      <div className="col-span-5 flex align-middle flex-col gap-4 ">
        <div className="text-5xl font-semibold">Submitting a review</div>

        <p className="text-md lg:text-lg font-light">
          Our reviews are based on 4 criterias:{" "}
        </p>

        {criterias.map((criteriaObj, index) => {
          return (
            <p key={index} className="text-md lg:text-lg font-light">
              <span className="font-bold ">{criteriaObj.criteria}:</span>{" "}
              {criteriaObj.description}
            </p>
          );
        })}

        <Image height={500} src={SittingImage} />
      </div>

      <div className="col-span-6 p-2 lg:12">
        <SubmitReviewForm />
      </div>
    </div>
  );
};

export default SubmitReviewPage;
