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
            if(target.parentNode.id !== "editor") return;

            setTimeout(() => {
                setValue(target.innerText);
            }, 10);
        });
    });

    return (
        <>
            <Panel selects={selects}/>
            <div className={[styles.editor, styles.form].join(" ")} id="editor">
                <div className={styles.editorInfo}>
                    <p>Контент</p>
                    <div className={value.length < 100 ? styles.red : value.length > 500 ? styles.green : styles.orange}>
                        {value.length}&nbsp;
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