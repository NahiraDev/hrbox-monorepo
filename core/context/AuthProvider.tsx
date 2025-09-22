import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  authType: string;
  setAuthType: (type: string) => void;
  mobile: string;
  setMobile: (user: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authType, setAuthType] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [otp, setOtp] = useState<string>('');

  return (
    <AuthContext.Provider value={{ authType, setAuthType, mobile, setMobile, otp, setOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
