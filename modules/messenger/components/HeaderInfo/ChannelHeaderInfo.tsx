import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Listbox,
  ListboxItem,
  Modal,
  ModalContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from "@nextui-org/react";
import { CloseCircle, Grid9, More, Paperclip, SearchNormal1 } from "iconsax-react";
import { useDarkMode } from "../../context/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { toggleInfo } from "../../redux/reducers/messengerAction";
import {
  handleClearHistoryChannelsApi,
  handleMutedChannelApi,
  handleRemoveChannelApi
} from "../../services/Messenger/ChannelChatService/apis";
import Lottie from "lottie-react";
import { AppDispatch } from "../../redux/store";
import SearchBox from "../SearchBox";
import { Actions } from "./Actions";
import AddGroup from "../Add/AddGroup";
import { useWebSocket } from "../../context/SignalRWebSocket";
import isTypingGif from "../../lottie/isTyping.json";
import { setUserProfile } from "../../redux/reducers/profile";
import { GroupAndChannelTypes, MessageTypes } from "../../types";

// Reusable Avatar Component
const ChannelAvatar = ({
                         channelProfile,
                         onClick
                       }: {
  channelProfile: any;
  onClick: () => void;
}) => (
  <Avatar
    onClick={onClick}
    size="md"
    radius="sm"
    src={channelProfile?.image}
    alt="avatar picture"
  />
);

// Reusable Pinned Message Display Component
const PinnedMessage = ({
                         pinnedMessage,
                         handleUnpin
                       }: {
  pinnedMessage: MessageTypes;
  handleUnpin: () => void;
}) => (
  <div
    onClick={() => handleUnpin()}
    className="py-2 px-10 flex justify-between items-center cursor-pointer absolute top-[72px] w-full z-30 backdrop-blur-[6px]"
  >
    <div className="flex items-center gap-8">
      <Paperclip size="20" />
      <div className="flex flex-col gap-1">
        <span className="text-primary-700 text-sm font-normal">
          Pinned Message
        </span>
        <span className="text-secondary-1000 text-xs font-light">
          {pinnedMessage?.type === "text"
            ? pinnedMessage?.text
            : "Other types of content..."}
        </span>
      </div>
    </div>
    <Button onClick={handleUnpin} isIconOnly variant="light" className="!p-0">
      <CloseCircle size="20" />
    </Button>
  </div>
);

// Main ChannelHeaderInfo Component
export const ChannelHeaderInfo = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpenChange } = useDisclosure();
  const isOpenMessengerInfo = useSelector(
    (state: RootState) => state.messengerAction.isOpen
  );
  const channelProfile = useSelector(
    (state: RootState) => state.profile.profile
  );
  const channels = useSelector((state: RootState) => state?.channels?.channels);
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");
  const [messageList, setMessageList] = useState<MessageTypes[]>([]);
  const { socket, setMessages } = useWebSocket();
  const { darkMode } = useDarkMode();
  const typingResetTimer = useRef<NodeJS.Timeout | null>(null);
  const typingResetDelay = 1000;

  useEffect(() => {
    channels.find((item: GroupAndChannelTypes) => {
      item?.id === channelProfile?.chat_id && setMessageList(item.messages);
    });
  }, [channelProfile]);

  const pinnedMessage = messageList.find((msg: MessageTypes) => msg.pinned);

  const handleSelect = () => setIsSelected((prev) => !prev);
  const handleToggleMuteChat = () =>
    dispatch(
      handleMutedChannelApi({ channel_id: channelProfile?.chat_id || "" })
    );
  const handleClearChatHistory = () =>
    dispatch(
      handleClearHistoryChannelsApi({
        channel_id: channelProfile?.chat_id || ""
      })
    );
  const handleDeleteChat = () => {
    dispatch(
      handleRemoveChannelApi({ channel_id: channelProfile?.chat_id || "" })
    );
    dispatch(setUserProfile({}));
  };
  const handleOpenInformation = () => dispatch(toggleInfo());
  const handleShowSearchBox = () => setShowSearchBox(!showSearchBox);
  const handleUnpin = () =>
    dispatch(
      handleUnpinMessageChannel({
        message_id: pinnedMessage?.id,
        channel_id: channelProfile?.chat_id
      })
    );

  const handleClickActions = (key: string) => {
    switch (key) {
      case "mute":
        return handleToggleMuteChat();
      case "clear":
        return handleClearChatHistory();
      case "edit":
        return handleOpenInformation();
      case "delete":
        return handleDeleteChat();
      case "info":
        return handleOpenInformation();
    }
  };

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (
          message.type === "typing" &&
          message.sender_id !== profile?.user_id
        ) {
          setIsTyping(`is typing`);
          if (typingResetTimer.current) clearTimeout(typingResetTimer.current);
          typingResetTimer.current = setTimeout(
            () => setIsTyping(""),
            typingResetDelay
          );
        }
        if (
          message.type !== "typing" &&
          message.sender_id !== profile?.user_id
        ) {
          setMessages((prevMessages: MessageTypes[]) => [
            ...prevMessages,
            message
          ]);
        }
      };
    }
  }, [socket, profile?.user_id]);

  return (
    <div className="relative">
      {channelProfile && (
        <>
          <div
            className={`flex relative ${isSelected && (darkMode ? "bg-primary-800" : "bg-primary-0")}`}
          >
            <ChannelAvatar
              channelProfile={channelProfile}
              onClick={handleOpenInformation}
            />

            <div className="flex flex-col flex-grow gap-1">
              <span>{channelProfile?.name}</span>
              {isTyping && (
                <div className="flex items-center gap-0.5">
                  <Lottie animationData={isTypingGif} loop={true} />
                  <span>{isTyping}</span>
                </div>
              )}
              {!isTyping && (
                <span>{channelProfile?.members?.length} Members</span>
              )}
            </div>

            <div className="flex gap-4">
              {showSearchBox && <SearchBox />}
              <Button isIconOnly onClick={handleShowSearchBox}>
                <SearchNormal1 size="20" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                onClick={handleOpenInformation}
              >
                <Grid9 size="20" />
              </Button>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button isIconOnly className="rotate-90">
                    <More size="20" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Listbox aria-label="Actions" onAction={handleClickActions}>
                    {Actions.map((item) => (
                      <ListboxItem key={item.key} className="group">
                        {item.icon}
                        <span>{item.text}</span>
                      </ListboxItem>
                    ))}
                  </Listbox>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {pinnedMessage && (
            <PinnedMessage
              pinnedMessage={pinnedMessage}
              handleUnpin={handleUnpin}
            />
          )}
        </>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>{() => <AddGroup />}</ModalContent>
      </Modal>
    </div>
  );
};
