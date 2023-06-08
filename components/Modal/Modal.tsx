import React from "react";
import styles from "./styles/modal.module.sass";

type PropsWithChildren<P = unknown> = P & { children?: React.ReactNode | undefined, setModal: any };

export default function Modal({children, setModal}: PropsWithChildren) {

    function onClick() {
        setModal({show: false, content: ""});
    }

    return (
        <div className={styles.background} onClick={onClick}>
            <div className={styles.window} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}