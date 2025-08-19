import React from 'react';
interface AuthContextType {
    authType: string;
    setAuthType: (type: string) => void;
    mobile: string;
    setMobile: (user: string) => void;
    otp: string;
    setOtp: (otp: string) => void;
}
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useAuth: () => AuthContextType;
export {};
//# sourceMappingURL=AuthProvider.d.ts.map