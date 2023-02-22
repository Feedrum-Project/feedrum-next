import Button from "components/UI/Button/Button"
import Input from "components/UI/Input/Input"
import Link from "next/link"
import styles from "./registration.module.sass"

export default function Login() {
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
                    <div className={styles.registrationMiddle}>
                        <Input type="text" name="Пошта" placeholder="Пошта"/>
                        <Input type="text" name="Ім'я" placeholder="Ім'я"/>
                        <Input type="password" name="Пароль" placeholder="Пароль"/>
                        <Input type="password" name="Підтвердіть пароль" placeholder="Підтвердіть пароль"/>
                        <Link href="/forgetPassword" className={styles.forgetPassword}>Забув&nbsp;пароль?</Link>
                    </div>
                    <div className={styles.registrationBottom}>
                        <Button Style="purple">Зареєструватися</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}