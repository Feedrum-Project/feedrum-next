import Button from "components/UI/Button/Button"
import Input from "components/UI/Input/Input"
import Link from "next/link"
import styles from "./login.module.sass"

export default function Login() {
    return (
        <div className={styles.main}>
            <div className={styles.form}>
                <div className={styles.login}>
                    <div className={styles.loginTop}>
                        <div className={styles.loginTitle}>
                            Увійти
                        </div>
                        <div className={styles.register}>
                            або <u><Link href="/registration" style={{color:"white"}}>зареєструватися</Link></u>
                        </div>
                    </div>
                    <div className={styles.loginMiddle}>
                        <Input type="text" name="Пошта" placeholder="Пошта"/>
                        <Input type="password" name="Пароль" placeholder="Пароль"/>
                        <Link href="/forgetPassword" className={styles.forgetPassword}>Забув&nbsp;пароль?</Link>
                    </div>
                    <div className={styles.loginBottom}>
                        <Button Style="purple">Увійти</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}