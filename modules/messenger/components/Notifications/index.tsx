import { Notification as NotificationIcon } from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { cn, Switch } from "@heroui/react";
import { useSelector } from "react-redux";
import { RootState } from "@hrbox/core/redux/store";
import { useMuteChannelMutation } from "@hrbox/modules/messenger/apis/Channel";
import { useMuteChatMutation } from "@hrbox/modules/messenger/apis/Private";
import { useMuteGroupMutation } from "@hrbox/modules/messenger/apis/Group";

const Notification = () => {
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const muteRecipient = useSelector(
    (state: RootState) => state.profile?.profile?.muted
  );
  const recipient = useSelector((state: RootState) => state.profile.profile);

  const [muteChannel] = useMuteChannelMutation();
  const [muteChat] = useMuteChatMutation();
  const [muteGroup] = useMuteGroupMutation();

  const handleChangeMuted = async () => {
    if (recipient?.chat_type === "private") {
      try {
        await muteChat({
          chat_id: recipient?.chat_id,
          muted: !isSelected
        }).unwrap();
      } catch (error) {
        console.error("Failed to mute chat:", error);
      }
    } else if (recipient?.chat_type === "group") {
      await muteGroup({ group_id: recipient?.chat_id, muted: !isSelected }).unwrap();
    } else if (recipient?.chat_type === "channel") {
      try {
        await muteChannel({
          channel_id: recipient?.chat_id
        }).unwrap();
      } catch (error) {
        console.error("Failed to mute channel:", error);
      }
    }

    setIsSelected(!isSelected);
  };

  useEffect(() => {
    if (muteRecipient) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [muteRecipient]);

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center gap-2">
        <NotificationIcon
          size="20"
          {...(isSelected && {
            variant: "Bold",
            className: "dark:text-gold text-primary-400"
          })}
        />
        <span className="dark:text-white text-secondary-1000 text-sm font-light leading-normal">
          Notifications
        </span>
      </div>

      <div>
        <Switch
          classNames={{
            thumb: cn(
              "!w-3 !h-3 shadow-lg transition-transform duration-500 ease-in-out",
              "bg-white dark:bg-info-1000",
              isSelected && "!ml-auto"
            ),
            wrapper: cn(
              "!w-[30px] !h-[18px] rounded-full flex items-center justify-start transition-all duration-500 ease-in-out",
              "group-data-[selected=true]:bg-primary-400 dark:group-data-[selected=true]:bg-surface-200",
              "dark:bg-neutral-100 dark:text-info-1000"
            )
          }}
          isSelected={isSelected}
          onValueChange={handleChangeMuted}
          size="sm"
        />
      </div>
    </div>
  );
};

export default Notification;