import Link from "next/link"
import {Input, Button} from "components/UI/index"
import styles from "./styles/login.module.sass"
import login from "./fetch/login"

interface bodyObj {
    email:string
    password:string
}

export default function LoginForm() {
    function prepare(event:any) {
        event.preventDefault()
        const body:bodyObj = {
            email: event.target["Пошта"].value,
            password: event.target["Пароль"].value
        }
        login(body)
            .then(e => console.log(e))

    }

    return (
        <>
            <form onSubmit={(e) => prepare(e)}>
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
            </form>
        </>
    )
}