import {Input, Button} from "components/UI/index";
import registrate from "./fetch/registrate";

import styles from "./styles/registration.module.sass";

interface bodyObj {
    name:string;
    email:string;
    password1:string;
    password2:string;
}

export default function RegistrationForm() {
    function prepare(e:any) {
        e.preventDefault();
        const body:bodyObj = {
            "name": e.target["Ім'я"].value,
            "email": e.target["Пошта"].value,
            "password1": e.target["Пароль"].value,
            "password2": e.target["Підтвердіть пароль"].value
        };
        registrate(body);
    }
    return (
        <form method="POST" action="" onSubmit={(e:any) => prepare(e)}>
            <div className={styles.registrationMiddle}>
                <Input type="email" name="Пошта" placeholder="Пошта"/>
                <Input type="text" name="Ім'я" placeholder="Ім'я"/>
                <Input type="password" name="Пароль" placeholder="Пароль"/>
                <Input type="password" name="Підтвердіть пароль" placeholder="Підтвердіть пароль"/>
            </div>
            <div className={styles.registrationBottom}>
                <Button Style="purple">Зареєструватися</Button>
            </div>
        </form>
    );
}