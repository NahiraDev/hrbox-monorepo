import React from "react";
import { useDarkMode } from "../../context/DarkMode";
import { BadgeProps } from "./types";

const UiBadge: React.FC<BadgeProps> = ({ initialCount, isMuted, panel }) => {
  const { darkMode } = useDarkMode();
  const baseClasses = "flex justify-center items-center rounded-lg";
  let backgroundColor = "";
  let textColor = "";
  if (panel === "organization") {
    if (darkMode) {
      backgroundColor = isMuted ? "bg-netural-700" : "bg-surface-200";
      textColor = isMuted ? "text-netural-100" : "text-white";
    } else {
      backgroundColor = isMuted ? "bg-netural-100" : "bg-primary-400";
      textColor = isMuted ? "text-netural-400" : "text-white";
    }
  } else if (panel === "jobSeeker") {
    if (darkMode) {
      backgroundColor = isMuted ? "bg-netural-700" : "bg-surface-200";
      textColor = isMuted ? "text-netural-100" : "text-white";
    } else {
      backgroundColor = isMuted ? "bg-netural-100" : "bg-secondary-400";
      textColor = isMuted ? "text-netural-400" : "text-white";
    }
  }
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
