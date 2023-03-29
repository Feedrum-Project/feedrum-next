import CreateForm from "module/CreateForm/CreateForm";
import styles from "../styles/create.module.sass";
import { Input } from "components/UI";
import { useSelector } from "react-redux";
import { IUser } from "types/User";

export default function CreatePost() {
    const user = useSelector((state: {user: IUser}) => state.user);
    console.log(user);
    return (
        <>
            <div className={styles.main}>
                <div className={styles.editor}>
                    <Input name="Назва"/>
                    <CreateForm/>
                </div>
                <aside className={styles.aside}>
                    <div className={styles.boxMode}>
                        <div className="edit">Редагування</div>
                        <div className="look">Перегляд</div>
                    </div>
                    <div className={styles.box}>
                        <h1>Поради</h1>
                        <p>
                            Тут будуть з’являтися динамічні
                            поради щодо редактору, бо не всі
                            знають маркдаун
                        </p>
                    </div>
                </aside>
            </div>
        </>
    );
}