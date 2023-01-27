import styles from '../styles/header.module.sass'
import Navigation from './Navigation'
const logo = require('../images/logo.svg')

export default function Header()  {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo.default.src} alt="logotype" />
                <span className={styles.logo__text}>Feedrum</span>
            </div>
            <Navigation/>
        </header>
    )
}