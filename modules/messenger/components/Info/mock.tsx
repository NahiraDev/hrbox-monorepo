import Photos from "../Files/Photos";
import Links from "../Files/Links";
import Files from "../Files/Files";
import Audios from "../Files/Audios";
import GroupMembers from "../Files/Members";

export const channelTabs = [
  {
    id: "subscribers",
    label: "Subscribers",
    content: <GroupMembers type="channel" />,
  },
  {
    id: "photo",
    label: "Photo",
    content: <Photos />,
  },
  {
    id: "file",
    label: "File",
    content: <Files />,
  },
  {
    id: "audio",
    label: "Audio",
    content: <Audios />,
  },
  {
    id: "link",
    label: "Link",
    content: <Links />,
  },
];

export const groupTabs = [
  {
    id: "members",
    label: "Members",
    content: <GroupMembers type="group" />,
  },
  {
    id: "photo",
    label: "Photo",
    content: <Photos />,
  },
  {
    id: "file",
    label: "File",
    content: <Files />,
  },
  {
    id: "audio",
    label: "Audio",
    content: <Audios />,
  },
  {
    id: "link",
    label: "Link",
    content: <Links />,
  },
];

export const privateChatTabs = [
  {
    id: "photo",
    label: "Photo",
    content: <Photos />,
  },
  {
    id: "file",
    label: "File",
    content: <Files />,
  },
  {
    id: "audio",
    label: "Audio",
    content: <Audios />,
  },
  {
    id: "link",
    label: "Link",
    content: <Links />,
  },
];
