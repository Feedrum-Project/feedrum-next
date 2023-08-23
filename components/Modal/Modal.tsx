import React, { Dispatch, ReactNode, SetStateAction } from "react";
import styles from "./styles/modal.module.sass";

interface IModal {
  show: boolean;
  content: ReactNode;
}

type PropsWithChildren<P = unknown> = P & {
  modalState: [IModal, Dispatch<SetStateAction<IModal>>];
  type: "attention" | "message";
};

export default function Modal({ modalState, type }: PropsWithChildren) {
  const [modal, setModal] = modalState;
  function onClick() {
    setModal({ show: false, content: "" });
  }

  if (modal.show)
    return (
      <div className={styles.background} onClick={onClick}>
        <div
          className={[styles.window, styles[type]].join(" ")}
          onClick={(e) => e.stopPropagation()}
        >
          {modal.content};
        </div>
      </div>
    );
  return null;
}
