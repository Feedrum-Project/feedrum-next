import Link from "next/link";
import styles from "../styles/errors.module.sass";

export default function Error404() {
    return (
        <>
            <div className={styles.main}>
                <h1 className={styles.code}>404</h1>
                <span className={styles.information}>Сторінки не знайдено</span>
                <Link href={"/"} className={styles.link}>
                    До головної?
                </Link>
            </div>
        </>
    );
}
