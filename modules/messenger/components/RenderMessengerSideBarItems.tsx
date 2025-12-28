import { Edit, SearchNormal1 } from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@hrbox/core/redux/store";
import { useLocation } from "@tanstack/react-router";
import AddGroup from "@hrbox/modules/messenger/components/Add/AddGroup";
import MembersList from "@hrbox/modules/messenger/components/Add/MembersList";
import { PrivateChatItem as SinglePrivateChat } from "@hrbox/modules/messenger/components/ChatItem/PrivateChatItem";
import { GroupItem as SingleGroups } from "@hrbox/modules/messenger/components/ChatItem/GroupItem";
import { ChannelItem as SingleChannels } from "@hrbox/modules/messenger/components/ChatItem/ChannelItem";
import { SaveMessageItem as SingleSaveMessage } from "@hrbox/modules/messenger/components/ChatItem/SaveMessageItem";
import { GroupAndChannelTypes, PrivateChatTypes } from "@hrbox/modules/messenger/types";
import { CloseIcon } from "@hrbox/uikit/icons";
import { Button, Input, Modal, ModalContent } from "@heroui/react";

type CombinedItem =
  | { type: "chat"; data: PrivateChatTypes }
  | { type: "group"; data: GroupAndChannelTypes }
  | { type: "channel"; data: GroupAndChannelTypes }
  | { type: "savedMessage"; data: GroupAndChannelTypes | PrivateChatTypes };
export const RenderMessengerSideBarItems = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const location = useLocation();
  const chats: PrivateChatTypes[] = useSelector(
    (state: RootState) => state.privateChat?.privateChats
  );
  const groups: GroupAndChannelTypes[] = useSelector(
    (state: RootState) => state.groups?.groups
  );
  const channels: GroupAndChannelTypes[] = useSelector(
    (state: RootState) => state.channels?.channels
  );
  const [activePopover, setActivePopover] = useState<string>("");
  const recipient = useSelector((state: RootState) => state.profile.profile);
  const [active, setActive] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const saveMessage = [
    {
      id: recipient?.user_id,
      name: "Saved Messages"
    }
  ];

  const [selectedId, setSelectedId] = useState<string>("");
  const pinnedChats = chats.filter((chat: PrivateChatTypes) => chat?.pinned);
  const regularChats = chats.filter((chat: PrivateChatTypes) => !chat?.pinned);
  const pinnedGroups = groups.filter(
    (group: GroupAndChannelTypes) => group?.pinned
  );
  const regularGroups = groups.filter(
    (group: GroupAndChannelTypes) => !group?.pinned
  );
  const pinnedChannels = channels.filter(
    (channel: GroupAndChannelTypes) => channel?.pinned
  );
  const regularChannels = channels.filter(
    (channel: GroupAndChannelTypes) => !channel?.pinned
  );
  const sortedChats = [...pinnedChats, ...regularChats];
  const sortedGroups = [...pinnedGroups, ...regularGroups];
  const sortedChannels = [...pinnedChannels, ...regularChannels];

  const handleSelect = (id: string) => {
    setSelectedId(selectedId === id ? "" : id);
  };

  const handleOpenAddGroupModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  const handleSearch = (e: string) => {
    setSearchText(e);
  };

  const renderPrivateChats = (data: PrivateChatTypes, index: number) => (
    <SinglePrivateChat
      key={index}
      profile={data}
      isSelected={selectedId === data.id}
      onSelect={() => handleSelect(data.id)}
      showAction={activePopover === data.id}
      setShowAction={(state: any) => setActivePopover(state ? data.id : "")}
    />
  );

  const renderGroups = (data: GroupAndChannelTypes, index: number) => (
    <SingleGroups
      key={index}
      profile={data}
      isSelected={selectedId === data.id}
      onSelect={() => handleSelect(data.id as string)}
      showAction={activePopover === data.id}
      setShowAction={(state: string) =>
        setActivePopover(state && (data.id as string))
      }
    />
  );

  const renderChannels = (data: GroupAndChannelTypes, index: number) => (
    <SingleChannels
      key={index}
      profile={data}
      isSelected={selectedId === data.id}
      onSelect={() => handleSelect(data.id as string)}
      showAction={activePopover === data.id}
      setShowAction={(state: string) =>
        setActivePopover(state && (data.id as string))
      }
    />
  );

  const renderSaveMessages = (
    data: GroupAndChannelTypes | PrivateChatTypes,
    index: number
  ) => (
    <SingleSaveMessage
      key={index}
      profile={data}
      isSelected={true}
      onSelect={() => handleSelect(data.id as string)}
      showAction={activePopover === data.id}
      setShowAction={(state: any) =>
        setActivePopover(state && (data.id as string))
      }
    />
  );

  const combinedItems = [
    ...sortedChats.map((chat: PrivateChatTypes) => ({
      type: "chat",
      data: chat
    })),
    ...sortedGroups.map((group: GroupAndChannelTypes) => ({
      type: "group",
      data: group
    })),
    ...sortedChannels.map((channel: GroupAndChannelTypes) => ({
      type: "channel",
      data: channel
    })),
    ...saveMessage.map((msg) => ({ type: "savedMessage", data: msg }))
  ];

  const filteredCombinedItems = combinedItems.filter((item) => {
    const name = item?.data?.name?.toLowerCase();
    return name.includes(searchText?.toLowerCase());
  });

  const filteredPrivateChatItems = sortedChats.filter(
    (chat: PrivateChatTypes) => {
      const chatName = chat?.name.toLowerCase();
      return chatName.includes(searchText.toLowerCase());
    }
  );
  const filteredGroupChatItems = sortedGroups.filter(
    (group: GroupAndChannelTypes) => {
      const chatName = group?.name.toLowerCase();
      return chatName.includes(searchText.toLowerCase());
    }
  );

  const filteredChannelChatItems = sortedChannels.filter(
    (channel: GroupAndChannelTypes) => {
      const chatName = channel?.name.toLowerCase();
      return chatName.includes(searchText.toLowerCase());
    }
  );
  const renderCombinedItems = (item: CombinedItem, index: number) => {
    switch (item.type) {
      case "chat":
        return renderPrivateChats(item.data as PrivateChatTypes, index);
      case "group":
        return renderGroups(item.data as GroupAndChannelTypes, index);
      case "channel":
        return renderChannels(item.data as GroupAndChannelTypes, index);
      case "savedMessage":
        return renderSaveMessages(item.data, index);
      default:
        return null;
    }
  };

  useEffect(() => {
    setActive(searchText.length > 0);
  }, [searchText]);

  return (
    <div
      className="shadow-[0px_1px_3px_0px_rgba(8,14,28,0.25)] w-[388px] overflow-y-auto h-full !rounded-bl-5 !rounded-tl-5 relative z-50 scrollbar-hidden dark:bg-info-1000 bg-white">
      <div className="flex flex-col gap-5 px-6 sticky top-0 right-0 z-20 pt-9 pb-4 dark:bg-info-1000 bg-white">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <span className="text-lg font-semibold leading-normal dark:text-white text-secondary-1000">
              Messages
            </span>
            <span className="flex items-center gap-0.5 leading-normal dark:text-gold text-primary-400">
              <span className="text-sm font-normal">+</span>
              <span className="text-sm font-semibold">49</span>
              <span className="text-xs font-semibold">New</span>
            </span>
          </div>
          {location.pathname !== "/messenger/save" && (
            <Button
              isIconOnly
              variant="light"
              onClick={handleOpenAddGroupModal}
            >
              <Edit size="24" className="dark:text-gold text-primary-400" />
            </Button>
          )}
          <Modal
            scrollBehavior={"inside"}
            isOpen={isOpenAddModal}
            onOpenChange={handleOpenAddGroupModal}
          >
            <ModalContent>
              {(onClose: any) =>
                location.pathname === "/messenger/private_chats" ||
                location.pathname === "/messenger/home" ? (
                  <MembersList data={{ isOpenAddModal, setIsOpenAddModal }} />
                ) : location.pathname === "/messenger/group" ||
                location.pathname === "/messenger/channel" ? (
                  <AddGroup
                    data={{ isOpenAddModal, setIsOpenAddModal, onClose }}
                  />
                ) : null
              }
            </ModalContent>
          </Modal>
        </div>
        <div>
          <div className="flex justify-start items-center w-full">
            <Input
              type="text"
              variant="bordered"
              onFocus={() => setActive(true)}
              onChange={(e: any) => handleSearch(e.target.value)}
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
                    className="
    flex justify-center ease-in-out absolute left-3 right-0 top-2 bottom-0
    items-start w-5 h-5
    border-l-[0.4px]
    border-netural-400 dark:border-netural-250
  "
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
          </div>
        </div>
      </div>
      <div className="!rounded-tl-5">
        {location.pathname === "/messenger/home"
          ? filteredCombinedItems.map(renderCombinedItems)
          : location.pathname === "/messenger/private_chats"
            ? filteredPrivateChatItems.map(renderPrivateChats)
            : location.pathname === "/messenger/group"
              ? filteredGroupChatItems.map(renderGroups)
              : location.pathname === "/messenger/channel"
                ? filteredChannelChatItems.map(renderChannels)
                : location.pathname === "/messenger/save"
                  ? saveMessage.map(renderSaveMessages)
                  : null}
      </div>
    </div>
  );
};