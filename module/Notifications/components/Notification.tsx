import styles from "../styles/notification.module.sass";
import Image from "next/image";
import bad from "images/bad.svg";
import good from "images/good.svg";

interface INotification {
    notification: {
        id: number
        type: "bad" | "good"
        title: string
        text: string
    }
}

export default function Notification({notification}: INotification) {

    return (
        <div className={[styles.notification, notification.type === "bad" ? styles.bad : styles.good].join(" ")}>
            <>
                {
                    notification.type === "bad" ?
                        <Image src={bad} alt="bad"/> :
                        <Image src={good} alt="good"/>
                }
                <div className="text">
                    <h3>{notification.title}</h3>
                    <p>{notification.text}</p>
                </div>
            </>
        </div>
    );
}