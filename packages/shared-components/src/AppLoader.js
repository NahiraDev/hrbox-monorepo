import { jsx as _jsx } from "react/jsx-runtime";
import Lottie from "lottie-react";
import { loader } from "@hrbox/shared-templates";
export const AppLoader = () => {
    return (_jsx("div", { className: "bg-white dark:bg-black w-full h-full z-50 absolute", children: _jsx("div", { className: "w-8 h-8 absolute left-1/2 top-1/2", children: _jsx(Lottie, { animationData: loader, loop: true }) }) }));
};
