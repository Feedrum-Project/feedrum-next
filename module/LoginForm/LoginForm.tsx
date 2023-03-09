import Link from "next/link";
import {Input, Button} from "components/UI/index";
import styles from "./styles/login.module.sass";
import login from "./fetch/login";
import { FormEvent, useState } from "react";

interface bodyObj {
    email:string;
    password:string;
}

export default function LoginForm() {
    const [message, setMessage] = useState<any>(false);

    function prepare(event: FormEvent & {target: {"Пошта": {value: string}, "Пароль": {value: string} }}) {
        event.preventDefault();
        const body:bodyObj = {
            email: event.target["Пошта"].value,
            password: event.target["Пароль"].value
        };
        login(body)
            .then(e => {
                console.log(e);
                setMessage(e);
            });

    }

    return (
        <>
            <form onSubmit={(e: any) => prepare(e)}>
                <div className={styles.loginTop}>
                    <div className={styles.loginTitle}>
                        Увійти
                    </div>
                    <div className={styles.register}>
                        або <u><Link href="/registration" style={{color:"white"}}>зареєструватися</Link></u>
                    </div>
                </div>
                {
                    message === false ? null
                        : message?.code === 400 ? <h1 style={{color: "#F36A6A"}}>{message.message}</h1> : <h1 style={{color:"#6AEA3D"}}>You logged in</h1>
                }
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
    );
}