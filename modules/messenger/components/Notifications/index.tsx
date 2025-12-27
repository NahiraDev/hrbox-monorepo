import { Notification as NotificationIcon } from "iconsax-react";
import { useEffect, useState } from "react";
import { Switch, cn } from "@nextui-org/react";
import { useDarkMode } from "../../context/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { handleMuteChatApi } from "../../services/Messenger/PrivateChatService/apis";
import { handleMuteGroupApi } from "../../services/Messenger/GroupChatService/apis";
import { handleMutedChannelApi } from "../../services/Messenger/ChannelChatService/apis";

const Notification = () => {
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch<AppDispatch>();
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const muteRecipient = useSelector(
    (state: RootState) => state.profile?.profile?.muted,
  );
  const recipient = useSelector((state: RootState) => state.profile.profile);

  const handleChangeMuted = () => {
    if (recipient?.chat_type === "private") {
      dispatch(
        handleMuteChatApi({
          chat_id: recipient?.chat_id,
        }),
      );
    } else if (recipient?.chat_type === "group") {
      dispatch(
        handleMuteGroupApi({
          group_id: recipient?.chat_id,
        }),
      );
    } else if (recipient?.chat_type === "channel") {
      dispatch(
        handleMutedChannelApi({
          channel_id: recipient?.chat_id,
        }),
      );
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
            className: "dark:text-gold text-primary-400",
          })}
        />
        <span className="dark:text-white text-secondary-1000 text-sm font-light leading-normal">
          Notifications
        </span>
      </div>

      <div>
        <Switch
          {...(darkMode
            ? {
                classNames: {
                  thumb: cn(
                    `bg-info-1000 shadow-lg !w-3 !h-3 transition-transform duration-500 ease-in-out ${isSelected && "!ml-auto"}`,
                  ),
                  wrapper: cn(
                    "bg-neutral-100 text-info-1000 !w-[30px] !h-[18px] rounded-full flex items-center justify-start transition-all duration-500 ease-in-out", // انیمیشن برای wrapper
                    "group-data-[selected=true]:bg-surface-200",
                  ),
                },
              }
            : {
                classNames: {
                  thumb: cn(
                    `bg-white shadow-lg !w-3 !h-3 transition-transform duration-500 ease-in-out ${isSelected && "!ml-auto"}`,
                  ),
                  wrapper: cn(
                    "!w-[30px] !h-[18px] rounded-full flex items-center justify-start transition-all duration-500 ease-in-out",
                    "group-data-[selected=true]:bg-primary-400",
                  ),
                },
              })}
          isSelected={isSelected}
          onValueChange={handleChangeMuted}
          size="sm"
        />
      </div>
    </div>
  );
};

export default Notification;
