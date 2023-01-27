import Button from "./Button"
import Search from "./Search"
import styles from '../styles/nav.module.sass'
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