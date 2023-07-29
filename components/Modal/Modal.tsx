import React from "react";
import styles from "./styles/modal.module.sass";

type PropsWithChildren<P = unknown> = P & {
    children?: React.ReactNode | undefined;
    setModal: any;
    type: "attention" | "message";
};

export default function Modal({ children, setModal, type }: PropsWithChildren) {
    function onClick() {
        setModal({ show: false, content: "" });
    }

    return (
        <div className={styles.background} onClick={onClick}>
            <div
                className={[styles.window, styles[type]].join(" ")}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
