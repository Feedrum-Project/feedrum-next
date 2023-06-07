import styles from "../styles/form.module.sass";
import { useEffect, useState } from "react";
import { Button } from "components/UI";
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
    let article = localStorage.getItem("article");
    if(article === null) {
        localStorage.setItem("article", "");
        article = "";
    }

    const editor = useRef<any>(null);
    const [value, setValue] = useState<string>(article);

    useEffect(() => {
        let timer: any;
        if(editor === null || editor.current === null) return;

        let listener = window.addEventListener("keyup", (e) => {
            const elem = window.getSelection()?.anchorNode?.parentNode as HTMLDivElement;
            if(!elem) return;

            selects[1]({});
            function check(parent: HTMLDivElement, count: number=3) {
                if(count > 3 || count < 0) return;
                if(parent === null || !parent.parentNode) return;
                if(parent.localName === "div") return;

                parent.className === "hljs-strong" ? selects[1](pr => pr = {...pr, bold: true}) :
                    parent.className === "hljs-emphasis" ? selects[1](pr => pr = {...pr, italic: true}) :
                        parent.className === "hljs-meta" || parent.className === "hljs-section"
                            ? selects[1](pr => pr = {...pr, header: true}) :
                            parent.className === "hljs-link" ? selects[1](pr => pr = {...pr, link: true}) : null;

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
            }, 10000);
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
                <textarea
                    name="data"
                    value={value}
                    readOnly={true}
                    style={{display:"none"}}>
                </textarea>
                <div className={styles.buttons}>
                    <Button type="submit" Style="purple">Оприлюднити</Button>
                    <Button Style="standart" onClick={() => localStorage.setItem("article", value)}>Зберегти як чорнетка</Button>
                </div>
            </div>
        </>
    );
};