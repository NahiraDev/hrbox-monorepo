import { channelTabs, groupTabs, privateChatTabs } from "./mock";
import { Tab, Tabs } from "@heroui/react";
import { RootState } from "@hrbox/core/redux/store";
import { useSelector } from "react-redux";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";

const InfoTabs = () => {
  const recipient = useSelector((state: RootState) => state.profile.profile);
  return (
    <div className="mt-4">
      <div className="flex w-full flex-col mt-6">
        <Tabs
          aria-label="Dynamic tabs"
          variant="light"
          className="!rounded-[0px]"
          classNames={{
            tabList: "gap-6 !p-0 !rounded-[0px]",
            tab: "!rounded-1 !px-1 !py-0 !h-[20px]",
            tabContent:
              "font-light text-xs text-secondary-1000 dark:text-white group-data-[selected=true]:text-white",
            cursor:
              "!rounded-2 bg-primary-400 dark:bg-surface-200",
            panel: "!px-0 !py-4"
          }}
          items={
            recipient?.chat_type === "private" ||
            recipient?.chat_type === "save"
              ? privateChatTabs
              : recipient?.chat_type === "group"
                ? groupTabs
                : channelTabs
          }
        >
          {(item: {
            id: any;
            label: any;
            content: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined;
          }) => (
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
