import styles from "./settings.module.sass";
import Box from "components/UI/Box/Box";
import { Input, Button } from "components/UI";
import { useSelector } from "react-redux";
import { IUser } from "types/User";
import { useState } from "react";

export default function Settings() {
    const user = useSelector(
        (state: {user: IUser}) => state.user
    );
    const [userAPI, setUser] = useState<IUser | null>(null);
    if(!user || user.id === -1) return <div>Увійдіть в аккаунт.</div>;
    
    fetch("http://localhost:3000/api/users/"+user.id, {
        method:"GET"
    })
        .then(res => res.json())
        .then(res => {
            setUser(res.data);
        });
    return (
        <div className="settings">
            <h1>Налаштування</h1>
            <br/>
            <div className={styles.boxs}>
                <Box title="Налаштування користувача">
                    <div className={styles.input}>
                        <Input value={user.name} name="Ім'я" placeholder="Ім'я"/>
                        <Input value={user.email} name="Електрона пошта" placeholder="E-mail"/>
                        <Input name="Пароль 1" placeholder="password 1" type="password"/>
                        <Input name="Пароль 2" placeholder="password 2" type="password"/>
                    </div>
                    <div className={styles.admit}>
                        <Button Style="purple" type="submit">Прийняти зміни</Button>
                    </div>
                </Box>
                {
                    userAPI ?
                        <Box title="Інформація користувача">
                            <Input
                                name="Створено"
                                disabled
                                value={userAPI.createdAt.toString()}/>
                            <Input
                                name="Репутація"
                                disabled
                                value={userAPI.rank.toString()}/>
                            <Input
                                name="Підтверджено"
                                disabled
                                value={
                                    userAPI.isVerified ?
                                        "Так" : "Ні"
                                }/>
                        </Box>
                        :null
                }
                <Box title="Налаштування клієнта">
                    <select name="Інтерфейс" id="1" style={{color:"black"}}>
                        <option value="black">Чорний</option>
                        <option value="white">Білий</option>
                        <option value="contrast">Контрастний</option>
                    </select>
                    <div className={styles.admit}>
                        <Button Style="purple">Змінити</Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}