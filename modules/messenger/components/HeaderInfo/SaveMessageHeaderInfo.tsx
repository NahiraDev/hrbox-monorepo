import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Grid9, Save2, SearchNormal1 } from "iconsax-reactjs";
import { AppDispatch, RootState } from "@hrbox/core/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleInfo } from "@hrbox/core/redux/slices/messengerAction";
import SearchBox from "../SearchBox";
import SaveMessageInfo from "../Info/SaveMessageInfo";

export const SaveMessageHeaderInfo = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const isOpenMessengerInfo = useSelector(
    (state: RootState) => state.messengerAction.isOpen
  );
  const isOpenEmojipicker = useSelector(
    (state: RootState) => state.messengerAction.isOpenEmojiPicker
  );

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
            className={`
  absolute left-0 top-0 z-30 h-[72px]
  flex flex-row items-center px-8 py-4 gap-6
  !backdrop-blur-[6px] !rounded-tr-5
  cursor-pointer transition-colors duration-300

  !bg-gradient-to-r !from-[#ffffffcc] !to-white
  dark:!from-[#01101ab3] dark:!to-[#01101A]

  ${
              isOpenMessengerInfo || isOpenEmojipicker ? "w-[calc(100%-256px)]" : "w-full"
            }

  ${isSelected ? "bg-primary-0 dark:bg-primary-800" : ""}

  hover:bg-primary-0 dark:hover:bg-primary-800
`}
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
                onPress={handleShowSearchBox}
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
