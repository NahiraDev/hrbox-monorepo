import { MessageTypes } from "../../types";

export type MessageProps = {
  message: MessageTypes[];
  isSent: boolean;
};
export interface ReactMessageProps {
  setIsOpenMessengerAction: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenMessengerAction?: boolean;
  message: MessageTypes;
}
