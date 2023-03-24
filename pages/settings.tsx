import styles from "./settings.module.sass";
import UserController from "controllers/user.controller";
import Box from "components/UI/Box/Box";
import { Input } from "components/UI";
import { Button } from "components/UI";
import { useSelector } from "react-redux";
import { IUser } from "types/User";

export default function Settings() {
    const user = useSelector(
        (state: {user: IUser}) => state.user
    );
    if(!user || user.id === -1) return <div>Увійдіть в аккаунт.</div>;
    console.log(user);
    return (
        <div className="settings">
            <h1>Settings</h1>
            <br/>
            <div className={styles.boxs}>
                <Box title="Account settings">
                    <div className={styles.input}>
                        <Input value={user.name} name="username" placeholder="username"/>
                        <Input value={user.email} name="email" placeholder="E-mail"/>
                        <Input name="password 1" placeholder="password 1" type="password"/>
                        <Input name="password 2" placeholder="password 2" type="password"/>
                    </div>
                    <div className={styles.admit}>
                        <Button Style="purple" type="submit">Прийняти зміни</Button>
                    </div>
                </Box>
                <Box title="Account Information">

                </Box>
            </div>
        </div>
    );
}