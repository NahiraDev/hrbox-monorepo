import React from 'react';

interface ModalProps {
  title: string;
  icon?: React.ReactNode;
}


const AppPageTitle = ({title , icon} : ModalProps) => {
  return (
    <div className="flex items-center gap-2 rounded-4 bg-secondary-400 shadow-light-tight/1 px-3 py-1.5 w-fit">
      {icon}
      <span className="text-white text-xl font-normal">{title}</span>
    </div>
  )
}

export default AppPageTitle
