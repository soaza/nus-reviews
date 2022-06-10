import { SemesterData } from "./interfaces";

export const ratingTypes = [
  "Difficulty",
  "Workload",
  "Practicality",
  "Enjoyability",
];

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
