import Button from "./Button"
import Search from "./Search"
import Link from "next/link"
import styles from '../styles/nav.module.css'
export default function Navigation() {
  return (
    <nav className={styles["nav"]}>
      <Search Placeholder="Пошук" className="input"/>
      <Button Style="purple">
        Зареєструватись
      </Button>
      <Button Style="standart">Увійти</Button>
    </nav>
  )
}