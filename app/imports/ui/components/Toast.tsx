import React from "react";

import { IToastSnapshot } from "../../state/store";

export interface ToastProps extends IToastSnapshot {
  onClose: () => void;
}

export default function Toast(props: ToastProps) {
  React.useEffect(() => {
    window.setTimeout(() => {
      props.onClose();
    }, props.duration);
  }, []);

  return (
    <div className={`toast ${props.status}`}>
      {props.isClosable && <button onClick={props.onClose}>X</button>}

      <h5 className="title">{props.title}</h5>
      <p className="description">{props.description}</p>
    </div>
  );
}
