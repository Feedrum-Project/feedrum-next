import styles from "./styles/checkbox.module.sass";

export default function Checkbox({children}: {children: string}) {
    return (
        <div className={styles.checkbox}>
            <label className={styles.checkbox}>
                <input type="checkbox"/>
                <span className={styles.checkmark}>
                    <span className={styles.isChecked}></span>
                </span>
                <span className={styles.labelText}>{children}</span>
            </label>
        </div>
    );
}