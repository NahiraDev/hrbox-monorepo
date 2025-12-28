import { ReactNode } from "react";
import { useMatches } from "@tanstack/react-router";
import { useDynamicBackground } from "@hrbox/core/hooks/useDynamicBackground";
import { MessengerSideBar } from "@hrbox/uikit/sections/MessengerSideBar";
import { SignalRContextProvider } from "@hrbox/core/providers/SignalRWebSocket";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@hrbox/core/redux";
import { PrivateChatHeaderInfo } from "@hrbox/modules/messenger/components/HeaderInfo/PrivateChatHeaderInfo";
import { RenderMessengerSideBarItems } from "@hrbox/modules/messenger/components/RenderMessengerSideBarItems";
import { GroupHeaderInfo } from "@hrbox/modules/messenger/components/HeaderInfo/GroupHeaderInfo";
import { ChannelHeaderInfo } from "@hrbox/modules/messenger/components/HeaderInfo/ChannelHeaderInfo";
import { SaveMessageHeaderInfo } from "@hrbox/modules/messenger/components/HeaderInfo/SaveMessageHeaderInfo";

interface BaseLayoutProps {
  children: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  const matches = useMatches();
  const { panelBackground } = useDynamicBackground();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state?.profile?.profile);
  const handleCloseInfo = () => {
    // dispatch(closeInfo());
  };
  const currentRoute = matches[matches.length - 1];
  const routeContext = currentRoute?.context as any;

  const SubHeader = routeContext?.subHeader;
  const subHeaderProps = routeContext?.subHeaderProps || {};

  return (
    <div
      className="h-full flex flex-col gap-6 xl:pr-16 pr-4 xl:pl-8 pl-4 xl:pb-8 pb-4 xl:pt-6 pt-4 bg-no-repeat bg-cover"
      style={{
        backgroundImage: panelBackground && `url(${panelBackground})`,
        backgroundColor: !panelBackground
          ? "var(--color-panel-background)"
          : undefined
      }}
    >
      <SignalRContextProvider>
        <div className="flex w-full gap-10">
          <MessengerSideBar />
          <div className="mr-16 w-full">
            <div className="border border-primary-400 dark:border-surface-200 rounded-5 w-full relative">
              <div className="flex w-full h-[86vh]">
                <div>
                  <RenderMessengerSideBarItems />
                </div>
                <div className="w-full">
                  {(() => {
                    switch (profile?.chat_type) {
                      case "private":
                        return <PrivateChatHeaderInfo />;
                      case "group":
                        return <GroupHeaderInfo />;
                      case "channel":
                        return <ChannelHeaderInfo />;
                      case "save":
                        return <SaveMessageHeaderInfo />;
                    }
                  })()}
                  <div
                    onClick={handleCloseInfo}
                    className="h-full overflow-y-scroll relative scrollbar-hidden rounded-r-5 bg-white dark:bg-info-1000"
                  >
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignalRContextProvider>
    </div>
  );
}
