import { Button } from "@nextui-org/react";
import MessengerIcon from "../../icons/MessengerIcon";
import { useNavigate } from "react-router-dom";
import { PATH_MESSENGER } from "../../routes/paths";

const OpenMessenger = () => {
  const navigate = useNavigate();

  const handleOpenMessenger = () => {
    navigate(PATH_MESSENGER.HomePageMessenger);
  };
  return (
    <Button
      isIconOnly
      onClick={handleOpenMessenger}
      className="absolute bottom-10 right-10 z-50 bg-gradient-to-b from-[#900F2E] to-[#FD1B51] w-[72px] h-[72px] flex items-center justify-center rounded-full !p-0"
    >
      <MessengerIcon />
    </Button>
  );
};

export default OpenMessenger;
