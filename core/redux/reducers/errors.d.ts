interface ErrorState {
    message: string | null;
}
export declare const setError: import("@reduxjs/toolkit").ActionCreatorWithPayload<string | null, "error/setError">, clearError: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"error/clearError">;
declare const _default: import("@reduxjs/toolkit").Reducer<ErrorState>;
export default _default;
//# sourceMappingURL=errors.d.ts.map