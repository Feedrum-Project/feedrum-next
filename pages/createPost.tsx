import CreateForm from "module/CreateForm/CreateForm";
import styles from "../styles/create.module.sass";
import { Input } from "components/UI";
import { FormEvent, useEffect, useState } from "react";
import parser from "helpers/parsers.helper";

export default function CreatePost() {
    const [chapter, setChapter] = useState<"editor" | "view">("editor");
    const [texts, setText] = useState<string>("");

    useEffect(() => {
        const item = localStorage.getItem("article");
        setText(item === null ? "" : item);
    }, []);

    function sub(e: FormEvent & {target: {data: any}}) {
        e.preventDefault();
        const { value }: HTMLTextAreaElement = e.target.data;
        console.log(e.target);
        if(value.length < 100) return;
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
                                />
                                <CreateForm texts={[texts, setText]}/>
                            </div>
                            :
                            <div
                                style={{color: "#fff"}}
                                dangerouslySetInnerHTML={{__html: parser.MDtoHTML(localStorage.getItem("article")!, false)}}>
                            </div>
                    }
                    <aside className={styles.aside}>
                        <div className={styles.boxMode}>
                            <div
                                className="edit"
                                onClick={() => setChapter("editor")}
                                style={chapter === "editor" ? {background:"#1b1b1b"} : undefined}
                            >
                                Редагування
                            </div>
                            <div
                                className="look"
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