import Button from "./Button"
import Search from "./Search"
import styles from 'styles/nav.module.sass'
import Link from "next/link"

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <Search Placeholder="Пошук" className="input"/>
      <Link href="/reg">
        <Button Style="purple">Зареєструватись</Button>
      </Link>
      <Button Style="standart">Увійти</Button>
    </nav>
  )
}