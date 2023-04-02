import styles from "./settings.module.sass";
import Box from "components/UI/Box/Box";
import Checkbox from "components/UI/Checkbox/Checkbox";
import { Input, Button, Select } from "components/UI";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IUser } from "types/User";

export default function Settings() {
    const user = useSelector(
        (state: {user: IUser}) => state.user
    );
    const [chapter, setChapter] = useState<"profile" | "dev" | "safe">("profile");
    if(!user || user.id === -1) return <div>Увійдіть в аккаунт.</div>;
    return (
        <div className={styles.settings}>
            
            <aside className={styles.chapters}>
                <h1>Розділи</h1>
                <div className={styles.chaptersBottom}>
                    <div
                        onClick={() => setChapter("profile")}
                        style={
                            chapter === "profile" ?
                                {background:"#1B1B1B"}
                                : undefined
                        }>Профіль</div>
                    <div
                        onClick={() => setChapter("dev")}
                        style={
                            chapter === "dev" ?
                                {background:"#1B1B1B"}
                                : undefined
                        }>Інформація для розробників</div>
                    <div
                        onClick={() => setChapter("safe")}
                        style={
                            chapter === "safe" ?
                                {background:"#1B1B1B"}
                                : undefined
                        }>Безпека</div>
                </div>
            </aside>
            <div className={styles.boxs}>
                {
                    chapter === "profile" ?
                        <>
                            <Box title="Профіль">
                                <div className={styles.input}>
                                    <Input
                                        value={user.name}
                                        name="Ім'я"
                                        placeholder="Ім'я"
                                        info="Ваше ім'я."/>
                                    <Input
                                        value={user.email}
                                        name="Пошта"
                                        placeholder="E-mail"
                                        info="Поштова скринька."/>
                                </div>
                                <Checkbox>
                                    Відображати пошту у публічному профілі
                                </Checkbox>
                                <div className={styles.admit}>
                                    <Button Style="purple" type="submit">Змінити</Button>
                                </div>
                            </Box>
                            <Box title="Про себе">
                                <div className={styles.input}>
                                    <Input
                                        placeholder="Інформація про себе"
                                        name="Трохи про себе"
                                        info="Ваш опс, можливо автобіобрафія."/>
                                    <Input
                                        placeholder="https://feedrum.com"
                                        name="Вебсайт"
                                        info="Ваша сторінка."/>
                                    <Input
                                        placeholder="Feedrum"
                                        name="Організаці"
                                        info="Де ви працюєте?"/>
                                    <Select
                                        name="Країна"
                                        values={["Україна","Польща","Словаччина"]}
                                        info="Оберіть країну в якій ви наразі."/>
                                    <div className={styles.admit}>
                                        <Button Style="purple" type="submit">Змінити</Button>
                                    </div>
                                </div>
                            </Box>
                        </>
                        : chapter === "dev" ?
                            <>
                                <Box title="API">
                                    <Link href="/api">Посилання на API</Link>
                                    <Checkbox>
                                        Увімкнути режим розробника
                                    </Checkbox>
                                </Box>
                            </>
                            :
                            <>
                                <Box title="Зміна паролю">
                                    <div className={styles.input}>
                                        <Input
                                            type="password"
                                            name="Старий пароль" />
                                        <Input
                                            type="password"
                                            name="Новий пароль" />
                                        <Input
                                            type="password"
                                            name="Підтвердити новий пароль" />
                                    </div>
                                </Box>
                                <Box title="Видалення аккаунту">
                                    <Button Style="red">
                                        Видалити аккаунт
                                    </Button>
                                    <Button Style="red" className={styles.mg10}>
                                        Вимкнути аккаунт
                                    </Button>
                                </Box>
                            </>
                }
            </div>
        </div>
    );
}