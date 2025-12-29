import { useState } from "react";
import { Button } from "@heroui/react";
import { useSelector } from "react-redux";
import { useTheme } from "@hrbox/core/hooks/useTheme";
import { RootState } from "@hrbox/core/redux";
import { useMuteChannelMutation } from "@hrbox/modules/messenger/apis/Channel";

const ChannelFooter = () => {
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen
  );
  const channelProfile = useSelector(
    (state: RootState) => state?.profile?.profile
  );

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [muteChannel, { isLoading }] = useMuteChannelMutation();
  const { mode } = useTheme();

  const toggleMute = async () => {
    try {
      await muteChannel({ channel_id: channelProfile?.chat_id }).unwrap();
      setIsMuted((prev) => !prev);
    } catch (error) {
      console.error("Failed to mute channel:", error);
    }
  };

  const isDarkMode = mode === "dark";
  const mutedButtonClasses = isDarkMode ? "bg-info-1000" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-secondary-1000";

  return (
    <Button
      type="button"
      className={`${isOpen ? "w-[calc(100%-256px)]" : "w-full"} !rounded-br-5 rounded-none absolute left-0 bottom-0 h-[46px] ${mutedButtonClasses}`}
      onPress={toggleMute}
      isLoading={isLoading}
    >
      <span
        className={`py-2 font-semibold text-base leading-normal font-open-sans ${textColor}`}
      >
        {isMuted ? "Unmute" : "Mute"}
      </span>
    </Button>
  );
};

export default ChannelFooter;