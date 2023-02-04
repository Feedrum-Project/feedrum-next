import Button from "../Button/Button";
import Search from "../Input/Search";
import Image from "next/image";
import Link from "next/link";
import styles from "./nav.module.sass";
import avatar from "../../images/avatar.svg"

interface NavProps {
  id: number | undefined
}
export default function Navigation({id}:NavProps) {
    let Logged;
    if( id !== undefined) {
        Logged = (
            <>
                <Button Style="purple"><Link href="./createPost" style={{textDecoration:"none", color:"white"}}>Створити пост</Link></Button>
                <Button className="offic" Style="Unborder" style={{margin:"0 1rem"}}>
                    <Image src={avatar} alt="Ваш аватар" height="28" width="28"/>
                </Button>
            </>
        )
    } else {
        Logged = (
            <>
                <Link href="/reg">
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