import RegistrationForm from "module/RegistrationForm/RegistrationForm";
import Image from "next/image";
import Link from "next/link";
import logo from "images/logo.svg";
import styles from "./registration.module.sass";

export default function Registration() {
    return (
        <div className={styles.main}>
            <div>
                <div className={styles.logo}>
                    <Image src={logo} alt="Логотип" width={42} />
                    <Link href="/">Feedrum</Link>
                </div>
                <div className={styles.form}>
                    <div className={styles.registration}>
                        <div className={styles.registrationTop}>
                            <div className={styles.registrationTitle}>
                                Зареєструватися
                            </div>
                            <div className={styles.login}>
                                або{" "}
                                <u>
                                    <Link href="/login">увійти</Link>
                                </u>
                            </div>
                        </div>
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
