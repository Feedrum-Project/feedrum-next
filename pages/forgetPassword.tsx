import Image from "next/image";
import styles from "../styles/forget.module.sass";
import { Input, Button } from "components/UI";
import logo from "images/logo.svg";

export default function Forget() {
    return (
        <div className={styles.centr}>
            <div>
                <div className={styles.logo}>
                    <Image src={logo} alt="Логотип" width={42}/>
                    <p>Feedrum</p>
                </div>
                <div className={styles.pushup}>
                    <div className={styles.top}>
                        <h1>Забув пароль?</h1>
                    </div>
                    <Input Name="Пошта" name="Пошта" placeholder="Ласка, ваша пошта."/>
                    <div className={styles.bottom}>
                        <Button Style="standart"
                            onClick={
                                () => history.back()
                            }>Назад</Button>
                        <Button Style="purple">Надіслати верифікацію</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}