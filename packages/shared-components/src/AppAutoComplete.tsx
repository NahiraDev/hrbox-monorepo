import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useSelector } from "react-redux";

import { RootState } from "@hrbox/shared-templates";

export const AppAutoComplete = ({ props }: { props: any }) => {
  const { data, label, placeholder, required } = props;
  const lang = useSelector((state: RootState) => state.language.lang);

  return (
    <div className="flex w-full gap-4">
      <span
        className={`text-secondary-1000 lg:text-sm text-xs lg:font-medium font-semibold leading-5 dark:text-white ${
          lang === "en" && ""
        }`}
      >
        {label} {required && "*"}
      </span>
      <Autocomplete placeholder={placeholder}>
        {data.map((item: any) => (
          <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};
