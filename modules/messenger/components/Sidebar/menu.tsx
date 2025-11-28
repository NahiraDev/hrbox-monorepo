import {
  Home,
  Profile2User,
  People,
  VolumeHigh,
  Archive,
  Setting2,
  Global,
  LogoutCurve,
} from "iconsax-react";
import { PATH_MESSENGER } from "../../routes/paths";

export const sideBarMenu = [
  {
    icon: <Home size="24" />,
    name: "Home",
    route: PATH_MESSENGER.HomePageMessenger,
  },
  {
    icon: <Profile2User size="24" />,
    name: "Private",
    route: PATH_MESSENGER.ContactPageMessenger,
  },
  {
    icon: <People size="24" />,
    name: "Group",
    route: PATH_MESSENGER.GroupPageMessenger,
  },
  {
    icon: <VolumeHigh size="24" />,
    name: "Channel",
    route: PATH_MESSENGER.ChannelPageMessenger,
  },
  {
    icon: <Archive size="24" />,
    name: "Saved",
    route: PATH_MESSENGER.SavePageMessenger,
  },
];

export const bottomSideBarMenu = [
  { icon: <Setting2 size="24" />, name: "Setting", route: "/setting" },
  { icon: <Global size="24" />, name: "English", route: "/" },
  { icon: <LogoutCurve size="24" />, name: "Log out", route: "logout" },
];
