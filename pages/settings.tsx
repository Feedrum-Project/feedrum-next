import styles from "./settings.module.sass";
import Box from "components/UI/Box/Box";
import Checkbox from "components/UI/Checkbox/Checkbox";
import Link from "next/link";
import { Input, Button } from "components/UI";
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
            
            <div className={styles.chapters}>
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
            </div>
            <div className={styles.boxs}>
                {
                    chapter === "profile" ?
                        <>
                            <Box title="Профіль">
                                <div className={styles.input}>
                                    <Input value={user.name} name="Ім'я" placeholder="Ім'я"/>
                                    <Input value={user.email} name="Пошта" placeholder="E-mail"/>
                                    <Checkbox>
                                        Відображати пошту у публічному профілі
                                    </Checkbox>

                                </div>
                                <div className={styles.admit}>
                                    <Button Style="purple" type="submit">Зберегти</Button>
                                </div>
                            </Box>
                            <Box title="Про себе">
                                <Input
                                    placeholder="Інформація про себе"
                                    name="Трохи про себе"/>
                                <Input
                                    placeholder="https://feedrum.com"
                                    name="Вебсайт"/>
                                <Input
                                    placeholder="Feedrum"
                                    name="Організаці"/>
                                <Input
                                    placeholder="Feedrum"
                                    name="Країна"
                                    value="Україна"/>
                                <div className={styles.admit}>
                                    <Button Style="purple" type="submit">Зберегти</Button>
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
                                    <Input name="Старий пароль" />
                                    <Input name="Новий пароль" />
                                    <Input name="Підтвердити новий пароль" />
                                </Box>
                                <Box title="Видалення аккаунту">
                                    <Button Style="unbackground">
                                        Видалити аккаунт
                                    </Button>
                                    <Button Style="unbackground" className={styles.mg10}>
                                        Вимкнути аккаунт
                                    </Button>
                                </Box>
                            </>
                }
            </div>
        </div>
    );
}