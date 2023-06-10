import {Input, Button} from "components/UI/index";
import { FormEvent, useState } from "react";
import registrate from "./fetch/registrate";

import styles from "./styles/registration.module.sass";

interface bodyObj {
    name:string;
    email:string;
    password1:string;
    password2:string;
}

interface IFormExtneder {
    target: {
        name: { value: string };
        email: { value: string };
        password1: { value: string };
        password2: { value: string };
    }
}

export default function RegistrationForm() {
    const [ message, setMessage ] = useState<any | {body: {data: {id: number, email: string, name: string}}, type: string}>(false);

    async function prepare(e: FormEvent & IFormExtneder) {
        e.preventDefault();
        const body:bodyObj = {
            name: e.target.name.value,
            email: e.target.email.value,
            password1: e.target.password1.value,
            password2: e.target.password2.value
        };
        const user = await registrate(body);
        if(user.code === 200) {
            setMessage({body: user, type:"succes"});
            console.error(message);
        } else {
            setMessage({body: user.message, type:"err"});
            console.error(message);
        }
    }

    return (
        <form method="post" onSubmit={ (e: any) => prepare(e) }>
            {
                message === false ? null : !message.body.data ?
                    <>
                        <h1 style={{color: "#F36A6A"}}>
                            Щось пішло не за планом.
                        </h1>
                    </>
                    : 
                    <>
                        <h1 style={{color:"#6AEA3D"}}>
                            Користувача з нікнеймом &ldquo;{message.body.data.name}&rdquo; створено.
                        </h1>
                        <h2>Письмо до {message.body.data.email} відправлено</h2>
                    </>
            }
            <div className={styles.registrationMiddle}>
                <Input
                    type="email"
                    name="email"
                    Name="Пошта"
                    placeholder="Пошта"/>
                <Input
                    type="text"
                    name="name"
                    Name="Ім'я"
                    placeholder="Ім'я"/>
                <Input
                    type="password"
                    name="password1"
                    Name="Пароль"
                    placeholder="Пароль"/>
                <Input
                    type="password"
                    name="password2"
                    Name="Підтвердіть пароль"
                    placeholder="Підтвердіть пароль"/>
            </div>
            <div className={styles.registrationBottom}>
                <Button Style="purple" type="submit">Зареєструватися</Button>
            </div>
        </form>
    );
}