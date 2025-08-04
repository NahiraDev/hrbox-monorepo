
import {toast, type ToastPosition} from "react-toastify";

export const notify = (
    message: string,
    type: "info" | "success" | "warning" | "error" | "default" = "info",
    position: ToastPosition = "top-right"
) => {
    (toast as any)[type]?.(message, { position }) ?? toast(message, { position });
};
