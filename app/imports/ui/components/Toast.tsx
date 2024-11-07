import React from "react";
import "./toast.css";
import { createPortal } from "react-dom";

export interface ToastProps {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error";
  duration: number;
  isClosable: boolean;
}

export default function Toast(props: ToastProps) {
  console.log({ props });

  return createPortal(
    <div className={`toast ${props.status}`}>
      <p>{props.status}</p>
      <h5>{props.title}</h5>
      <p>{props.description}</p>
    </div>,
    document.body
  );
}
