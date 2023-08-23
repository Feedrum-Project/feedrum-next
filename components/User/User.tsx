import styles from "./styles/user.module.sass";
import Image from "next/image";
import { Button } from "components/UI";
import avatar from "images/avatar.svg";
import { IUserExtended } from "types/User";

export default function User({ user }: { user: IUserExtended }) {
  return (
    <div className={styles.user}>
      <div className={styles.userLeft}>
        <div className="avatar">
          <Image src={avatar} alt="аватар" width={60} height={60} />
        </div>
        <div className={styles.details}>
          <p className={styles.nickname}>
            <span>{user.name}</span>
            <span
              className="rank"
              style={
                user.rank > 0 ? { color: "#6AEA3D" } : { color: "#F36A6A" }
              }
            >
              ({user.rank > 0 ? "+" : null}
              {user.rank})
            </span>
          </p>
          <div className={styles.description}>
            {user.description.length + 3 >= 78
              ? user.description.slice(0, 78) + "..."
              : user.description}
          </div>
        </div>
      </div>
      <div className={styles.userRight}>
        <Button Style="purple">Підписатися({user.subscribers})</Button>
      </div>
    </div>
  );
}
