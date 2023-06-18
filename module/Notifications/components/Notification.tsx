import styles from "../styles/notification.module.sass";
import Image from "next/image";
import bad from "images/bad.svg";
import good from "images/good.svg";
import { useRef } from "react";
import { useDispatch } from "react-redux";

interface INotification {
    notification: {
        id: number
        type: "bad" | "good"
        title: string
        text: string
    }
}

export default function Notification({notification}: INotification) {
    const bar = useRef<HTMLDivElement | undefined>() as any;
    const progress = useRef<HTMLDivElement | undefined>() as any;

    const dispatch = useDispatch();

    let num = 0;
    setInterval(() => {
        if(num >= 10000) {
            dispatch({"type":"removeNotification", "payload": {id: notification.id}});
            num = 0;
            return;
        }
        if(progress.current === undefined || progress.current === null) return;
        if(bar.current === undefined || bar.current === null) return;
        num+=10;
        const res = (10000-num)/100 + "%";
        progress.current.style.width = res;

    }, 10);

    return (
        <div className={[styles.notification, notification.type === "bad" ? styles.bad : styles.good].join(" ")}>
            <div className="top"></div>

            <div className={styles.center}>
                {
                    notification.type === "bad" ?
                        <Image src={bad} alt="bad"/> :
                        <Image src={good} alt="good"/>
                }
                <div className={styles.centerText}>
                    <h3>{notification.title}</h3>
                    <p>{notification.text}</p>
                </div>
            </div>
            
            <div
                ref={bar}
                className={styles.bar}
            >
                <div
                    ref={progress}
                    className={
                        [
                            styles.progress,
                            notification.type === "bad" ?
                                styles.badBackground : styles.goodBackground
                        ].join(" ")
                    }
                >
                </div>
            </div>
        </div>
    );
}