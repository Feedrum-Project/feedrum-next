import styles from "./styles/notification.module.sass";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "store/store";
import { useEffect } from "react";

export default function Notifications() {
    const {notification} = useSelector((state: IStore) => state.notification);
    const dispatch = useDispatch();

    useEffect(() => {
        notification !== null ?
            setTimeout(() => dispatch({type: "setNotification", payload: [...notification.slice(1)]}), 10000)
            : null;
    }, [notification, dispatch]);
    
    return (
        <div className={styles.list}>
            {
                notification !== null ?
                    notification.map((n) => {
                        return (
                            <div key={n.id}>
                                <Notification key={n.id} notification={n}/>
                            </div>
                        );
                    })
                    : null
            }
        </div>
    );
}