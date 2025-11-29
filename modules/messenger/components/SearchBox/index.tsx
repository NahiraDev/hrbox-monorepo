import { Input } from "@nextui-org/react";
import { SearchIcon } from "@nextui-org/shared-icons";
import { useEffect, useState } from "react";
import CloseIconSvg from "../../icons/CloseIcon";
import { useDarkMode } from "../../context/DarkMode";

const SearchBox = () => {
  const [active, setActive] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const { darkMode } = useDarkMode();

  useEffect(() => {
    setActive(searchText.length > 0);
  }, [searchText]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };
  return (
    <div className="flex justify-start items-center w-full">
      <Input
        type="text"
        variant="bordered"
        onFocus={() => setActive(true)}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Type Something..."
        value={searchText}
        className={`h-10 border-none sha relative dark:text-white text-netural-400`}
        classNames={{
          inputWrapper: [
            "group-data-[focus=true]:border-!netural-100",
            "!rounded-4 !shadow-none",
            darkMode
              ? "border-1 border-netural-700"
              : "border-1 border-netural-100",
          ],
          input: [
            darkMode
              ? "placeholder:text-white"
              : "placeholder:text-netural-400",
          ],
        }}
        startContent={
          active ? (
            <div
              className={`flex justify-center ease-in-out absolute left-3 right-0 top-2 bottom-0 items-start w-5 h-5 ${darkMode ? "border-netural-250" : "border-netural-400"} border-l-[0.4px]`}
            ></div>
          ) : (
            <SearchIcon
              className={`w-6 h-6 dark:text-white text-netural-400`}
            />
          )
        }
        endContent={
          active && (
            <div
              className="cursor-pointer transition-transform"
              onClick={() => {
                setActive((prev) => !prev);
                setSearchText("");
              }}
            >
              <CloseIconSvg />
            </div>
          )
        }
      />
    </div>
  );
};

export default SearchBox;
