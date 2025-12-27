import { useLocation } from "react-router-dom";
import { useDarkMode } from "../../context/DarkMode";
import { channelTabs, groupTabs, privateChatTabs } from "./mock";
import { Tabs, Tab } from "@nextui-org/react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const InfoTabs = () => {
  const { darkMode } = useDarkMode();
  const recipient = useSelector((state: RootState) => state.profile.profile);
  return (
    <div className="mt-4">
      <div className="flex w-full flex-col mt-6">
        <Tabs
          aria-label="Dynamic tabs"
          variant="light"
          className="!rounded-[0px]"
          classNames={
            darkMode
              ? {
                  tabList: "gap-6 !p-0 !rounded-[0px]",
                  tab: "!rounded-1 !px-1 !py-0 !h-[20px]",
                  tabContent:
                    "group-data-[selected=true]:text-white font-light text-xs",
                  cursor: "!bg-surface-200 !rounded-2",
                  panel: "!px-0 !py-4",
                }
              : {
                  tabList: "gap-6 !p-0 !rounded-[0px]",
                  tab: "!rounded-1 !px-1 !py-0 !h-[20px]",
                  tabContent:
                    "text-secondary-1000 group-data-[selected=true]:text-white font-light text-xs",
                  cursor: "!bg-primary-400 !rounded-2",
                  panel: "!px-0 !py-4",
                }
          }
          items={
            recipient?.chat_type === "private" ||
            recipient?.chat_type === "save"
              ? privateChatTabs
              : recipient?.chat_type === "group"
                ? groupTabs
                : channelTabs
          }
        >
          {(item) => (
            <Tab
              className="text-xs font-light leading-none"
              key={item.id}
              title={item.label}
            >
              <div>{item.content}</div>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default InfoTabs;
