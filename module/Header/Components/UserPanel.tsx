import styles from "../styles/nav.module.sass";
import { IUser } from "types/User";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Button } from "components/UI";

interface UserPanel {
    user: IUser | false;
    coors: {
        x: number;
        y: number;
    };
}

export default function UserPanel({ user, coors }: UserPanel) {
    const dispatch = useDispatch();

    return (
        <div
            className={styles.panel}
            style={
                window.innerWidth > 500
                    ? { left: coors.x, top: coors.y }
                    : {
                        left: "0px",
                        top: "0px",
                    }
            }
        >
            <div className={styles.top}>
                {user !== false ? (
                    <Link href={"/users/" + user.id}>@{user.name}</Link>
                ) : (
                    <>
                        <Button Style="purple">Зареєструватися</Button>
                        <Button Style="secondary" to="/login">Увійти</Button>
                    </>
                )}
            </div>
            <div className={styles.middle}>
                <Link href="/api" className="API">
                    API
                </Link>
                { user !== false ? <Link href="/settings" className="settings">
                    Налаштування
                </Link> : null
                }
            </div>
            {
                user !== false ? <div className={styles.bottom}>
                    <Link
                        href="#"
                        onClick={() => {
                            document.cookie =
                                "token=deleted; path=/api/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                            dispatch({ type: "setUser", payload: null });
                        }}
                        className="exit"
                    >
                        Вийти
                    </Link>
                </div> : null
            }
        </div>
    );
}
