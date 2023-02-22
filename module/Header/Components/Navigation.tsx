import Button from "components/UI/Button/Button";
import Search from "components/UI/Input/Search";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/nav.module.sass";
import avatar from "images/avatar.svg";

interface NavProps {
  id: number | undefined
}
export default function Navigation({id}:NavProps) {
    let Logged;
    if( id !== undefined) {
        Logged = (
            <>
                <Link className={styles.LinkInsteadButton} href="/createPost">Створити пост</Link>
                <Link className="office" href={"/users/"+id} style={{margin:"1rem"}}>
                    <Image src={avatar} alt="Ваш аватар" height="28" width="28"/>
                </Link>
            </>
        )
    } else {
        Logged = (
            <>
                <Link href="/registration">
                    <Button Style="purple">Зареєструватись</Button>
                </Link>
                <Link href="/login">
                    <div className={styles.navLogin}>
                        <Button className={styles.navLogin} Style="standart">Увійти</Button>
                    </div>
                </Link>
            </>
        )
    }
    return (
        <nav className={styles.nav}>
            <div className={styles.navSearch}>
                <Search Placeholder="Пошук" className="input"/>
            </div>
            {Logged}
          
        </nav>
    )
}