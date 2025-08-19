export declare const login: {
    (props: any): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const SSOLoginByOtpHRLink: {
    (props: any): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const SSORegisterHRLink: {
    (props: any): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const SSOOneTimePasswordHRLink: {
    (props: any): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const SSOForgetPasswordHRLink: {
    (props: any): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const SSOResetPasswordHRLink: {
    (props: any): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const SSOHRLinkRoutes: import("react-router-dom").RouteObject[];
export declare const SSOHRLinkPaths: {
    root: string;
    path: (subPath?: string) => string;
    link: (subPath?: string) => {
        path: string;
        href: string;
    };
} & {
    Login: string;
    LoginByOtp: string;
    OneTimePassword: string;
    Register: string;
    ForgetPassword: string;
    ResetPassword: string;
};
//# sourceMappingURL=index.d.ts.map