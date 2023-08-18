import Button from "components/UI/Button/Button";
import Search from "components/UI/Input/Search";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/nav.module.sass";
import avatar from "images/avatar.svg";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IUser } from "types/User";
import UserPanel from "./UserPanel";
import { IStore } from "store/store";

interface Panel {
    user: IUser | false;
    coors: {
        x: number;
        y: number;
    };
}

export default function Navigation() {
    const { user } = useSelector((state: IStore) => state).user;
    const [panel, setPanel] = useState<Panel | null>(null);

    let Logged;
    if (user !== null && user.id !== 0) {
        Logged = (
            <>
                <div className={styles.centrMobile}>
                    <button
                        className={styles.office}
                        onClick={(e) => {
                            panel
                                ? setPanel(null)
                                : setPanel({
                                      user,
                                      coors: {
                                          x: e.clientX - 135,
                                          y: e.clientY,
                                      },
                                  });
                        }}
                    >
                        <Image
                            src={avatar}
                            alt="Ваш аватар"
                            height="28"
                            width="28"
                        />
                    </button>
                </div>
                <div className={styles.centr}>
                    <Link
                        className={styles.LinkInsteadButton}
                        href="/createPost"
                    >
                        Створити пост
                    </Link>

                    <button
                        className={styles.office}
                        onClick={(e) => {
                            panel
                                ? setPanel(null)
                                : setPanel({
                                      user,
                                      coors: {
                                          x: e.clientX - 124,
                                          y: e.clientY + 16,
                                      },
                                  });
                        }}
                    >
                        <Image
                            src={avatar}
                            alt="Ваш аватар"
                            height="28"
                            width="28"
                        />
                    </button>
                </div>
                {panel ? (
                    <UserPanel user={panel.user} coors={panel.coors} />
                ) : null}
            </>
        );
    } else {
        Logged = (
            <>
                <div className={styles.centrMobile}>
                    <button
                        className={styles.office}
                        onClick={(e) => {
                            panel
                                ? setPanel(null)
                                : setPanel({
                                      user: false,
                                      coors: {
                                          x: e.clientX,
                                          y: e.clientY,
                                      },
                                  });
                        }}
                    >
                        <Image
                            src={avatar}
                            alt="Ваш аватар"
                            height="28"
                            width="28"
                        />
                    </button>
                </div>
                <div className={styles.centr}>
                    <Button Style="purple" to="/registration">
                        Зареєструватись
                    </Button>
                    <Button
                        className={styles.navLogin}
                        Style="standart"
                        to="/login"
                    >
                        Увійти
                    </Button>
                </div>
                {panel ? (
                    <UserPanel user={panel.user} coors={panel.coors} />
                ) : null}
            </>
        );
    }
    return (
        <nav className={styles.nav}>
            <div className={styles.navSearch}>
                <Search Placeholder="Пошук" />
            </div>
            {Logged}
        </nav>
    );
}
