import styles from "./styles/footer.module.sass";
import Link from "next/link";
import Image from "next/image";
import telegram from "images/Telegram.svg";
import youtube from "images/Youtube.svg";
import discord from "images/Discord.svg";
import logo from "images/logo.svg";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}></div>
            <div className={styles.footerMiddle}>
                <ul>
                    <li>
                        <Link href="/api">API</Link>
                    </li>
                    <li>
                        <Link href="/">Головна</Link>
                    </li>
                    <li>
                        <Link href="/sponsors">Спонсори</Link>
                    </li>
                    <li>
                        <Link href="/api">API</Link>
                    </li>
                    <li>
                        <Link href="/login">Вхід</Link>
                    </li>
                    <li>
                        <Link href="/register">Реєстрація</Link>
                    </li>
                </ul>
                <div className={styles.dots}>
                    <button>
                        <Image src={telegram} alt="telegram" />
                    </button>
                    <button>
                        <Image src={youtube} alt="youtube" />
                    </button>
                    <button>
                        <Image src={discord} alt="discord" />
                    </button>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <div className={styles.footerBottomLeft}>
                    <div className={styles.logo}>
                        <Image src={logo} alt="logo" />
                        <span>Feedrum</span>
                    </div>
                    <div className={styles.desc}>
                        <span>
                            Соціальна платформа для україномовних девелоперів
                        </span>
                    </div>
                </div>
                <span>Feedrum Community © 2016 - 2023</span>
            </div>
        </footer>
    );
}
