import { ReactNode } from "react";
import styles from "./styles/box.module.sass";

interface IBox {
    title: string;
    children: ReactNode;
}
export default function Box({ title, children }: IBox) {
    return (
        <div className={styles.box}>
            <div className={styles.boxTop}>
                <h1>{title}</h1>
            </div>
            <div className={styles.middle}>{children}</div>
        </div>
    );
}
