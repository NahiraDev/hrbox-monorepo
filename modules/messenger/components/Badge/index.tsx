import React from "react";
import { BadgeProps } from "./types";

const UiBadge: React.FC<BadgeProps> = ({ initialCount, isMuted, panel }) => {
  const baseClasses = "flex justify-center items-center rounded-lg";
  let backgroundColor = "";
  let textColor = "";
  const activeBg =
    panel === "organization" ? "bg-primary-400" : "bg-secondary-400";
  backgroundColor = isMuted
    ? "bg-netural-100 dark:bg-netural-700"
    : `${activeBg} dark:bg-surface-200`;

  textColor = isMuted
    ? "text-netural-400 dark:text-netural-100"
    : "text-white";
  const displayCount = initialCount > 99 ? "+99" : initialCount;
  const isTwoDigitOrLess = displayCount.toString().length <= 2;
  const dynamicClasses = isTwoDigitOrLess ? "" : "";
  return (
    <div className={`${baseClasses} ${backgroundColor} ${dynamicClasses}`}>
      <span
        className={`${textColor} px-1 text-center font-Inter text-[10px] font-normal leading-[14px]`}
      >
        {displayCount}
      </span>
    </div>
  );
};
export default UiBadge;
