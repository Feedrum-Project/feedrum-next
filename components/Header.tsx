import styles from 'styles/header.module.sass'
import Navigation from './Navigation'
import logo from 'images/logo.svg'
import Image from 'next/image'

export default function Header()  {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image src={logo} alt="Логотип" />
                <span className={styles["logoText"]}>Feedrum</span>
            </div>
            <Navigation/>
        </header>
    )
}