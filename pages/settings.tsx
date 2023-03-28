import styles from "./settings.module.sass";
import Box from "components/UI/Box/Box";
import Link from "next/link";
import { Input, Button } from "components/UI";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IUser } from "types/User";

export default function Settings() {
    const user = useSelector(
        (state: {user: IUser}) => state.user
    );
    const [chapter, setChapter] = useState<"profile" | "dev" | "del">("profile");
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
                        onClick={() => setChapter("del")}
                        style={
                            chapter === "del" ?
                                {background:"#1B1B1B"}
                                : undefined
                        }>Видалення аккаунту</div>
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

                                    <div className={styles.checkbox}>
                                        <label className={styles.checkbox}>
                                            <input type="checkbox"/>
                                            <span className={styles.checkmark}></span>
                                            <span className={styles.labelText}>Відображати пошту у публічному профілі</span>
                                        </label>
                                    </div>

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
                                <div className={styles.admit}>
                                    <Button Style="purple" type="submit">Зберегти</Button>
                                </div>
                            </Box>
                        </>
                        : chapter === "dev" ?
                            <>
                                <Box title="API">
                                    <Link href="/api">Посилання на API</Link>
                                    <div className={styles.checkbox}>
                                        <label className={styles.checkbox}>
                                            <input type="checkbox"/>
                                            <span className={styles.checkmark}></span>
                                            <span className={styles.labelText}>Увімкнути режим розробника</span>
                                        </label>
                                    </div>
                                </Box>
                            </>
                            :
                            <>
                                <Box title="Видалити аккаунт">
                                    <Button Style="red">
                                        Видалити аккаунт
                                    </Button>
                                </Box>
                            </>
                }
            </div>
        </div>
    );
}