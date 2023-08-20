import styles from "./styles/notification.module.sass";
import Notification from "./components/Notification";
import { useSelector } from "react-redux";
import { IStore } from "store/store";

export default function Notifications() {
    const { notification } = useSelector((state: IStore) => state.notification);

    return (
        <div className={styles.list}>
            {notification !== null
                ? notification.map((n) => {
                    return (
                        <div key={n.id}>
                            <Notification key={n.id} notification={n} />
                        </div>
                    );
                })
                : null}
        </div>
    );
}
