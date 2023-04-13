import CreateForm from "module/CreateForm/CreateForm";
import styles from "../styles/create.module.sass";
import { Input } from "components/UI";
import Script from "next/script";
import { FormEvent, useEffect, useState } from "react";
import parser from "helpers/parsers.helper";
import { useSelector } from "react-redux";
import { IUser } from "types/User";

export default function CreatePost() {
    const [chapter, setChapter] = useState<"editor" | "view">("editor");
    const [texts, setText] = useState<string>("");
    const [articleName, setName] = useState<string>("");

    const user = useSelector((state:{user: IUser}) => state.user);

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

    // if(user.id === -1) {
    //     return (
    //         <Script id="0">
    //             location.href = &#34;/login&#34;
    //         </Script>
    //     );
    // }

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
                                <CreateForm texts={[texts, setText]}/>
                            </div>
                            :
                            <>
                                <div className={styles.example}>
                                    <h1
                                        className={styles.exampleTitle}>
                                        {articleName === "" ? "Безвісна стаття" : articleName}
                                    </h1>
                                    <div
                                        className={styles.exampleContent}
                                        dangerouslySetInnerHTML={
                                            {
                                                __html: localStorage.getItem("article")!.length > 1 ?
                                                    parser.MDtoHTML(localStorage.getItem("article")!, false)
                                                    : "<p>Ви маєте ввести принаймні 100 символів.</p>"
                                            }}>
                                    </div>
                                </div>
                            </>
                    }
                    <aside className={styles.aside}>
                        <div className={styles.boxMode}>
                            <div
                                className={chapter === "editor" ? [styles.choosed,"edit"].join(" ") : "edit"}
                                onClick={() => setChapter("editor")}
                                style={chapter === "editor" ? {background:"#1b1b1b"} : undefined}
                            >
                                Редагування
                            </div>
                            <div
                                className={chapter === "view" ? [styles.choosed,"look"].join(" ") : "look"}
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