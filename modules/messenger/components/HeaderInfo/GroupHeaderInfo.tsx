import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Image,
  Input,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from "@heroui/react";
import { CloseCircle, Folder, Grid9, More, Paperclip, Play, Save2, SearchNormal1 } from "iconsax-reactjs";
import { AppDispatch, RootState } from "@hrbox/core/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleInfo } from "@hrbox/core/redux/slices/messengerAction";

import {
  useClearHistoryGroupMutation,
  useMuteGroupMutation,
  useRemoveGroupMutation,
  useUnpinMessageGroupMutation
} from "@hrbox/modules/messenger/apis/Group";
import GroupInfo from "../Info/GroupInfo";
import { Actions } from "./Actions";
import { useLocation } from "@tanstack/react-router";
import { useWebSocket } from "@hrbox/core/providers/SignalRWebSocket";
import { setUserProfile } from "@hrbox/core/redux/slices/profile";
import { setHighlightedMessageId, updateFilteredMessages } from "@hrbox/core/redux/slices/messageAction";
import { ElementTypes, GroupAndChannelTypes, MessageTypes } from "@hrbox/modules/messenger/types";
import { CloseIcon } from "@hrbox/uikit/icons";

export const GroupHeaderInfo = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<any>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpenChange } = useDisclosure();
  const isOpenMessengerInfo = useSelector(
    (state: RootState) => state.messengerAction.isOpen
  );
  const groupProfile = useSelector((state: RootState) => state.profile.profile);
  const groups = useSelector((state: RootState) => state?.groups?.groups);
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  const [clearHistoryGroup] = useClearHistoryGroupMutation();
  const [muteGroup] = useMuteGroupMutation();
  const [removeGroup] = useRemoveGroupMutation();
  const [unpinMessageGroup] = useUnpinMessageGroupMutation();

  useEffect(() => {
    groups.find((item: GroupAndChannelTypes) => {
      item?.id === groupProfile?.chat_id && setMessageList(item.messages);
    });
  }, [groupProfile]);

  const pinnedMessage: any = messageList.find(
    (msg: MessageTypes) => msg.pinned
  );
  const [active, setActive] = useState<boolean>(false);
  const isOpenEmojipicker = useSelector(
    (state: RootState) => state.messengerAction.isOpenEmojiPicker
  );
  const [isTyping, setIsTyping] = useState("");
  const { socket, setMessages } = useWebSocket();
  const [searchText, setSearchText] = useState<string>("");
  const location = useLocation();
  const typingResetTimer = useRef<NodeJS.Timeout | null>(null);
  const typingResetDelay = 1000;

  const handleSelect = () => {
    setIsSelected((prev) => !prev);
  };

  const handleToggleMuteChat = async () => {
    try {
      await muteGroup({
        group_id: groupProfile?.chat_id || "",
        muted: !groupProfile?.muted
      }).unwrap();
    } catch (error) {
      console.error("Failed to mute group:", error);
    }
  };

  const handleClearChatHistory = async () => {
    try {
      await clearHistoryGroup({
        group_id: groupProfile?.chat_id || ""
      }).unwrap();
    } catch (error) {
      console.error("Failed to clear group history:", error);
    }
  };

  const handleDeleteChat = async () => {
    try {
      await removeGroup({
        group_id: groupProfile?.chat_id || ""
      }).unwrap();
      dispatch(setUserProfile({}));
    } catch (error) {
      console.error("Failed to remove group:", error);
    }
  };

  const handleOpenInformation = () => {
    dispatch(toggleInfo());
  };

  const handleEditGroupOrChannel = () => {
    onOpenChange();
  };

  const handleShowSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  const handleUnpin = async () => {
    const message = messageList.find((message: MessageTypes) => message.pinned === true);
    if (message) {
      try {
        await unpinMessageGroup({
          message_id: message?.id,
          group_id: groupProfile?.chat_id
        }).unwrap();
      } catch (error) {
        console.error("Failed to unpin message:", error);
      }
    }
  };

  const messages: MessageTypes[] = useSelector(
    (state: RootState) => state?.profile?.profile?.messages
  );

  useEffect(() => {
    dispatch(updateFilteredMessages(messages));
  }, [messages]);

  const handleSearch = (value: string) => {
    const filteredMessages = messages.filter((message: MessageTypes) =>
      message?.text.toLowerCase().includes(searchText.toLowerCase())
    );
    dispatch(updateFilteredMessages(filteredMessages));
    setSearchText(value);
  };

  const handleClickActions = (key: string) => {
    switch (key) {
      case "mute":
        return handleToggleMuteChat();
      case "clear":
        return handleClearChatHistory();
      case "edit":
        return handleEditGroupOrChannel();
      case "delete":
        return handleDeleteChat();
      case "info":
        return handleOpenInformation();
    }
  };

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message: MessageTypes = JSON.parse(event.data);
        if (
          message.type === "typing" &&
          message.sender_id !== profile?.user_id
        ) {
          setIsTyping(`is typing`);

          if (typingResetTimer.current) {
            clearTimeout(typingResetTimer.current);
          }

          typingResetTimer.current = setTimeout(() => {
            setIsTyping("");
          }, typingResetDelay);
        }

        if (
          message.type !== "typing" &&
          message.sender_id !== profile?.user_id
        ) {
          setMessages((prevMessages: MessageTypes[]): MessageTypes[] => [
            ...prevMessages,
            message
          ]);
        }
      };
    }
  }, [socket, profile?.user_id]);

  return (
    <div className="relative">
      {groupProfile && (
        <>
          <div className="flex relative">
            <div
              className={`
  absolute left-0 top-0 z-30 h-[72px]
  flex flex-row items-center px-8 py-4 gap-6
  !backdrop-blur-[6px] !rounded-tr-5

  !bg-gradient-to-r !from-[#ffffffcc] !to-white
  dark:!from-[#01101ab3] dark:!to-[#01101A]

  ${isOpenMessengerInfo || isOpenEmojipicker
                ? "w-[calc(100%-256px)]"
                : "w-full"}

  ${isSelected ? "bg-primary-0 dark:bg-primary-800" : ""}

  cursor-pointer transition-colors duration-300
  hover:bg-primary-0 dark:hover:bg-primary-800
`}
              onClick={handleSelect}
            >
              {location?.pathname === "/messenger/save" ? (
                <div className="bg-secondary-400 rounded-3 w-10 h-10 flex justify-center items-center">
                  <Save2 size="24" className="text-white" />
                </div>
              ) : (
                <Avatar
                  onClick={handleOpenInformation}
                  size="md"
                  radius="sm"
                  src={groupProfile?.image}
                  alt="avatar picture"
                />
              )}
              <div className="flex flex-col flex-grow gap-1">
                {location?.pathname === "/messenger/save" ? (
                  <span className="text-secondary-1000 dark:text-white text-sm font-semibold">
                    Saved Messages
                  </span>
                ) : (
                  <>
                    <span
                      className="text-secondary-1000 dark:text-white font-open-sans text-sm font-normal leading-normal">
                      {groupProfile?.name}
                    </span>
                    {isTyping ? (
                      <div className="flex items-center gap-0.5">
                        typing
                        <span className="text-xs text-secondary-1000 dark:text-white font-light">
                          {isTyping}
                        </span>
                      </div>
                    ) : (
                      <span
                        className="text-secondary-1000 dark:text-white font-open-sans text-[12px] font-light leading-normal">
                        {groupProfile?.members?.length}
                        Members
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="flex gap-4">
                {showSearchBox && (
                  <Input
                    type="text"
                    variant="bordered"
                    onFocus={() => setActive(true)}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Type Something..."
                    value={searchText}
                    className={`h-10 border-none sha relative dark:text-white text-netural-400`}
                    classNames={{
                      inputWrapper: [
                        "group-data-[focus=true]:border-!netural-100",
                        "!rounded-4 !shadow-none",
                        "border-1 border-netural-100 dark:border-netural-700"
                      ],
                      input: [
                        "placeholder:text-netural-400 dark:placeholder:text-white"
                      ]
                    }}
                    startContent={
                      active ? (
                        <div
                          className={`flex justify-center ease-in-out absolute left-3 right-0 top-2 bottom-0 items-start w-5 h-5 ${darkMode ? "border-netural-250" : "border-netural-400"} border-l-[0.4px]`}
                        ></div>
                      ) : (
                        <SearchNormal1
                          className={`w-6 h-6 dark:text-white text-netural-400`}
                        />
                      )
                    }
                    endContent={
                      active && (
                        <div
                          className="cursor-pointer transition-transform"
                          onClick={() => {
                            setActive((prev) => !prev);
                            setSearchText("");
                          }}
                        >
                          <CloseIcon />
                        </div>
                      )
                    }
                  />
                )}
                <Button
                  isIconOnly
                  onClick={handleShowSearchBox}
                  variant="light"
                  className="p-1.5"
                >
                  <SearchNormal1
                    size="20"
                    className="text-secondary-1000 dark:text-white"
                  />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  onClick={handleOpenInformation}
                >
                  <Grid9
                    size="20"
                    className="text-secondary-1000 dark:text-white"
                  />
                </Button>
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <Button
                      isIconOnly
                      className="rotate-90 p-1.5"
                      variant="light"
                    >
                      <More
                        size="20"
                        className="text-secondary-1000 dark:text-white"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="!rounded-3 w-52">
                    <Listbox
                      aria-label="Actions"
                      onAction={(key) => {
                        handleClickActions(String(key));
                      }}
                    >
                      {Actions.map((item) => (
                        <ListboxItem
                          key={item.key}
                          className="!p-0 !my-1.5 group !hover:bg-transparent"
                        >
                          <div className="flex gap-4">
                            {item.icon}
                            <span className="text-secondary-1000 dark:text-white text-sm leading-normal">
                              {item.text}
                            </span>
                          </div>
                        </ListboxItem>
                      ))}
                    </Listbox>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <GroupInfo />
          </div>
          {pinnedMessage && (
            <div
              onClick={() => {
                const element = document.getElementById(pinnedMessage?.id);
                if (element) {
                  const scrollOptions: ElementTypes = {
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest"
                  };
                  element.scrollIntoView(scrollOptions);
                  dispatch(setHighlightedMessageId(pinnedMessage?.id));
                }
                setTimeout(() => {
                  dispatch(setHighlightedMessageId(null));
                }, 3000);
              }}
              className={`py-2 px-10 flex justify-between items-center cursor-pointer absolute top-[72px] w-full z-30 ${!darkMode ? "!bg-gradient-to-r !from-[#ffffffcc] !to-white" : "!bg-gradient-to-r !from-[#01101ab3] !to-[#01101A]"} backdrop-blur-[6px]`}
            >
              <div className="flex items-center gap-8">
                <div>
                  <div>
                    <Paperclip
                      size="20"
                      className="text-secondary-1000 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-primary-700 dark:text-gold text-sm font-normal">
                    Pinned Message
                  </span>
                  <span className="text-secondary-1000 dark:text-white text-xs font-light">
                    {pinnedMessage?.type === "text" ? (
                      pinnedMessage?.text
                    ) : pinnedMessage?.type === "link" ? (
                      <span className="text-info-400 underline">
                        {pinnedMessage?.link}
                      </span>
                    ) : pinnedMessage?.type === "image" ? (
                      <Image
                        src={pinnedMessage?.image}
                        className="w-9 h-9 !rounded-2"
                      />
                    ) : pinnedMessage?.type === "file" ? (
                      <div className="flex items-center gap-2">
                        <div
                          className="rounded-lg w-8 h-8 flex items-center justify-center bg-primary-400 dark:hover:bg-surface-200">
                          <Folder color="white" size="18" variant="Bold" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span>{pinnedMessage?.file_name}</span>
                          <span>{pinnedMessage?.file_size}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg w-8 h-8 p-1.5 bg-primary-400 dark:hover:bg-surface-200">
                          <Play color="white" size="18" variant="Bold" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span>{pinnedMessage?.file_name}</span>
                          <span>{pinnedMessage?.file_size}</span>
                        </div>
                      </div>
                    )}
                  </span>
                </div>
              </div>
              <Button
                onClick={handleUnpin}
                isIconOnly
                variant="light"
                className="!p-0"
              >
                <CloseCircle size="20" className="text-secondary-1000" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};