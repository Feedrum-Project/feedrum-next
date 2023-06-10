import styles from "../styles/create.module.sass";

import Script from "next/script";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IUser } from "types/User";

import CreateForm from "module/CreateForm/CreateForm";
import TextEditor from "module/CreateForm/Components/TextEditor";
import createPost from "module/CreateForm/fetch/createPost";
import { Input } from "components/UI";
import Images from "module/CreateForm/Components/Images";

export default function CreatePost() {
    const [chapter, setChapter] = useState<"editor" | "view">("view");
    const [texts, setText] = useState<string>("");
    const [articleName, setName] = useState<string>("");
    const [files, setFiles]= useState<File[]>();

    const user = useSelector((state:{user: IUser}) => state.user);

    useEffect(() => {
        const item = localStorage.getItem("article");
        setText(item === null ? "" : item);
    }, []);

    function sub(e: FormEvent & {target: {data: HTMLTextAreaElement, name: HTMLInputElement}}) {
        e.preventDefault();
        if(!e || !e.target) return;
        const target = e.target;
        
        const { value: title } = target.name;
        const { value: body } = target.data;
        if(body.length < 100) return;

        if(files !== undefined && files.length > 1) {
            const form = new FormData();
            files?.forEach((e, i) => {
                form.append("image-"+i, e);
            });

            fetch("/api/images/", {
                method: "POST",
                body: form
            })
                .then(res => res.json())
                .then(res => console.log(res));
        }
        
        createPost({body: {title, body, images: files}, user: user})
            .then(res => {
                console.log(res);
                if(res.code === 200) {
                    location.href = "/posts/"+ res.data.id
                }
            });
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
                                <Images files={files} setFiles={setFiles} showAdd/>
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
                                    <Images files={files} setFiles={setFiles}/>
                                    <h1
                                        suppressContentEditableWarning
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