import { Avatar } from "@nextui-org/react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import InfoTabs from "./InfoTabs";
import InfoLayout from ".";
import { CopyId } from "../CopyID";
import Notification from "../Notifications";

export default function ContactInfo() {
  const info = useSelector((state: RootState) => state.profile.profile);
  return (
    <InfoLayout>
      <div className="space-y-6 mb-7">
        <div className="flex gap-2 items-center">
          <span className="dark:text-white text-secondary-1000 text-sm font-normal leading-normal">
            Contact Info
          </span>
        </div>
        <div className="flex justify-center">
          <Avatar
            src={info?.image}
            className="w-[72px] h-[72px] !rounded-6 bg-surface-200"
          />
        </div>
      </div>
      <div className="flex flex-col text-center mb-8">
        <span className="dark:text-white text-secondary-1000 font-normal text-sm">
          {info?.name}
        </span>
      </div>
      <div className="space-y-0.5">
        <span className="dark:text-white text-secondary-1000 text-sm leading-normal font-semibold">
          Description
        </span>
        <p className="dark:text-white text-secondary-1000 leading-normal text-xs font-light">
          {info?.description}
        </p>
      </div>
      <CopyId />
      <Notification />
      <InfoTabs />
    </InfoLayout>
  );
}
