import React from "react";
export type SideBarItem = {
    icon: React.ReactNode;
    name: string;
    route?: string;
};
type SideBarProps = {
    menu: SideBarItem[];
};
declare const AppSideBar: ({ menu }: SideBarProps) => import("react/jsx-runtime").JSX.Element;
export default AppSideBar;
//# sourceMappingURL=AppSideBar.d.ts.map