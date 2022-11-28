import moment from "moment";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import { SemesterData } from "./nus_module_interfaces";

export const ratingTypes = [
  "difficulty",
  "workload",
  "practicality",
  "enjoyability",
];

export const initialRatings = {
  difficulty: 0,
  workload: 0,
  practicality: 0,
  enjoyability: 0,
};

export const parseModuleSemesterData = (semesterData: SemesterData[]) => {
  const mappedSemesters = semesterData.map((semester, index) => {
    const semesterNumber = semester.semester;
    const semesterMap = {
      1: "Semester 1",
      2: "Semester 2",
      3: "Special Term I",
      4: "Special Term II",
    };
    if (index == semesterData.length - 1) {
      return `${semesterMap[semesterNumber]}`;
    }

    return `${semesterMap[semesterNumber]} | `;
  });

  return mappedSemesters.join("");
};

export const generateUniqueUserName = () => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
  });

  return "anonymous_" + randomName;
};

export const calculateTotalScore = (values) => {
  return parseInt(
    ratingTypes.reduce((x, y) => {
      return x + values[y];
    }, 0)
  );
};

export const calculateOverallScore = (values) => {
  return (
    parseFloat(
      ratingTypes.reduce((sum, ratingType) => {
        return sum + values[ratingType];
      }, 0)
    ) / 4
  );
};

export const parseDate = (date: Date) => {
  return moment(date).format("DD-MM-YYYY, hh:mm A");
};

export const capitaliseWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
