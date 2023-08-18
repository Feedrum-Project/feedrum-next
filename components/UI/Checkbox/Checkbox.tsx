import { useState } from "react";
import styles from "./styles/checkbox.module.sass";

export default function Checkbox({ children }: { children: string }) {
    const [isChecked, setChecked] = useState<boolean>(false);
    return (
        <div className={styles.checkbox}>
            <div
                className={styles.checkbox}
                onClick={() => setChecked((pr) => !pr)}
            >
                <input type="checkbox" checked={isChecked} readOnly />
                <button className={styles.checkmark}>
                    <span className={styles.isChecked}></span>
                </button>
                <span className={styles.labelText}>{children}</span>
            </div>
        </div>
    );
}
