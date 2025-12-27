import { Avatar, Input, Button } from "@nextui-org/react";
import { Send2, CloseCircle, Play, Folder, ArrowLeft2 } from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";
import HappyEmoji from "../../icons/HappyEmoji";
import { Emoji } from "./types";
import ShowMedia from "./ShowMedia";
import SelectFile from "./SelectFile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useWebSocket } from "../../context/SignalRWebSocket";
import {
  closeReplyMessageAction,
  setIsTyping,
} from "../../redux/reducers/messageAction";
import {
  closeEmojiPicker,
  openEmojiPicker,
} from "../../redux/reducers/messengerAction";
import { MessageTypes } from "../../types";

const TextBox = () => {
  const isOpenMessageAction = useSelector(
    (state: RootState) => state.messageAction.reply,
  );
  const [showEmojiPickerMessage, setShowEmojiPickerMessage] =
    useState<boolean>(false);
  const [showEmojiPickerCaption, setShowEmojiPickerCaption] =
    useState<boolean>(false);
  const [isOpenSelectFile, setIsOpenSelectFile] = useState<boolean>(false);
  const { isConnected, sendMessage } = useWebSocket();
  const [messageTextBox, setTextBoxMessage] = useState<string>("");
  const [captionMessage, setCaptionMessage] = useState<string>("");
  const [isTypingAction, setIsTypingAction] = useState<boolean>(false);
  const [showMediaPopup, setShowMediaPopup] = useState<boolean>(false);
  const [isImageFile, setIsImageFile] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [imageData, setImageData] = useState<File | null>(null);
  const [fileData, setFileData] = useState<File | null>(null);
  const [audioData, setAudioData] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const handlePhotoClick = () => document.getElementById("photoInput")?.click();
  const handleFileClick = () => document.getElementById("fileInput")?.click();
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const [imageDetails, setImageDetails] = useState({
    size: "",
    date: "",
    time: "",
  });
  const isOpenUserInfoSideBar = useSelector(
    (state: RootState) => state?.messengerAction?.isOpen,
  );
  const profile = JSON.parse(localStorage.getItem("profile")!);
  const { socket } = useWebSocket();
  const recipient = useSelector((state: RootState) => state.profile?.profile);

  const messageAction = useSelector((state: RootState) => state.messageAction);
  const registerUser = (userId: string) => {
    if (socket && isConnected) {
      const message = JSON.stringify({
        type: "register",
        user_id: userId,
        user_type:
          recipient?.chat_type === "private"
            ? "private"
            : recipient?.chat_type === "group"
              ? "group"
              : recipient?.chat_type === "group"
                ? "channel"
                : "save",
      });
      socket.send(message);
    }
  };

  let typingTimeout: NodeJS.Timeout | null = null;

  const sendTypingStatus = (status: boolean) => {
    if (socket) {
      const typingMessage = JSON.stringify({
        type: "typing",
        is_typing: status,
        sender_id: profile?.user_id,
        recipient_id: recipient?.user_id,
        chat_id: recipient?.chat_id,
      });
      socket.send(typingMessage);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextBoxMessage(e.target.value);
    if (!isTypingAction) {
      setIsTypingAction(true);
      sendTypingStatus(true);
      dispatch(setIsTyping(true));
    }

    if (typingTimeout) clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      setIsTypingAction(false);
      sendTypingStatus(false);
      dispatch(setIsTyping(false));
    }, 2000);
  };

  useEffect(() => {
    if (socket && isConnected) {
      registerUser(recipient?.user_id || "");
    }
  }, [socket, recipient]);

  const handleEmojiClickMessage = (emojiData: Emoji) => {
    setTextBoxMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPickerMessage((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleCloseReply = () => {
    dispatch(closeReplyMessageAction());
  };

  const handleEmojiClickCaption = (emojiData: Emoji) => {
    setCaptionMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPickerCaption((prev) => !prev);
  };

  const handleSetFile = async (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    let type;

    if (["jpg", "jpeg", "png"].includes(fileExtension)) {
      type = "image";
    } else if (["mp3", "wav"].includes(fileExtension)) {
      type = "audio";
    } else {
      type = "file";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      handleSetFile(file);
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      const formattedDate = new Date().toLocaleString("default", {
        month: "short",
        day: "numeric",
      });
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const mimeType = file.type;

      if (mimeType.startsWith("image/")) {
        setIsImageFile(true);
        setImageData(file);
      } else if (mimeType.startsWith("audio/")) {
        setAudioData(file);
      } else {
        setIsImageFile(false);
        setFileData(file);
      }
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file.name);
      setImageDetails({ size: `${sizeInMB} MB`, date: formattedDate, time });
      setIsOpenSelectFile(false);
    }
    setShowMediaPopup(!showMediaPopup);
  };

  const handleSendMedia = () => {
    const reader = new FileReader();

    const sendFileAsBase64 = (
      file: File,
      type: string,
      name: string,
      size: string,
    ) => {
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const message: MessageTypes = {
          type: type,
          chat_type: recipient?.chat_type || "",
          sender_id: profile?.user_id,
          recipient_id: recipient?.user_id || "",
          caption: captionMessage,
          file_name: name,
          file_size: size,
          created_at: new Date().toISOString(),
          status: "delivered",
          chat_id: recipient?.chat_id,
          reply_data: messageAction.reply_message_data,
          reply_type: messageAction.reply_message_type,
          reply_file_name: messageAction.reply_message_file_name,
          reply_message_id: messageAction.reply_message_id,
          [type]: base64,
        };

        if (socket) {
          sendMessage(message);
        }
      };
      reader.readAsDataURL(file);
    };

    const determineFileType = (file: File) => {
      const mimeType = file.type;
      if (mimeType.startsWith("image/")) {
        return "image";
      } else if (mimeType.startsWith("audio/")) {
        return "audio";
      } else {
        return "file";
      }
    };

    if (imageData) {
      sendFileAsBase64(
        imageData,
        determineFileType(imageData),
        imageData.name,
        imageDetails.size,
      );
      setImageData(null);
    } else if (audioData) {
      sendFileAsBase64(
        audioData,
        determineFileType(audioData),
        audioData.name,
        imageDetails.size,
      );
      setAudioData(null);
    } else if (fileData) {
      sendFileAsBase64(
        fileData,
        determineFileType(fileData),
        fileData.name,
        imageDetails.size,
      );
      setFileData(null);
    }

    resetStates();
    setShowMediaPopup(false);
    handleCloseReply();
  };

  const handleSend = () => {
    const trimmedMessage = messageTextBox.trim();
    handleCloseReply();

    if (!trimmedMessage) return;

    const isLink = /^(https?:\/\/[^\s]+)/gim.test(trimmedMessage);
    const message: MessageTypes = {
      type: isLink ? "link" : "text",
      ...(isLink ? { link: trimmedMessage } : { text: trimmedMessage }),
      chat_type: recipient?.chat_type || "",
      sender_id: profile?.user_id,
      recipient_id: recipient?.user_id || "",
      created_at: new Date().toISOString(),
      status: "delivered",
      chat_id: recipient?.chat_id,
      reply_data: messageAction.reply_message_data,
      reply_type: messageAction.reply_message_type,
      reply_file_name: messageAction.reply_message_file_name,
      reply_message_id: messageAction.reply_message_id,
    };

    if (socket) {
      sendMessage(message);
    }

    resetStates();
    setTextBoxMessage("");
  };

  const shortenFileName = (fileName: string, maxLength: number) => {
    if (fileName.length <= maxLength) {
      return fileName;
    }
    const start = fileName.slice(0, 10);
    const end = fileName.slice(-10);
    return `${start}...${end}`;
  };

  const handleSetCaption = (value: string) => {
    setCaptionMessage(value);
  };

  const resetStates = () => {
    setSelectedImage(null);
    setTextBoxMessage("");
    setCaptionMessage("");
    setImageDetails({ size: "", date: "", time: "" });
    dispatch(closeReplyMessageAction());
    setIsOpenSelectFile(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpenSelectFile(false);
      setShowMediaPopup(false);
    }
  };

  const handleClickOutsideEmojiPicker = (event: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as Node)
    ) {
      setShowEmojiPickerMessage(false);
      setShowMediaPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideEmojiPicker);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEmojiPicker);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showEmojiPickerMessage) {
      dispatch(openEmojiPicker());
    } else {
      dispatch(closeEmojiPicker());
    }
  }, [showEmojiPickerMessage]);

  return (
    <div
      className={`${"flex gap-4 items-center"} ${isOpenUserInfoSideBar && "!w-[calc(100%-256px)]"} ${showEmojiPickerMessage && "!w-[calc(100%-256px)]"}`}
    >
      <Avatar src={profile?.image} className="w-[33px] h-[33px] !rounded-2" />
      <div className="flex flex-col justify-center w-full items-center rounded-lg bg-white dark:bg-info-1000 gap-4">
        {isOpenMessageAction && messageAction.reply_message_data && (
          <div className="flex justify-between items-center bg-white dark:bg-info-1000 rounded-4 w-full px-4 py-3">
            <div className="flex items-center gap-4">
              {messageAction.reply_message_type === "image" ? (
                <div className="flex gap-1.5">
                  <Avatar radius="sm" src={messageAction.reply_message_data} />
                </div>
              ) : messageAction.reply_message_type === "audio" ? (
                <div className="rounded-lg w-8 h-8 p-1.5 dark:bg-surface-200 bg-primary-400">
                  <Play color="white" size="20" variant="Bold" />
                </div>
              ) : messageAction.reply_message_type === "file" ? (
                <div className="rounded-lg w-8 h-8 p-1.5 dark:bg-surface-200 bg-primary-400">
                  <Folder color="white" size="20" variant="Bold" />
                </div>
              ) : null}
              <div className="flex flex-col">
                <span className="text-primary-700 text-xs leading-4 font-medium">
                  Reply to
                  {recipient?.user_id !== profile?.user_id
                    ? recipient?.name
                    : profile.name || ""}
                </span>
                {messageAction.reply_message_type === "text" ||
                messageAction.reply_message_type === "link" ? (
                  <span className="text-secondary-1000 dark:text-white text-xs leading-4 font-normal">
                    {messageAction.reply_message_data}
                  </span>
                ) : (
                  <span className="text-secondary-1000 dark:text-white text-xs leading-4 font-normal">
                    {messageAction.reply_message_file_name}
                  </span>
                )}
              </div>
            </div>

            <Button
              isIconOnly
              className="text-neutral-400 bg-transparent"
              onClick={handleCloseReply}
            >
              <CloseCircle size="20" />
            </Button>
          </div>
        )}

        <div
          className={`
        flex items-center justify-between w-full rounded-4 pr-3
      `}
        >
          <SelectFile
            data={{
              isOpenSelectFile,
              showMediaPopup,
              setIsOpenSelectFile,
              handlePhotoClick,
              resetStates,
              handleFileChange,
              handleFileClick,
              popoverRef,
            }}
          />
          <Input
            type="text"
            placeholder="Type something..."
            value={messageTextBox}
            classNames={{
              inputWrapper: "!bg-transparent !shadow-none",
            }}
            onKeyDown={handleKeyDown}
            onChange={(value) => handleTyping(value)}
            className="border-none w-full focus:outline-none !bg-transparent"
          />

          {showMediaPopup && (
            <ShowMedia
              data={{
                selectedImage,
                selectedFile,
                shortenFileName,
                imageDetails,
                captionMessage,
                setCaptionMessage,
                handleSetCaption,
                setShowEmojiPickerCaption,
                showEmojiPickerCaption,
                showEmojiPickerMessage,
                setShowEmojiPickerMessage,
                resetStates,
                setShowMediaPopup,
                handleSendMedia,
                handleEmojiClickCaption,
                isImageFile,
                popoverRef,
              }}
            />
          )}

          <div className="flex items-center gap-1.5">
            <Button
              isIconOnly
              onClick={() => {
                setShowEmojiPickerMessage(!showEmojiPickerMessage);
                if (showEmojiPickerCaption) {
                  setShowEmojiPickerCaption(false);
                }
              }}
              className="p-0 bg-transparent"
            >
              <HappyEmoji />
            </Button>
            <div className="border-1 h-[30px] border-netural-100 dark:border-netural-700" />
            <Button
              isIconOnly
              variant="light"
              onClick={handleSend}
              isDisabled={!isConnected}
              className="!bg-transparent"
            >
              <Send2 variant="Bold" className="text-primary dark:text-gold" />
            </Button>
          </div>
        </div>
      </div>

      {showEmojiPickerMessage && (
        <div ref={emojiPickerRef}>
          <div className="absolute right-0 bottom-[-12px] bg-white text-box-emoji-picker !h-[calc(100vh-133px)]">
            <div className="flex items-center gap-2 mx-6 mt-6">
              <Button
                isIconOnly
                onClick={() => setShowEmojiPickerMessage(false)}
                className="bg-primary-400 !min-w-0 !w-4 h-4 !rounded-2"
              >
                <ArrowLeft2 className="text-white w-[10px]" />
              </Button>
              <span className="text-secondary-1000 text-sm">Emoji</span>
            </div>
            <Picker
              data={data}
              emojiVersion="14"
              perLine="10"
              maxFrequentRows="20"
              previewPosition="none"
              skinTonePosition="none"
              navPosition="bottom"
              style={{
                background: "#000 !important",
              }}
              onEmojiSelect={handleEmojiClickMessage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextBox;
