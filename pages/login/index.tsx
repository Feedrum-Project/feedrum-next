import LoginForm from "module/LoginForm/LoginForm";
import Image from "next/image";
import Link from "next/link";
import styles from "./login.module.sass";
import logo from "images/logo.svg";

export default function Login() {
    return (
        <div className={styles.main}>
            <div>
                <div className={styles.logo}>
                    <Image src={logo} alt="Логотип" width={42}/>
                    <Link href="/">Feedrum</Link>
                </div>
                <div className={styles.form}>
                    <div className={styles.login}>
                        <LoginForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}