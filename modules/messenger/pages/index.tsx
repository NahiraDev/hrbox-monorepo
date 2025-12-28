import { useDispatch, useSelector } from "react-redux";
import MessengerSideBar from "../../sections/Sidebar";
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
                                          children
                                        }: {
  children: React.ReactNode;
}) {


  return (

  );
}
