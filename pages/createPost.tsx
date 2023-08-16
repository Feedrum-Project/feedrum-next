import styles from "../styles/create.module.sass";

import Script from "next/script";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IUser } from "types/User";
import { Button } from "components/UI";
import Images from "module/CreateForm/Components/Images";
import Editor from "module/CreateForm/Components/Editor";
import { HTMLtoMD, MDtoHTML } from "helpers/parsers.helper";
import View from "module/CreateForm/Components/View";

export default function CreatePost() {
    const [chapter, setChapter] = useState<"editor" | "view">("view");
    const [article, setArticle] = useState<{ title: string; content: string }>({
        title: "",
        content: "",
    });
    const [files, setFiles] = useState<File[]>();

    const { user } = useSelector((state: { user: IUser }) => state);

    useEffect(() => {
        const content = localStorage.getItem("article");
        if (content === null) return;

        setArticle((pr) => {
            return { ...pr, content };
        });
    }, []);

    function saveToLocale() {
        const txt = document.getElementById("txt");
        if (!txt) return;

        const content = HTMLtoMD(txt.innerHTML);

        localStorage.setItem("article", content);

        setArticle((pr) => {
            return { ...pr, content };
        });
    }

    function sub(e: FormEvent & { target: { title: HTMLInputElement } }) {
        e.preventDefault();
        if (!e || !e.target) return;
        const target = e.target;

        const { value: title } = target.title;
        const text: any = document.getElementById("txt");
        const content = HTMLtoMD(MDtoHTML(text.innerHTML));

        if (title.length < 8 || content.length < 100)
            throw new Error("not enough symbols");

        const body = { body: { title, body: content } };

        fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "applaction/json",
            },
        })
            .then((res) => res.json())
            .then(console.log)
            .catch(console.log);

        // if(files !== undefined && files.length > 1) {
        //     const form = new FormData();
        //     files?.forEach((e, i) => {
        //         form.append("image-"+i, e);
        //     });

        //     fetch("/api/images/", {
        //         method: "POST",
        //         body: form
        //     })
        //         .then(res => res.json());
        // }
    }

    if (user === null || user.id === 0) {
        return <Script id="0">location.href = &#34;/login&#34;</Script>;
    }

    return (
        <>
            <div className={styles.editor}>
                <article>
                    <form
                        method="post"
                        onSubmit={sub as any}
                    >
                        {chapter === "editor" ? (
                            <>
                                <Images
                                    files={files}
                                    setFiles={setFiles}
                                    showAdd
                                />
                                <Editor articleSet={[article, setArticle]} />
                            </>
                        ) : (
                            <>
                                <Images
                                    files={files}
                                    setFiles={setFiles}
                                />
                                <View articleSet={[article, setArticle]} />
                            </>
                        )}

                        <div className={styles.editorButtons}>
                            <Button
                                Style="purple"
                                type="submit"
                            >
                                Опублікувати
                            </Button>
                            <Button
                                Style="standart"
                                onClick={saveToLocale}
                            >
                                Зберегти як чорнетка
                            </Button>
                            <Button Style="danger">Видалити</Button>
                        </div>
                    </form>
                </article>
                <aside className={styles.aside}>
                    <div className={styles.chapters}>
                        <button
                            className={[
                                styles.button,
                                chapter === "editor"
                                    ? styles.chaptersSelected
                                    : styles.chaptersUnselected,
                            ].join(" ")}
                            onClick={() => setChapter("editor")}
                        >
                            Редагування
                        </button>
                        <button
                            className={[
                                styles.button,
                                chapter === "view"
                                    ? styles.chaptersSelected
                                    : styles.chaptersUnselected,
                            ].join(" ")}
                            onClick={() => setChapter("view")}
                        >
                            Перегляд
                        </button>
                    </div>
                    <div className="tips">
                        <h1>Поради</h1>
                        <p>
                            Тут будуть з’являтися динамічні поради щодо
                            редактору, бо не всі знають маркдаун
                        </p>
                    </div>
                </aside>
            </div>
        </>
    );
}
