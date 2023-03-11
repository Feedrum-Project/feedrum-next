import Button from "components/UI/Button/Button";
import Search from "components/UI/Input/Search";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/nav.module.sass";
import avatar from "images/avatar.svg";
import { useSelector } from "react-redux";

export default function Navigation() {
    const user = useSelector((state: any) => state.user);
    console.log(user);

    let Logged;
    if( user.id !== -1 ) {
        Logged = (
            <>
                <div className={styles.centr}>
                    <Link className={styles.LinkInsteadButton} href="/createPost">Створити пост</Link>
                    <Link className="office" href={"/users/"+user.id} style={{padding:"1rem 1rem 1rem 0", margin:"0 0 0 1rem"}}>
                        <Image src={avatar} alt="Ваш аватар" height="28" width="28"/>
                    </Link>
                </div>
            </>
        );
    } else {
        Logged = (
            <>
                {user.id}
                <Link href="/registration">
                    <Button Style="purple">Зареєструватись</Button>
                </Link>
                <Link href="/login">
                    <div className={styles.navLogin}>
                        <Button className={styles.navLogin} Style="standart">Увійти</Button>
                    </div>
                </Link>
            </>
        );
    }
    return (
        <nav className={styles.nav}>
            <div className={styles.navSearch}>
                <Search Placeholder="Пошук" className="input"/>
            </div>
            {Logged}      
        </nav>
    );
}