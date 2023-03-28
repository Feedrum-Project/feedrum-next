import styles from "./styles/footer.module.sass";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>
                <div className="logo">Feedrum</div>
                <div className={styles.desc}>
                    Соціальна платформа для
                    україномовних девелоперів
                </div>
            </div>
            <div className={styles.footerMiddle}>
                <ul>
                    <li><Link href="/api">API</Link></li>
                    <li><Link href="/">Головна</Link></li>
                    <li><Link href="/sponsors">Спонсори</Link></li>
                    <li><Link href="/login">Вхід</Link></li>
                    <li><Link href="/register">Реєстрація</Link></li>
                </ul>
                <div className={styles.dots}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <span>Feedrum Community © 2016 - 2023</span>
            </div>
        </footer>
    );
}