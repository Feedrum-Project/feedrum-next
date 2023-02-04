import styles from "./header.module.sass"
import Navigation from "./Navigation"
import logo from "images/logo.svg"
import Image from "next/image"
import Link from "next/link"

export default function Header()  {
    const tamplateUser = {  // its just instead props "userClient"
        id: 2,
        email: "lsk@ukr.net",
        name: "Elias",
        rank: 12,
        createdAt: "2023-01-21T15:53:35.882Z",
        isVerified: true
    }
    return (
        <header className={styles.header}>
            <Link href="/" style={{textDecoration: "none"}}>
                <div className={styles.logo}>
                    <Image src={logo} alt="Логотип" />
                    <span className={styles.logoText}>Feedrum</span>
                </div>
            </Link>
            <Navigation id={tamplateUser.id}/>
        </header>
    )
}