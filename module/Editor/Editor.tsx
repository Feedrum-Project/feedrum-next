import { useRef, useState, useEffect, MutableRefObject } from "react";
import { Button } from "components/UI";
import styles from "./styles/editor.module.sass";
import { createMono, createParagragh, createTitle } from "./helpers/text";

export default function VisualEditor() {
    let editor = useRef<HTMLDivElement | null>(null);
    let paragraph = useRef<HTMLDivElement | null>(null);
    let [editorType, setEditorType] = useState<"visual" | "source">("visual");

    useEffect(() => {

        if(editor.current !== null) {
            window.addEventListener("click", (event: MouseEvent) => {
                const target = event.target as Element;
                const current = editor.current;
                if(target === null || target.className === null) return;
                if(current === null) return;
                if(target.className.includes("editor"))
                {
                    current.addEventListener("click", (editorEvent: MouseEvent) => {
                        // console.log(editorEvent.target);
                    });
                }
            });
        }
    }, [editorType]);

    return (
        <>
            <div className={styles.panelEditorType}>
                <Button
                    Style="purple"
                    disabled={editorType === "visual" ? true : false}
                    onClick={() => {
                        setEditorType("visual");
                    }}>
                    Візуальний редактор
                </Button>
                <Button
                    Style="purple"
                    disabled={editorType === "source" ? true : false}
                    onClick={() => {
                        setEditorType("source");
                    }}>
                    Текстовий редактор
                </Button>
            </div>
            {
                editorType === "visual" ? 
                    <div
                        id="editor"
                        className={styles.editor} ref={editor}>
                        
                        <div ref={paragraph} className="textField">
                            <p id="1">
                                Спробуй змінити мене :Р
                            </p>
                        </div>
                        <div className={styles.addParagraph}>
                            <div className={styles.addParagraphLeft} onClick={() => createParagragh(paragraph)}>
                                <div className={styles.addParagraphPlus}>+</div>
                                <p>Додати параграф, або інше поле?</p>
                            </div>
                            <div className={styles.addParagraphRight}>
                                <div className="h1" onClick={() => createTitle(paragraph)}>Заг.</div>
                                <div className="h1" onClick={() => createMono(paragraph)}>Мон.</div>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <textarea
                            className={styles.textarea}
                            name="body"
                            placeholder="Очікуємо на ваш текст, панове!"
                        >

                        </textarea>
                    </>
            }
        </>
    );
}