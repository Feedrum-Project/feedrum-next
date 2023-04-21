import styles from "../styles/form.module.sass";
import { useEffect, useRef, useState } from "react";
import parser from "helpers/parsers.helper";

interface ISelects {
    header?: boolean;
    italic?: boolean;
    link?: boolean;
    bold?: boolean;
}

export default function Editor(
    {
        selects,
        text: [texts, setText]
    }:
    {
        selects: [ISelects, (pr: any) => void];
        text: any;
    }) {
    const textField = useRef(null);
    const [value, setValue] = useState<string>(texts);

    useEffect(() => {
        setValue(localStorage.getItem("article")!);
        window.addEventListener("keydown", (e) => {
            if(!textField.current) return;
            const current = textField.current as HTMLElement;
            const target = e.target as HTMLElement;

            setTimeout(() => {
                target.innerText.length <= 1
                    && target.parentElement
                    && target.parentElement.id === "editor" ?
                    target.remove() : null;
                localStorage.setItem("article", parser.HTMLtoMD(current.innerHTML));
                setText(parser.HTMLtoMD(current.innerHTML));
                
                function check(parent: HTMLDivElement, count: number=3) {
                    if(count > 3 || count < 0) return;
                    if(parent === null || !parent.parentNode) return;
                    if(parent.localName === "div") return;
                    const tagName = parent.parentNode as HTMLElement;
                    const tag = tagName.tagName.toLowerCase();

                    check(parent.parentNode as HTMLDivElement, count-1);

                    switch(tag) {
                    case "p":
                        return selects[1]((pr: ISelects) => pr = {
                            header: false,
                            bold: false,
                            italic: false,
                            link: false
                        });
                    case "h1":
                        return selects[1]((pr: ISelects) => pr = {
                            ...pr,
                            header: true
                        });
                    case "b":
                    case "strong":
                        return selects[1]((pr: ISelects) => pr = {...pr, bold: true});
                    case "em":
                    case "i":
                        return selects[1]((pr: ISelects) => pr = {
                            ...pr,
                            italic: true
                        });
                    case "a":
                        return selects[1]((pr: ISelects) => pr = {
                            ...pr,
                            link: true
                        });
                    default:
                        return selects[1]((pr: ISelects) => pr = {
                            header: false,
                            bold: false,
                            italic: false,
                            link: false
                        });
                    }
                }
                
                const parent = window.getSelection()?.focusNode as HTMLDivElement;
                check(parent);
            }, 25);
        });
    }, []);

    return (
        <div className={styles.editor}>
            <div>
                <div
                    id="editor"
                    className={styles.editorContent}
                    ref={textField}
                    dangerouslySetInnerHTML={
                        {
                            __html: parser.MDtoHTML(value)
                        }
                    }
                >
                </div>
                <textarea
                    name="data"
                    value={value}
                    readOnly={true}
                    style={{display:"none"}}>
                </textarea>
            </div>
            {
                texts.length < 1 ?
                    <div>
                        <h1 className={styles.darkText}>Пусто</h1>
                        <p>Щоб додати елемент, натисність знизу.</p>
                    </div>
                    : null
            }   
        </div>
    );
}