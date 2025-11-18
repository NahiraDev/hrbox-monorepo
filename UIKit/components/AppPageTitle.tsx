import React from "react";

interface ModalProps {
  title: string;
  icon?: React.ReactNode;
}


export const AppPageTitle = ({title , icon} : ModalProps) => {
  return (
    <div className="flex items-center gap-2 rounded-md bg-primary shadow-light-tight/1 px-3 py-1.5 w-fit">
      {icon}
      <span className="text-white text-xl font-normal">{title}</span>
    </div>
  )
}
