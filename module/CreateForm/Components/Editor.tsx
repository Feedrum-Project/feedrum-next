import styles from "../styles/form.module.sass";
import { Button } from "components/UI";
import text from "../helpers/text";
import { useEffect, useRef } from "react";
import parser from "helpers/parsers.helper";

export default function Editor({text: [texts, setText]}:{text: any}) {
    const textField = useRef(null);
    useEffect(() => {
        window.addEventListener("keydown", () => {
            if(!textField.current) return;
            const current = textField.current as HTMLElement;
            localStorage.setItem("article", parser.HTMLtoMD(current.innerHTML));
            // setText(parser.HTMLtoMD(current.innerHTML));
        });
    }, [texts]);
    return (
        <div className={styles.editor}>
            <div className={styles.editorInfo}>
                <span>Контент</span>
                <span>{texts.length} / 100 символів</span>
            </div>
            <div
                className={styles.editorContent}
                ref={textField}
                dangerouslySetInnerHTML={{__html: parser.MDtoHTML(texts)}}
            >
            </div>
            <Button
                Style="purple"
                onClick={() => text.createElement(textField,"p")}>
                    Додати елемент
            </Button>
        </div>
    );
}