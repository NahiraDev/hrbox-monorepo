import { useSelector } from "react-redux";

import { SupportIcon } from "@hrbox/shared-templates";
import { RootState } from "@hrbox/shared-templates";

export const AppSupportButton = () => {
  const lang = useSelector((state: RootState) => state.language.lang);
  return (
    <button
      className={`rounded-full bg-[linear-gradient(0deg,_#900F2E_0%,_#FD1B51_126.58%)] shadow-[0px_1.417px_4.253px_rgba(0,0,0,0.3)] absolute ${lang === "fa" ? "left-10" : "right-10"} bottom-10 w-[72px] h-[72px] backdrop-opacity-5 flex justify-center items-center z-[1000]`}
    >
      <SupportIcon />
    </button>
  );
};
