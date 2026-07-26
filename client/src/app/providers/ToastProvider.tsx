import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss
      limit={3}
      theme="light"
    />
  );
}