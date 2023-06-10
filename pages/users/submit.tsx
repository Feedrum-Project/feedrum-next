import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IUser } from "types/User";
import { Button } from "components/UI";
import Link from "next/link";
import styles from "./submit.module.sass";

export default function SubmitEmail() {
    const user = useSelector((state: {user: IUser}) => state.user);

    if(user === null || user.id === -1) return <>Something went wrong.</>;

    fetch("/api/users/"+user.id)
        .then(res => res.json())
        .then(res => user.isVerified = res.data.isVerified);

    return (
        <>
            {
                user.isVerified ? 
                    <div>
                        <h1>Все в порядку!</h1>
                        <p>Ви вже пройшли авторизацію.</p>
                        <Button Style="purple">Повернутися до облікового запису</Button>
                    </div> :
                    <div className={[styles.block, styles.red].join(" ")}>
                        <h1>Запит надіслано!</h1>
                        <p>
                            На електрону пошту відправлино запит.<br/>
                            Якщо ви не знайшли, або не прийло повідомлення,
                            натисніть на кнопку нижче.
                        </p>
                        <Button Style="purple">Відправити&nbsp;перевірку</Button>
                        <p>
                            Якщо не допомгло,
                            пишіть нам: <Link href="mailto:admin@feedrum.com" className={styles.link}>admin@feedrum.com</Link>
                        </p>
                    </div>
            }
        </>
    );
}