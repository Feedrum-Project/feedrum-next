import Button from "../Button/Button"
import Search from "../Input/Search"
import styles from './nav.module.sass'
import Link from "next/link"

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <Search Placeholder="Пошук" className="input"/>
      <Link href="/reg">
        <Button Style="purple">Зареєструватись</Button>
      </Link>
      <Link href="/login">
      <Button Style="standart">Увійти</Button>
      </Link>
    </nav>
  )
}