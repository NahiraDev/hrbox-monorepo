import { useSelector } from "react-redux";
import { RootState } from "@hrbox/core/redux/store";

const InfoLayout = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen
  );

  return (
    <div
      className={`w-64 h-[86vh] rounded-br-5 rounded-tr-5 bg-white dark:bg-info-1000 z-50 shadow-shadow-light-tight/1 px-6 pt-6 absolute right-0 top-0 ${!isOpen && "hidden"}`}
    >
      {children}
    </div>
  );
};

export default InfoLayout;
