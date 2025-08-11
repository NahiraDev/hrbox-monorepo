type LanguageState = {
    lang: string;
    locale: string;
};
export declare const setLanguage: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "language/setLanguage">, setLocalLanguage: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "language/setLocalLanguage">;
export declare const selectLanguage: (state: {
    language: LanguageState;
}) => LanguageState;
declare const _default: import("@reduxjs/toolkit").Reducer<LanguageState>;
export default _default;
//# sourceMappingURL=language.d.ts.map