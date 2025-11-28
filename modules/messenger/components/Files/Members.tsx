import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Profile } from "iconsax-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MemberAction from "./Action";
import { useState } from "react";
import { GroupAndChannelTypes, MemberTypes } from "../../types";

// Reusable Member component to display each member's profile and actions
const MemberItem = ({
  member,
  index,
  isOpen,
  setOpenMemberId,
}: {
  member: MemberTypes;
  index: number;
  isOpen: boolean;
  setOpenMemberId: React.Dispatch<React.SetStateAction<number | null>>;
}) => (
  <Popover
    key={index}
    placement="bottom"
    isOpen={isOpen}
    onOpenChange={() => setOpenMemberId(isOpen ? null : index)}
  >
    <PopoverTrigger>
      <div className="flex justify-start gap-3 items-center cursor-pointer">
        <div className="flex justify-center items-center">
          <div className="rounded-lg w-[38px] h-[38px] p-2 bg-primary-400 dark:hover:bg-surface-200">
            <Profile size="20" color="white" variant="Bold" />
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-1">
          <span className="font-semibold text-[10px] leading-4 dark:text-white text-secondary-1000">
            {member?.name}
          </span>
          <span className="font-light text-[10px] leading-4 dark:text-gold text-primary-400">
            {member?.role}
          </span>
        </div>
      </div>
    </PopoverTrigger>
    <PopoverContent className="!rounded-3 !p-0">
      <MemberAction
        setOpenMemberId={setOpenMemberId}
        memberId={member?.user_id}
      />
    </PopoverContent>
  </Popover>
);

const GroupMembers = ({ type }: { type: string }) => {
  const [openMemberId, setOpenMemberId] = useState<number | null>(null);

  const profileGroup = useSelector((state: RootState) => state.profile.profile);
  const channels: GroupAndChannelTypes[] = useSelector(
    (state: RootState) => state?.channels?.channels,
  );
  const groups: GroupAndChannelTypes[] = useSelector(
    (state: RootState) => state?.groups?.groups,
  );
  const myProfile = JSON.parse(localStorage.getItem("profile") || "{}");

  const channelAndGroupData =
    type === "channel"
      ? channels.find(
          (channel: GroupAndChannelTypes) =>
            channel.id === profileGroup?.chat_id && channel,
        )
      : groups.find(
          (group: GroupAndChannelTypes) =>
            group.id === profileGroup?.chat_id && groups,
        );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-start gap-3 items-center">
        <div className="flex justify-center items-center">
          <Button
            isIconOnly
            className="rounded-lg w-[38px] h-[38px] p-2 bg-primary-400 dark:hover:bg-surface-200"
          >
            <Profile size="20" color="white" variant="Bold" />
          </Button>
        </div>
        <div className="flex flex-col justify-center space-y-1">
          <span className="font-semibold text-[10px] leading-4 dark:text-white text-secondary-1000">
            {myProfile?.name}
          </span>
          <span className="font-light text-[10px] leading-4 dark:text-gold text-primary-400">
            Owner
          </span>
        </div>
      </div>
      {channelAndGroupData?.members &&
        channelAndGroupData?.members.length > 0 &&
        channelAndGroupData?.members.map(
          (member: MemberTypes, index: number) => (
            <MemberItem
              key={index}
              member={member}
              index={index}
              isOpen={openMemberId === index}
              setOpenMemberId={setOpenMemberId}
            />
          ),
        )}
    </div>
  );
};

export default GroupMembers;
