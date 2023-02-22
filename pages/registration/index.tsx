import RegistrationForm from "module/RegistrationForm/RegistrationForm"

import Link from "next/link"
import styles from "./registration.module.sass"

export default function Registration() {
    return (
        <div className={styles.main}>
            <div className={styles.form}>
                <div className={styles.registration}>
                    <div className={styles.registrationTop}>
                        <div className={styles.registrationTitle}>
                            Зареєструватися
                        </div>
                        <div className={styles.login}>
                            або <u><Link href="/login" style={{color:"white"}}>увійти</Link></u>
                        </div>
                    </div>
                    <RegistrationForm/>
                </div>
            </div>
        </div>
    )
}