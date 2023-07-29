import Link from "next/link";
import {Input, Button} from "components/UI/index";
import styles from "./styles/login.module.sass";
import login from "./fetch/login";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

interface bodyObj {
    email:string;
    password:string;
}

export default function LoginForm() {
    const [message, setMessage] = useState<any>(false);
    const { user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const { push } = useRouter();

    function prepare(event: FormEvent & {target: {email: {value: string}, password: {value: string} }}) {
        event.preventDefault();
        const body:bodyObj = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        login(body)
            .then(e => {
                if(e.code === 200) {
                    dispatch({type:"setUser", payload: e.data});
                    push("/");
                }
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
                        або <u><Link href="/registration">зареєструватися</Link></u>
                    </div>
                </div>
                {
                    message === false ? null
                        : message?.code === 400 ? <h1 style={{color: "#F36A6A"}}>{message.message}</h1> : <h1 style={{color:"#6AEA3D"}}>Ви увійшли в обліковий запис.</h1>
                }
                <div className={styles.loginMiddle}>
                    <Input
                        disabled={user !== null && user.id !== 0}
                        type="text"
                        name="email"
                        Name="Пошта"
                        placeholder="Пошта"
                    />
                    <Input
                        disabled={user !== null && user.id !== 0}
                        type="password"
                        name="password"
                        Name="Пароль"
                        placeholder="Пароль"
                    />
                    <Link href="/forgotPassword" className={styles.forgetPassword}>Забув&nbsp;пароль?</Link>
                </div>
                <div className={styles.loginBottom}>
                    <Button Style="purple" type="submit">Увійти</Button>
                </div>
            </form>
        </>
    );
}