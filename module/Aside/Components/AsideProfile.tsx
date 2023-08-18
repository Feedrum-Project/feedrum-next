import styles from "../styles/aside.module.sass";
import Button from "components/UI/Button/Button";
import Link from "next/link";
import Image from "next/image";
import avatar from "images/avatar.svg";
import { useSelector } from "react-redux";
import { IUser } from "types/User";

interface AsideProfileProps {
    userName: string;
    userId: number;
}

export default function AsideProfile({ userName, userId }: AsideProfileProps) {
    const user = useSelector((state: { user: IUser }) => state.user);
    return (
        <div className={styles.AsideProfile}>
            <div className={styles.left}>
                <Link
                    className={styles.left}
                    href={`/users/${userId}`}
                    style={{ textDecoration: "none", color: "white" }}
                >
                    <Image width="25" height="25" src={avatar} alt="Аватар" />
                    <span className={styles.left__text}>{userName}</span>
                </Link>
            </div>
            <div className="right">
                <Button Style="purple" disabled={user.id === userId}>
                    Підписатися
                </Button>
            </div>
        </div>
    );
}
