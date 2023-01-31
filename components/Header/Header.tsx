import styles from './header.module.sass'
import Navigation from './Navigation'
import logo from 'images/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Header()  {
    return (
        <header className={styles.header}>
            <Link href="/" style={{textDecoration: 'none'}}>
                <div className={styles.logo}>
                    <Image src={logo} alt="Логотип" />
                    <span className={styles.logoText}>Feedrum</span>
                </div>
            </Link>
            <Navigation/>
        </header>
    )
}