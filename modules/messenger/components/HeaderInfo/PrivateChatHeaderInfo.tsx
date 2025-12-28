import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Image,
  Input,
  Listbox,
  ListboxItem,
  Modal,
  ModalContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure
} from "@nextui-org/react";
import { CloseCircle, Folder, Grid9, More, Paperclip, Play, SearchNormal1 } from "iconsax-react";
import { useDarkMode } from "../../context/DarkMode";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleInfo } from "../../redux/reducers/messengerAction";
import {
  handleClearHistoryChatApi,
  handleMuteChatApi,
  handleRemoveMessageApi,
  handleUnpinMessageApi
} from "../../services/Messenger/PrivateChatService/apis";
import Lottie from "lottie-react";
import ContactInfo from "../Info/PrivateChatInfo";
import { Actions } from "./Actions";
import CloseIconSvg from "../../icons/CloseIcon";
import AddGroup from "../Add/AddGroup";
import { useWebSocket } from "../../context/SignalRWebSocket";
import isTypingGif from "../../lottie/isTyping.json";
import { setHighlightedMessageId, updateFilteredMessages } from "../../redux/reducers/messageAction";
import { toast } from "react-toastify";
import { setUserProfile } from "../../redux/reducers/profile";
import { SearchIcon } from "@nextui-org/shared-icons";
import { ElementTypes, MessageTypes } from "../../types";

const ACTIONS = {
  MUTE: "mute",
  CLEAR: "clear",
  EDIT: "edit",
  DELETE: "delete",
  INFO: "info"
};

export const PrivateChatHeaderInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { socket, setMessages } = useWebSocket();
  const { darkMode } = useDarkMode();
  const { isOpen, onOpenChange } = useDisclosure();
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");
  const messages = useSelector(
    (state: RootState) => state?.privateChat?.messages
  );
  const recipient = useSelector((state: RootState) => state.profile.profile);
  const messageList: any = useSelector(
    (state: RootState) => state?.privateChat?.messages
  );
  const typingResetTimer = useRef<NodeJS.Timeout | null>(null);
  const typingResetDelay = 1000;
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<string>("");
  const isOpenMessengerInfo = useSelector(
    (state: RootState) => state.messengerAction.isOpen
  );
  const isOpenEmojipicker = useSelector(
    (state: RootState) => state.messengerAction.isOpenEmojiPicker
  );

  const pinnedMessage = messages?.find((msg: MessageTypes) => msg.pinned);

  // Handle State Changes
  const handleSelect = () => setIsSelected((prev) => !prev);
  const handleShowSearchBox = () => setShowSearchBox((prev) => !prev);

  const handleToggleMuteChat = () => {
    dispatch(handleMuteChatApi({ chat_id: recipient?.chat_id || "" }));
  };

  const handleClearChatHistory = () => {
    dispatch(handleClearHistoryChatApi({ chat_id: recipient?.chat_id || "" }));
    toast.dismiss();
  };

  const handleDeleteChat = () => {
    dispatch(handleRemoveMessageApi({ chat_id: recipient?.chat_id || "" }));
    toast.dismiss();
    dispatch(setUserProfile({}));
  };

  const handleUnpin = () => {
    const pinned = messageList.find((message: any) => message.pinned === true);
    if (pinned) {
      dispatch(
        handleUnpinMessageApi({
          message_id: pinned?.id,
          chat_id: recipient?.chat_id
        })
      );
    }
  };

  const handleSearch = (value: string) => {
    const filteredMessages = messages.filter((message: any) =>
      message?.text.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(updateFilteredMessages(filteredMessages));
    setSearchText(value);
  };

  // Toast Handlers
  const handleConfirmClearHistory = () => showConfirmationToast("clear");
  const handleConfirmDeleteChat = () => showConfirmationToast("delete");

  const showConfirmationToast = (action: string) => {
    const actionMap = {
      clear: "Are you sure you want to clear the chat history?",
      delete: "Are you sure you want to delete the chat?"
    };
    toast(
      <>
        <div className="flex flex-col gap-4">
          <p className="text-secondary-1000">{actionMap[action]}</p>
          <div className="flex gap-3">
            <Button
              variant="flat"
              color="success"
              onClick={
                action === "clear" ? handleClearChatHistory : handleDeleteChat
              }
            >
              Yes
            </Button>
            <Button
              variant="flat"
              color="danger"
              onClick={() => toast.dismiss()}
            >
              No
            </Button>
          </div>
        </div>
      </>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center"
      }
    );
  };

  // WebSocket Logic
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (
          message.type === "typing" &&
          message.sender_id !== profile?.user_id
        ) {
          setIsTyping("is typing");
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
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };
    }
  }, [socket, profile?.user_id]);
  const handleOpenInformation = () => {
    dispatch(toggleInfo());
  };
  // Handle action based on key
  const handleClickActions = (key: string) => {
    switch (key) {
      case ACTIONS.MUTE:
        handleToggleMuteChat();
        break;
      case ACTIONS.CLEAR:
        handleConfirmClearHistory();
        break;
      case ACTIONS.EDIT:
        onOpenChange();
        break;
      case ACTIONS.DELETE:
        handleConfirmDeleteChat();
        break;
      case ACTIONS.INFO:
        dispatch(toggleInfo());
        break;
    }
  };

  return (
    <div className="relative">
      {recipient && (
        <React.Fragment>
          <div className="flex relative">
            <div
              className={`absolute left-0 top-0 flex flex-row items-center px-8 py-4 gap-6 !backdrop-blur-[6px] h-[72px] z-30 ${!darkMode ? "!bg-gradient-to-r !from-[#ffffffcc] !to-white" : "!bg-gradient-to-r !from-[#01101ab3] !to-[#01101A]"} !rounded-tr-5 ${isOpenMessengerInfo || isOpenEmojipicker ? "w-[calc(100%-256px)]" : "w-full"}
              ${isSelected && (darkMode ? "bg-primary-800" : "bg-primary-0")} 
              cursor-pointer transition-colors duration-300
            hover:bg-primary-0 dark:hover:bg-primary-800`}
              onClick={handleSelect}
            >
              <Avatar
                size="md"
                onClick={handleOpenInformation}
                radius="sm"
                src={
                  recipient.user_id === profile?.user_id
                    ? profile?.image
                    : recipient?.image || ""
                }
                alt="avatar picture"
              />
              <div className="flex flex-col flex-grow gap-1">
                <span className="text-secondary-1000 dark:text-white font-open-sans text-sm font-normal leading-normal">
                  {recipient.user_id === profile?.user_id
                    ? profile?.name
                    : recipient?.name || ""}
                </span>
                {isTyping ? (
                  <div className="flex items-center gap-0.5">
                    <Lottie animationData={isTypingGif} loop={true} />
                    <span className="text-xs text-secondary-1000 dark:text-white font-light">
                      {isTyping}
                    </span>
                  </div>
                ) : (
                  <span
                    className="text-secondary-1000 dark:text-white font-open-sans text-[12px] font-light leading-normal">
                    last seen recently
                  </span>
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
                        darkMode
                          ? "border-1 border-netural-700"
                          : "border-1 border-netural-100"
                      ],
                      input: [
                        darkMode
                          ? "placeholder:text-white"
                          : "placeholder:text-netural-400"
                      ]
                    }}
                    startContent={
                      active ? (
                        <div
                          className={`flex justify-center ease-in-out absolute left-3 right-0 top-2 bottom-0 items-start w-5 h-5 ${darkMode ? "border-netural-250" : "border-netural-400"} border-l-[0.4px]`}
                        ></div>
                      ) : (
                        <SearchIcon
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
                          <CloseIconSvg />
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
                  <PopoverContent className="!rounded-3 !p-0">
                    <Listbox
                      aria-label="Actions"
                      variant="light"
                      className="!px-6 !py-3"
                      onAction={(key) => {
                        handleClickActions(String(key));
                      }}
                    >
                      {Actions.map((item) => (
                        <ListboxItem
                          key={item.key}
                          className={`!p-0 group transition-all ${item.key === "edit" && recipient?.chat_type === "private" && "hidden"} !mb-3 last:!mb-0`}
                        >
                          <div className="flex gap-4 group-hover:text-primary-400 group-hover:dark:text-gold">
                            {item.icon}
                            <span
                              className="text-sm font-normal text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all">
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
            <ContactInfo />
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
                  dispatch(setHighlightedMessageId(""));
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
                  <span className="text-primary-700 text-sm font-normal">
                    Pinned Message
                  </span>
                  <span className="text-secondary-1000 text-xs font-light">
                    {pinnedMessage?.type === "text" ? (
                      pinnedMessage?.text
                    ) : pinnedMessage?.type === "link" ? (
                      <span className="text-info-400 underline">
                        {pinnedMessage?.link}
                      </span>
                    ) : pinnedMessage?.type === "image" ? (
                      <Image
                        src={pinnedMessage?.image}
                        className="w-9 h-9 !rounded-2 object-cover"
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
        </React.Fragment>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>{() => <AddGroup />}</ModalContent>
      </Modal>
    </div>
  );
};
