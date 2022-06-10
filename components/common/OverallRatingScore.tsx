import React from "react";

export const OverallRatingScore = (props: {
  score: number;
  hideText?: boolean;
}) => {
  const { score, hideText } = props;

  const scoreColor = () => {
    switch (true) {
      case score < 2:
        return "red";
      case score < 3.5:
        return "blue";
      case score <= 5:
        return "green";
      default:
        return "white";
    }
  };

  const scoreText = () => {
    switch (true) {
      case score < 2:
        return "Poor";
      case score < 3.5:
        return "Average";
      case score < 5:
        return "Excellent";
      default:
        return "Excellent";
    }
  };

  return (
    <>
      <p
        className={`bg-${scoreColor()}-100 text-${scoreColor()}-800  text-sm font-semibold inline-flex items-center p-1.5 rounded `}
      >
        {score.toFixed(1)}
      </p>

      {!hideText && (
        <p className="ml-2 font-medium text-gray-900 dark:text-white">
          {scoreText()}
        </p>
      )}
    </>
  );
};
