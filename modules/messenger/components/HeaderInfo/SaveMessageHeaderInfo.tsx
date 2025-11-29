import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Save2, SearchNormal1 } from "iconsax-react";
import { useDarkMode } from "../../context/DarkMode";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Grid9 } from "iconsax-react";
import { toggleInfo } from "../../redux/reducers/messengerAction";
import { AppDispatch } from "../../redux/store";
import SearchBox from "../SearchBox";
import SaveMessageInfo from "../Info/SaveMessageInfo";

export const SaveMessageHeaderInfo = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const isOpenMessengerInfo = useSelector(
    (state: RootState) => state.messengerAction.isOpen,
  );
  const isOpenEmojipicker = useSelector(
    (state: RootState) => state.messengerAction.isOpenEmojiPicker,
  );
  const { darkMode } = useDarkMode();

  const handleSelect = () => {
    setIsSelected((prev) => !prev);
  };

  const handleOpenInformation = () => {
    dispatch(toggleInfo());
  };

  const handleShowSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  return (
    <div className="relative">
      <React.Fragment>
        <div className="flex relative">
          <div
            className={`absolute left-0 top-0 flex flex-row items-center px-8 py-4 gap-6 !backdrop-blur-[6px] h-[72px] z-30 ${!darkMode ? "!bg-gradient-to-r !from-[#ffffffcc] !to-white" : "!bg-gradient-to-r !from-[#01101ab3] !to-[#01101A]"} !rounded-tr-5 ${isOpenMessengerInfo || isOpenEmojipicker ? "w-[calc(100%-256px)]" : "w-full"}
              ${isSelected && (darkMode ? "bg-primary-800" : "bg-primary-0")} 
              cursor-pointer transition-colors duration-300
            hover:bg-primary-0 dark:hover:bg-primary-800`}
            onClick={handleSelect}
          >
            <div
              onClick={handleOpenInformation}
              className="cursor-pointer bg-secondary-400 rounded-3 w-10 h-10 flex justify-center items-center"
            >
              <Save2 size="24" className="text-white" />
            </div>

            <div className="flex flex-col flex-grow gap-1">
              <span className="text-secondary-1000 text-sm font-semibold">
                Saved Messages
              </span>
            </div>

            <div className="flex gap-4">
              {showSearchBox && <SearchBox />}
              <Button
                isIconOnly
                onClick={handleShowSearchBox}
                variant="light"
                className="p-1.5"
              >
                <SearchNormal1
                  size="20"
                  className="text-secondary-1000 dark:text-white"
                />
              </Button>
              <Button
                isIconOnly
                variant="light"
                onClick={handleOpenInformation}
              >
                <Grid9 size="20" className="text-secondary-1000" />
              </Button>
            </div>
          </div>
          <SaveMessageInfo />
        </div>
      </React.Fragment>
    </div>
  );
};
