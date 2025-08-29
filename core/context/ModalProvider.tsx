import { createContext, useState, useContext } from 'react';

interface AppState {
  isEditMode: boolean;
  isShowMode: boolean;
  activateEditMode: () => void;
  activateShowMode: () => void;
  deactivateModes: () => void;
}

const ModalManagementContext = createContext<AppState | undefined>(undefined);

export const ModalManagementProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isShowMode, setIsShowMode] = useState(false);

  const activateEditMode = () => {
    setIsEditMode(true);
    setIsShowMode(false);
  };

  const activateShowMode = () => {
    setIsShowMode(true);
    setIsEditMode(false);
  };

  const deactivateModes = () => {
    setIsEditMode(false);
    setIsShowMode(false);
  };

  return (
    <ModalManagementContext.Provider
      value={{
        isEditMode,
        isShowMode,
        activateEditMode,
        activateShowMode,
        deactivateModes,
      }}
    >
      {children}
    </ModalManagementContext.Provider>
  );
};

export const useModalManagement = () => {
  const context = useContext(ModalManagementContext);

  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }

  return context;
};
