import styles from "../styles/form.module.sass";
import { useEffect, useState } from "react";
import Panel from "./Panel";
import parser from "helpers/parsers.helper";
import { useRef } from "react";

interface ISelects {
    header?: boolean;
    italic?: boolean;
    link?: boolean;
    bold?: boolean;
}

export default function TextEditor() {
    const selects = useState<ISelects>({header: false});
    const article = localStorage.getItem("article")!;
    const editor = useRef<any>(null);
    const [value, setValue] = useState<string>(article);

    useEffect(() => {
        let timer: any;
        if(editor === null || editor.current === null) return;

        let listener = window.addEventListener("keyup", (e) => {
            const elem = window.getSelection()?.anchorNode?.parentNode as HTMLDivElement;
            if(!elem) return;

            function check(parent: HTMLDivElement, count: number=3) {
                if(count > 3 || count < 0) return;
                if(parent === null || !parent.parentNode) return;
                if(parent.localName === "div") return;

                selects[1]({});
                parent.className === "hljs-strong" ? selects[1]({bold: true}) :
                    parent.className === "hljs-emphasis" ? selects[1]({italic: true}) :
                        parent.className === "hljs-meta" || parent.className === "hljs-section"
                            ? selects[1]({header: true}) :
                            parent.className === "hljs-link" ? selects[1]({link: true}) : null;

                check(parent.parentNode as HTMLDivElement, count-1);
            }
            check(elem);
            
            setTimeout(() => {
                if(editor === null || editor.current === null) return;
                setValue(editor.current.innerText);
            }, 10);
            
            clearTimeout(timer);
            timer = setTimeout(() => {
                if(editor === null || editor.current === null) return;
                console.log("edited");
                setValue(editor.current.innerText);
                localStorage.setItem("article", editor.current.innerText);
            }, 1000);
            window.removeEventListener("keyup", listener as any);
        });
    }, []);

    return (
        <>
            <Panel selects={selects}/>
            <div className={[styles.editor, styles.form].join(" ")} id="text-editor">
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
                    ref={editor}
                >
                </div>
                <button type="button" onClick={() => localStorage.setItem("article", value)}>Зберегти</button>
            </div>
        </>
    );
};