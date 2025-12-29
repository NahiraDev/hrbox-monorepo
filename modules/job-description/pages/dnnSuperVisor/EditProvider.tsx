import { createContext, useContext, useState } from "react";

type EdiContext = {
  edit: boolean;
  setEdit: (value: boolean) => void;
};

const EditContext = createContext<EdiContext | null>(null);
export const EditProvider = ({ children }: { children: React.ReactNode }) => {
  const [edit, setEdit] = useState(false);
  return (
    <EditContext.Provider value={{ edit, setEdit }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEdit = () => {
  const ctx = useContext(EditContext);
  if (!ctx) {
    throw new Error("useEdit must be used inside EditProvider");
  }
  return ctx;
};
