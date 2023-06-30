import styles from "../styles/notification.module.sass";
import Image from "next/image";
import bad from "images/bad.svg";
import good from "images/good.svg";
import remove from "images/Remove.svg";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

interface INotification {
    notification: {
        id: number
        type: "bad" | "good"
        title: string
        text: string
        createdAt: number
    }
}

export default function Notification({notification}: INotification) {
    const bar = useRef<HTMLDivElement | undefined>() as any;
    const progress = useRef<HTMLDivElement | undefined>() as any;

    const dispatch = useDispatch();

    let num = Date.now() - notification.createdAt;
    const interval: any = setInterval(() => {
        if(num >= 10000) {
            dispatch({"type":"removeNotification", "payload": {id: notification.id}});
            clearInterval(interval);
            return;
        }
        if(progress.current === undefined || progress.current === null) return clearInterval(interval);
        if(bar.current === undefined || bar.current === null) return clearInterval(interval);
        num+=10;
        const res = (10000-num)/100 + "%";
        progress.current.style.width = res;

    }, 10);

    return (
        <div className={[styles.notification, notification.type === "bad" ? styles.bad : styles.good].join(" ")}>
            <div className={styles.top}>
                <button onClick={() => {
                    dispatch({"type":"removeNotification", "payload": {id: notification.id}});
                }}>
                    <Image src={remove} alt="remove notification"/>
                </button>
            </div>

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