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
        "Ім'я": { value: string };
        "Пошта": { value: string };
        "Пароль": { value: string };
        "Підтвердіть пароль": { value: string };
    }
}

export default function RegistrationForm() {

    const [ message, setMessage ] = useState<any | {body: {data: {id: number, email: string, name: string}}, type: string}>(false);

    async function prepare(e: FormEvent & IFormExtneder) {
        e.preventDefault();
        const body:bodyObj = {
            "name": e.target["Ім'я"].value,
            "email": e.target["Пошта"].value,
            "password1": e.target["Пароль"].value,
            "password2": e.target["Підтвердіть пароль"].value
        };
        const user = await registrate(body);
        if(user.code === 200) {
            setMessage({body: user, type:"succes"});
            console.log(message);
        } else {
            setMessage({body: user.message, type:"err"});
            console.log(message);
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
                <Input type="email" name="Пошта" placeholder="Пошта"/>
                <Input type="text" name="Ім'я" placeholder="Ім'я"/>
                <Input type="password" name="Пароль" placeholder="Пароль"/>
                <Input type="password" name="Підтвердіть пароль" placeholder="Підтвердіть пароль"/>
            </div>
            <div className={styles.registrationBottom}>
                <Button Style="purple" type="submit">Зареєструватися</Button>
            </div>
        </form>
    );
}