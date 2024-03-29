import styles from "./styles/header.module.sass";
import Navigation from "./Components/Navigation";
import logo from "images/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={logo} alt="Логотип" />
        <Link href="/" className={styles.logoText}>
          Feedrum
        </Link>
      </div>
      <Navigation />
    </header>
  );
}
