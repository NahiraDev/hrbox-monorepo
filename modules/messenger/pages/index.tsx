import { useDispatch, useSelector } from "react-redux";
import MessengerSideBar from "../../components/Sidebar";
import SideContacts from "../../components/SideChatItems";
import { closeInfo } from "../../redux/reducers/messengerAction";
import { AppDispatch, RootState } from "../../redux/store";
import MessengerBackground from "../../assets/chat-bg.png";
import { PrivateChatHeaderInfo } from "../../components/HeaderInfo/PrivateChatHeaderInfo";
import { SignalRContextProvider } from "../../context/SignalRWebSocket";
import { GroupHeaderInfo } from "../../components/HeaderInfo/GroupHeaderInfo";
import { ChannelHeaderInfo } from "../../components/HeaderInfo/ChannelHeaderInfo";
import { SaveMessageHeaderInfo } from "../../components/HeaderInfo/SaveMessageHeaderInfo";

export default function MessengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state?.profile?.profile);
  const handleCloseInfo = () => {
    dispatch(closeInfo());
  };

  return (
    <SignalRContextProvider>
      <div className="flex w-full gap-10">
        <MessengerSideBar />
        <div className="mr-16 w-full">
          <div className="border border-primary-400 dark:border-surface-200 rounded-5 w-full relative">
            <div className="flex w-full h-[86vh]">
              <div>
                <SideContacts />
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
                  style={{
                    backgroundImage: `url(${MessengerBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
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
  );
}
