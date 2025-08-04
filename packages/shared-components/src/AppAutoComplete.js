import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useSelector } from "react-redux";
export const AppAutoComplete = ({ props }) => {
    const { data, label, placeholder, required } = props;
    const lang = useSelector((state) => state.language.lang);
    return (_jsxs("div", { className: "flex w-full gap-4", children: [_jsxs("span", { className: `text-secondary-1000 lg:text-sm text-xs lg:font-medium font-semibold leading-5 dark:text-white ${lang === "en" && ""}`, children: [label, " ", required && "*"] }), _jsx(Autocomplete, { placeholder: placeholder, children: data.map((item) => (_jsx(AutocompleteItem, { children: item.label }, item.key))) })] }));
};
