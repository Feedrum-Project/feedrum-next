import LoginForm from "module/LoginForm/LoginForm"
import styles from "./login.module.sass"

export default function Login() {
    return (
        <div className={styles.main}>
            <div className={styles.form}>
                <div className={styles.login}>
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}