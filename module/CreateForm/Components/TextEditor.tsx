import styles from "../styles/form.module.sass";
import { useEffect, useState } from "react";
import Panel from "./Panel";
import parser from "helpers/parsers.helper";
import hljs from "highlight.js";

interface ISelects {
    header?: boolean;
    italic?: boolean;
    link?: boolean;
    bold?: boolean;
}

export default function TextEditor() {
    const selects = useState<ISelects>({header: false});
    const article = localStorage.getItem("article")!;

    const [value, setValue] = useState<string>(article);
    useEffect(() => {
        window.addEventListener("keydown", ({target}: {target: HTMLElement & any}) => {
            setTimeout(() => {
                setValue(target.innerHTML);
                console.log(value);
            }, 10);
        });
    });

    return (
        <>
            <Panel selects={selects}/>
            <div className={[styles.editor, styles.form].join(" ")}>
                <div className={styles.editorInfo}>
                    <p>Контент</p>
                    <div className={article?.length < 100 ? styles.red : article.length > 500 ? styles.green : styles.orange}>
                        {localStorage.getItem("article")?.length}&nbsp;
                        / 100
                    </div>
                </div>
                <div
                    className={styles.editorContent}
                    contentEditable="true"
                    dangerouslySetInnerHTML={
                        {__html: parser.hightlight(article)}
                    }
                >
                </div>
                <button type="button" onClick={() => localStorage.setItem("article", value)}>зберегти</button>
            </div>
        </>
    );
};