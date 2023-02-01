import Button from "../Button/Button"
import Search from "../Input/Search"
import styles from './nav.module.sass'
import Link from "next/link"

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navSearch}>
        <Search Placeholder="Пошук" className="input"/>
      </div>
      <Link href="/reg">
        <Button Style="purple">Зареєструватись</Button>
      </Link>
      <Link href="/login">
      <div className={styles.navLogin}>
        <Button className={styles.navLogin} Style="standart">Увійти</Button>
      </div>
      </Link>
    </nav>
  )
}