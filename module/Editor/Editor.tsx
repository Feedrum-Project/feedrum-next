import { Button } from "components/UI";
import styles from "./styles/editor.module.sass";
import { createMono, createParagragh, createTitle } from "./helpers/text";
import { useEffect, useRef, useState } from "react";
import { MDtoHTML, parserHTMLtoJSON, parserJSONtoMD } from "./helpers/parser";

export default function VisualEditor() {
    const paragraph = useRef<HTMLDivElement | null>(null);
    let [Focus, setFocus] = useState<any>(null);
    let [editorType, setEditorType] = useState<"visual" | "source">("visual");

    let [text, setText] = useState<string>("");
    
    useEffect(() => {

        // for right way using it, tap on button "source" and
        // "visual", it will reboot function, and will work correct.
        // same about next useEffect.
        
        if(!paragraph || !paragraph.current) return;

        const current = paragraph.current;
        current.addEventListener("click", (e: MouseEvent) => {
            const target = e.target as EventTarget;
            if(!target) return;
            setFocus(target);
        });

    }, [editorType]);

    useEffect(() => {
        if(!paragraph.current) return;
        function listenerFunc(e: KeyboardEvent) {
            if(!paragraph.current) return;
            setText(parserJSONtoMD(parserHTMLtoJSON(paragraph.current.innerHTML, [])));
            window.removeEventListener("keypress", listenerFunc, false);
        }
        setText(parserJSONtoMD(parserHTMLtoJSON(paragraph.current.innerHTML, [])));
        console.log(MDtoHTML(text));
        return () => window.addEventListener("keypress", listenerFunc);
    }, [text, Focus]);

    return (
        <>
            <div className={styles.panelEditorType}>
                <Button
                    Style="purple"
                    disabled={editorType === "visual" ? true : false}
                    onClick={() => {
                        setEditorType("visual");
                        if(!paragraph.current) return;
                        // setText();
                    }}>
                    Візуальний редактор
                </Button>
                <Button
                    Style="purple"
                    disabled={editorType === "source" ? true : false}
                    onClick={() => {
                        setEditorType("source");
                        if(!paragraph.current) return;
                        setText(parserJSONtoMD(parserHTMLtoJSON(paragraph.current.innerHTML, [])));
                    }}>
                    Текстовий редактор
                </Button>
            </div>
            {
                editorType === "visual" ? 
                    <div
                        id="editor"
                        className={styles.editor}>
                        <button onClick={() => console.log(Focus)}>Показати на кому фокус</button>
                        <div ref={paragraph} className={styles.textField}>
                            
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
                            value={text}
                            onChange={(e: any) => { setText(e.target.value);}}
                        >

                        </textarea>
                    </>
            }
        </>
    );
}