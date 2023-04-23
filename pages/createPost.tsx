import CreateForm from "module/CreateForm/CreateForm";
import styles from "../styles/create.module.sass";
import { Input } from "components/UI";
import Script from "next/script";
import createPost from "module/CreateForm/fetch/createPost";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "types/User";
import TextEditor from "module/CreateForm/Components/TextEditor";

export default function CreatePost() {
    const [chapter, setChapter] = useState<"editor" | "view">("view");
    const [texts, setText] = useState<string>("");
    const [articleName, setName] = useState<string>("");

    const user = useSelector((state:{user: IUser}) => state.user);

    useEffect(() => {
        const item = localStorage.getItem("article");
        setText(item === null ? "" : item);
    }, []);

    function sub(e: FormEvent & {target: {data: HTMLTextAreaElement, name: HTMLInputElement}}) {
        e.preventDefault();
        if(!e || !e.target) return;
        const target = e.target;

        const { value: title }: HTMLInputElement = target.name;
        const { value: content }: HTMLTextAreaElement = target.data;
        const body = {title, body: content};
        if(content.length < 100) return;
        
        createPost({body, user});
    }

    if(user === null || user.id === 0) {
        return (
            <Script id="0">
                location.href = &#34;/login&#34;
            </Script>
        );
    }

    return (
        <>
            <form method="post" onSubmit={(e: any) => sub(e)}>
                <div className={styles.main}>
                    {
                        chapter === "editor" ?
                            <div className={styles.editor}>
                                <Input
                                    Name="Назва"
                                    name="name"
                                    placeholder="Назва вашої статті"
                                    info="Назва вашої статті"
                                    value={articleName}
                                    onChange={(e) => {setName(e.target.value);}}
                                />
                                <TextEditor/>
                            </div>
                            :
                            <>
                                <div className={styles.example}>
                                    <h1
                                        contentEditable="true"
                                        className={styles.exampleTitle}>
                                        {articleName === "" ? "Безвісна стаття" : articleName}
                                    </h1>
                                    <input type="text" name="name" value={articleName} hidden readOnly/>
                                    <CreateForm texts={[texts, setText]}/>
                                </div>
                            </>
                    }
                    <aside className={styles.aside}>
                        <div className={styles.boxMode}>
                            <div
                                className={"edit"}
                                onClick={() => setChapter("editor")}
                                style={chapter === "editor" ? {background:"#1b1b1b"} : undefined}
                            >
                                Редагування
                            </div>
                            <div
                                className={"look"}
                                onClick={() => setChapter("view")}
                                style={chapter === "view" ? {background:"#1b1b1b"} : undefined}
                            >
                                Перегляд
                            </div>
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
            </form>
        </>
    );
}