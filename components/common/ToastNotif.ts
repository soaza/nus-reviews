import { toast } from "react-toastify";

export const popNotification = (title: string) => {
  toast.success(title, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });
};
