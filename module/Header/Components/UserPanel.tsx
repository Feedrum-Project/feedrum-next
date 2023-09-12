import styles from "../styles/nav.module.sass";
import { IUser } from "types/User";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Button } from "components/UI";
import { Dispatch, SetStateAction } from "react";
import { IPanel } from "./Navigation";

interface UserPanel {
  user: IUser | false;
  panel: [IPanel, Dispatch<SetStateAction<IPanel | null>>]
}

export default function UserPanel({ panel, user }: UserPanel) {
  const dispatch = useDispatch();

  return (
    <div className={styles.field} id="field" onClick={(e) => {
      const {target} = e as unknown as {target: HTMLElement};
      if(target.id === "field") panel[1](null);
      }}>
      <div
        className={styles.panel}
        style={
          window.innerWidth > 500
            ? { left: panel[0].coors.x, top: panel[0].coors.y }
            : {
                left: "0px",
                top: "0px"
              }
        }
      >
        <div className={styles.top}>
          {user !== false ? (
            <Link href={"/users/" + user.id}>@{user.name}</Link>
          ) : (
            <>
              <Button Style="purple">Зареєструватися</Button>
              <Button Style="secondary" to="/login">
                Увійти
              </Button>
            </>
          )}
        </div>
        <div className={styles.middle}>
          <Link href="/api-doc" className="API">
            API
          </Link>
          {user !== false ? (
            <>
              <Link href="/settings" className="settings">
                Налаштування
              </Link>
              <Link href="#">Підписки</Link>
            </>
          ) : null}
        </div>
        {user !== false ? (
          <div className={styles.bottom}>
            <Link
              href="#"
              onClick={() => {
                document.cookie =
                  "token=deleted; path=/api/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                dispatch({ type: "setUser", payload: null });
              }}
              className="exit"
            >
              Вийти
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
