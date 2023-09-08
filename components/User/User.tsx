import styles from "./styles/user.module.sass";
import { Button } from "components/UI";
import { IUserExtended } from "types/User";
import UserComponent from "components/UI/UserComponent/UserComponent";

export default function User({ user }: { user: IUserExtended }) {
  return (
    <div className={styles.user}>
      <UserComponent user={user as any} isBig/>
      <div className={styles.userRight}>
        <Button Style="purple">
          Підписатися({user.subscribers ? user.subscribers : 0})
        </Button>
      </div>
    </div>
  );
}
