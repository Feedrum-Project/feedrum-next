import Image from "next/image";
import styles from "../styles/forgot.module.sass";
import { Input, Button } from "components/UI";
import logo from "images/logo.svg";
import Link from "next/link";

export default function Forgot() {
  return (
    <div className={styles.centr}>
      <div>
        <div className={styles.logo}>
          <Image src={logo} alt="Логотип" width={42} />
          <Link href="/">Feedrum</Link>
        </div>
        <div className={styles.pushup}>
          <div className={styles.top}>
            <h1>Забув пароль?</h1>
          </div>
          <Input Name="Пошта" name="Пошта" placeholder="Ласка, ваша пошта." />
          <div className={styles.bottom}>
            <div>
              <Button Style="standart" onClick={() => history.back()}>
                Назад
              </Button>
            </div>
            <div>
              <Button Style="purple">Надіслати верифікацію</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
