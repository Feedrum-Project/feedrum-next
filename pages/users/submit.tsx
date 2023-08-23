import Image from "next/image";
import styles from "./submit.module.sass";
import { Button } from "components/UI";
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
            <h1 className={styles.headerText}>Підтвердіть свою пошту</h1>
            <p>
              Ми відправили вам листа на пошту{" "}
              <span className={styles.email}>elias@elias-dev.ml</span>. Якщо не
              зможете знайти, перевірте папку спаму
            </p>
          </div>
          <div className={styles.bottom}>
            <div>
              <Button Style="standart" onClick={() => history.back()}>
                Увійти
              </Button>
            </div>
            <div>
              <Button Style="purple">Відправити ще раз</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
