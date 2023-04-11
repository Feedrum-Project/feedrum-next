import styles from "../styles/forget.module.sass";
import { Input, Button } from "components/UI";
export default function Forget() {
    return (
        <div className={styles.centr}>
            <div className={styles.pushup}>
                <div className={styles.top}>
                    <h1>Забув пароль?</h1>
                </div>
                <Input Name="Пошта" name="Пошта" placeholder="Ласка, ваша пошта."/>
                <div className={styles.bottom}>
                    <Button Style="standart">Назад</Button>
                    <Button Style="purple">Надіслати верифікацію</Button>
                </div>
            </div>
        </div>
    );
}