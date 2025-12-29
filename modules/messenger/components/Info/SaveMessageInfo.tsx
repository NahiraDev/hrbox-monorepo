import { Avatar } from "@heroui/react";
import InfoLayout from ".";
import InfoTabs from "./InfoTabs";

export default function SaveMessageInfo() {
  const myProfile = JSON.parse(localStorage.getItem("profile") || "{}");
  return (
    <InfoLayout>
      <div className="space-y-6 mb-7">
        <div className="flex gap-2 items-center">
          <span className="dark:text-white text-secondary-1000 text-sm font-normal leading-normal">
            Save Messages
          </span>
        </div>
        <div className="flex justify-center">
          <Avatar
            src={myProfile?.image}
            className="w-[72px] h-[72px] rounded-6 bg-surface-200"
          />
        </div>
      </div>
      <div className="space-y-1 flex flex-col text-center mb-3">
        <span className="dark:text-white text-secondary-1000 font-normal text-sm block">
          Saved Messages
        </span>
      </div>

      <InfoTabs />
    </InfoLayout>
  );
}
