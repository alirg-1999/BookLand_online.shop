import React from "react";
import { toast } from "react-toastify";

export const AlertSuccess = (massage) => {
  return toast.success(massage, {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    style: { fontSize: "12px" },
    theme: "light",
  });
};

export const AlertError = (massage) => {
  return toast.error(massage, {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    style: { fontSize: "12px" },
    theme: "light",
  });
};
