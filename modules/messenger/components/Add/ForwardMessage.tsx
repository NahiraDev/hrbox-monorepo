import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { handleGetContactsApi } from "../../services/Messenger/UserService/apis";
import { MemberListProps } from "./types";
import { handleForwardMessageApi } from "../../services/Messenger/PrivateChatService/apis";
import { MemberTypes, PrivateChatTypes } from "../../types";

const ForwardMessage = ({ data }: MemberListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const privateChats = useSelector(
    (state: RootState) => state.privateChat.privateChats,
  );
  const groups = useSelector((state: RootState) => state?.groups?.groups);
  const channels = useSelector((state: RootState) => state?.channels?.channels);
  const saveMessages = useSelector(
    (state: RootState) => state?.saveMessage?.messages,
  );
  const profileUser = JSON.parse(localStorage.getItem("profile") || "{}");
  const allChats = [...privateChats, ...groups, ...channels, saveMessages];

  const handleForward = (item: MemberTypes) => {
    dispatch(
      handleForwardMessageApi({
        forward_message: data?.message,
        chat_id: item?.id,
      }),
    );
    // data.setIsOpenAddModal(false);
  };

  return (
    <div className="flex flex-col px-4 py-9 rounded-3 bg-white dark:bg-info-1000">
      <div>
        <SearchBox />
      </div>
      <div>
        {allChats &&
          allChats.map((item: any, index: number) => (
            <>
              {item?.sender_id === profileUser?.user_id && (
                <div
                  key={index}
                  onClick={() => handleForward(item)}
                  className="flex items-center gap-2 px-4 py-1 border-b border-primary-0 border-opacity-40 cursor-pointer"
                >
                  <div className="py-2">
                    <Avatar radius="sm" src={item?.image} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-normal text-xs font-open-sans leading-normal text-secondary-1000 dark:text-white">
                      {item?.name}
                    </span>
                    <span className="font-light text-[10px] font-open-sans leading-normal text-secondary-800 dark:text-neutral-50">
                      {item?.description}
                    </span>
                  </div>
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default ForwardMessage;
