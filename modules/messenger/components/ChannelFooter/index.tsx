import { useState } from "react";
import { Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { handleMutedChannelApi } from "../../services/Messenger/ChannelChatService/apis";
import { useTheme } from "@hrbox/core/hooks";
import { AppDispatch, RootState } from "@hrbox/core/redux";

const ChannelFooter = () => {
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen,
  );
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const channelProfile = useSelector(
    (state: RootState) => state?.profile?.profile,
  );
  const { mode } = useTheme();
  const toggleMute = () => {
    setIsMuted((prevState) => !prevState);
    dispatch(
      handleMutedChannelApi({
        channel_id: channelProfile?.chat_id,
      }),
    );
  };
  const mutedButtonClasses = mode || isMuted ? "bg-info-1000" : "bg-white";
  const textColor = mode || isMuted ? "text-white" : "text-secondary-1000";

  return (
    <Button
      type="button"
      className={`${isOpen ? "w-[calc(100%-256px)]" : "w-full"} !rounded-br-5 rounded-none absolute left-0 bottom-0 h-[46px] ${mutedButtonClasses}`}
      onPress={toggleMute}
    >
      <span
        className={`py-2 font-semibold text-base leading-normal font-open-sans ${textColor}`}
      >
        {isMuted ? "Mute" : "Un Mute"}
      </span>
    </Button>
  );
};

export default ChannelFooter;
