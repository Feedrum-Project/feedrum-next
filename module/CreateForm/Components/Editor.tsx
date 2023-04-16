import styles from "../styles/form.module.sass";
import { Button } from "components/UI";
import text from "../helpers/text";
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
        selects: [ISelects, any];
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
            <div>
                <Button
                    Style="purple"
                    onClick={() => {
                        text.createElement(textField, "p");
                        if(!textField.current) return;
                        const current = textField.current as HTMLElement;
                        localStorage.setItem("article", parser.HTMLtoMD(current.innerHTML));
                        setText(parser.HTMLtoMD(current.innerHTML));
                    }}>
                        Додати елемент
                </Button>
                <Button
                    Style="purple"
                    onClick={() => {
                        text.createElement(textField, "h1");
                        if(!textField.current) return;
                        const current = textField.current as HTMLElement;
                        localStorage.setItem("article", parser.HTMLtoMD(current.innerHTML));
                        setText(parser.HTMLtoMD(current.innerHTML));
                    }}>
                        Додати заголовок
                </Button>
                
            </div>
        </div>
    );
}