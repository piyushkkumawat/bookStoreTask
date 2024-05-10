import { toast } from "react-toastify";
import styles from "../Styles/notification.module.css";

export const SuccessToast = (message) => {
  return toast.success(message, {
    position: toast.POSITION?.TOP_RIGHT,
    className: styles.toast_message,
    autoClose: 2000,
  });
};
export const ErrorToast = (message) => {
  return toast.error(message, {
    position: toast.POSITION?.TOP_RIGHT,
  });
};
export const WarningToast = (message) => {
  return toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
