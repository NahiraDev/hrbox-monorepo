import { Avatar } from "@heroui/react";
import SearchBox from "../SearchBox";
import { useSelector } from "react-redux";
import { RootState } from "@hrbox/core/redux/store";
import { MemberListProps } from "./types";
import { MemberTypes, PrivateChatTypes } from "../../types";
import { useCreateChatMutation } from "@hrbox/modules/messenger/apis/Private";
import { useGetContactsQuery } from "@hrbox/modules/messenger/apis/User";

const MembersList = ({ data }: MemberListProps) => {
  const [createChat] = useCreateChatMutation();
  const { data: contacts } = useGetContactsQuery();
  const users = useSelector((state: RootState) => state.users?.users);
  const profileUser = JSON.parse(localStorage.getItem("profile") || "{}");

  const handleCreateChat = (user: MemberTypes) => {
    const newChat: PrivateChatTypes | any = {
      type: "private",
      recipient_id: user.user_id,
      sender_id: profileUser?.user_id,
      image: user.image,
      name: user.name,
      description: user.description,
      user_name: user?.user_name,
      muted: false,
      messages: [],
      create_at: new Date().toString()
    };
    createChat({ newChat });
    data.setIsOpenAddModal(false);
  };

  return (
    <div className="flex flex-col px-4 py-9 rounded-3 bg-white dark:bg-info-1000">
      <div>
        <SearchBox />
      </div>
      <div>
        {users &&
          users.map((item: MemberTypes, index: number) => (
            <div
              key={index}
              onClick={() => handleCreateChat(item)}
              className={`${item?.user_id === profileUser.user_id && "hidden"} flex items-center gap-2 px-4 py-1 border-b border-primary-0 border-opacity-40 cursor-pointer`}
            >
              <div className="py-2">
                <Avatar radius="sm" src={item?.image} />
              </div>
              <div className="flex flex-col">
                <span className="font-normal text-xs font-open-sans leading-normal text-secondary-1000 dark:text-white">
                  {item?.name}
                </span>
                <span
                  className="font-light text-[10px] font-open-sans leading-normal text-secondary-800 dark:text-neutral-50">
                  {item?.description}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MembersList;