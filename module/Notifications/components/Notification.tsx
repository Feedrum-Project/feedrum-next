import styles from "../styles/notification.module.sass";
import Image from "next/image";
import bad from "images/bad.svg";
import good from "images/good.svg";

interface INotification {
    type: "bad" | "good"
    title: string
    text: string
}

export default function Notification({type, title, text}: INotification) {

    return (
        <div className={[styles.notification, type === "bad" ? styles.bad : styles.good].join(" ")}>
            
            {
                type === "bad" ?
                    <>
                        <Image src={bad} alt="bad"/>
                        <div className="text">
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </div>
                    </> :
                    <>
                        <Image src={good} alt="good"/>
                        <div className="text">
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </div>
                    </>
            }
        </div>
    )
}