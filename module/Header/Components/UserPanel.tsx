import styles from "../styles/nav.module.sass";
import { IUser } from "types/User";
import Link from "next/link";
import { useDispatch } from "react-redux";

interface UserPanel {
  user: IUser;
  coors: {
    x: number;
    y: number;
  };
}

export default function UserPanel({user, coors}: UserPanel) {
    const dispatch = useDispatch();
    
    return (
        <div
            className={styles.panel}
            style={window.innerWidth > 640 ? {left: coors.x, top: coors.y} : undefined}>
            <div className={styles.top}>
                <Link href={"/users/"+user.id}>
                      @{user.name}
                </Link>
            </div>
            <div className={styles.middle}>
                <Link href="/api" className="API">API</Link>
                <Link href="/settings" className="settings">Налаштування</Link>
            </div>
            <div className={styles.bottom}>
                <Link
                    href="#"
                    onClick={() => {
                        document.cookie = "token=deleted; path=/api/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                        dispatch({type: "set", payload: null});
                    }}
                    className="exit"
                >Вийти</Link>
            </div>
        </div>
    );
};