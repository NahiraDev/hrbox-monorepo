import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { Edit, Trash } from "iconsax-react";
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure, } from "@heroui/react";
import { AppPagination } from "./AppPagination";
import { CloseIcon } from "@hrbox/shared-templates";
const AppTable = ({ props }) => {
    const { data, columns, onOpenEditDialog, hasPagination = true, hasPadding = true, hasShadow = true, hasRowBorder = true, } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    if (!data.length)
        return _jsx("div", { className: "p-4", children: "No data available" });
    const autoColumns = columns ||
        Object.keys(data[0])
            .filter((key) => key !== "id")
            .map((key) => ({ key, label: key }));
    const renderActions = () => (_jsxs("div", { className: "relative flex items-center justify-center gap-2", children: [_jsx(Tooltip, { content: "Edit", children: _jsx(Button, { className: "!min-w-fit !p-0 !w-4 !h-4 !rounded-0 !bg-transparent", onPress: onOpenEditDialog, children: _jsx("span", { className: "text-lg cursor-pointer", children: _jsx(Edit, { size: "16" }) }) }) }), _jsx(Tooltip, { content: "Delete", children: _jsx(Button, { className: "!min-w-fit !p-0 !w-4 !h-4 !rounded-0 !bg-transparent", onPress: onOpen, children: _jsx("span", { className: "text-lg cursor-pointer", children: _jsx(Trash, { size: "16" }) }) }) })] }));
    return (_jsxs("div", { className: `bg-primary-50 w-full border border-primary dark:bg-[rgba(4,66,92,0.60)] ${hasPadding && "pt-5 pl-5 pr-6"} pb-4 h-full !rounded-[14px] ${hasShadow && "shadow-shadow-light-tight/1"}`, children: [_jsxs(Table, { "aria-label": "Customizable Table", className: "!h-[95%]", children: [_jsxs(TableHeader, { className: "!rounded-0", children: [autoColumns.map((col) => (_jsx(TableColumn, { className: "text-white dark:text-white text-sm font-semibold bg-primary dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12", children: col.label }, col.key))), _jsx(TableColumn, { className: "text-white dark:text-white text-sm font-semibold bg-primary dark:bg-[rgba(4,66,92,0.60)] text-center", children: "Actions" })] }), _jsx(TableBody, { children: data.map((row, index) => (_jsxs(TableRow, { className: `${hasRowBorder && "border-b border-[#dcf0f966] dark:border-[#04425c66]"} hover:bg-surface dark:hover:bg-[#04425c66] !rounded-4 transition-colors !h-12`, children: [autoColumns.map((col) => (_jsx(TableCell, { className: "text-xs font-normal text-black dark:text-white text-center", children: row[col.key] ??
                                        (col.key.toLowerCase().includes("date") ? "Present" : "") }, col.key))), _jsx(TableCell, { className: "text-xs font-normal text-secondary-400 dark:text-secondary-0", children: renderActions() })] }, row.id ?? index))) })] }), hasPagination && (_jsx("div", { className: "flex justify-end", children: _jsx(AppPagination, { props: {
                        size: "md",
                        total: data.length,
                    } }) })), _jsx(Modal, { hideCloseButton: true, backdrop: "blur", isOpen: isOpen, size: "2xl", onOpenChange: onOpenChange, children: _jsx(ModalContent, { className: "rounded-[12px] bg-white/30 shadow-md backdrop-blur-[40px] p-12", children: (onClose) => (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { children: _jsxs("div", { className: "flex justify-between items-center w-full", children: [_jsxs("div", { className: "bg-danger flex gap-2 !rounded-4 !px-3 !py-1.5 items-center", children: [_jsx(Trash, { className: "text-white", size: "18" }), _jsx("span", { className: "text-xl text-white font-normal leading-normal", children: "Would it be acceptable for you to remove this?" })] }), _jsx(Button, { className: "!w-6 !h-6 !p-0 !min-w-fit !rounded-0", variant: "light", onPress: onClose, children: _jsx(CloseIcon, {}) })] }) }), _jsxs(ModalFooter, { children: [_jsx(Button, { className: "text-secondary-800 !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit", color: "default", variant: "light", onPress: onClose, children: "Cancel" }), _jsx(Button, { className: "bg-danger text-white !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit", onPress: () => {
                                            onClose();
                                        }, children: "Delete" })] })] })) }) })] }));
};
export default AppTable;
