import { Button } from "components/UI";
import styles from "./styles/editor.module.sass";
import { createMono, createParagragh, createTitle } from "./helpers/text";
import { useEffect, useRef, useState } from "react";
import {HTMLtoJSON, JSONtoMD, MDtoHTML} from "helpers/parsers.helper";

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
            setText(JSONtoMD(HTMLtoJSON(paragraph.current.innerHTML, [])));
            window.removeEventListener("keypress", listenerFunc, false);
        }
        return () => window.addEventListener("keypress", listenerFunc);
    }, [text, Focus]);

    return (
        <>
            <div className={styles.panelEditorType}>
                <Button
                    Style="purple"
                    disabled={editorType === "visual" ? true : false}
                    onClick={async () => {
                        setEditorType("visual");
                        await setTimeout(() => {}, 250);
                        if(!paragraph.current) return;
                        paragraph.current.innerHTML = MDtoHTML(text+"\n", false);
                    }}>
                    Візуальний редактор
                </Button>
                <Button
                    Style="purple"
                    disabled={editorType === "source" ? true : false}
                    onClick={() => {
                        setEditorType("source");
                        if(!paragraph.current) return;
                        const prepareText = JSONtoMD(HTMLtoJSON(paragraph.current.innerHTML, []));

                        prepareText === "undefined\n" || prepareText === undefined ?
                            setText("")
                            :
                            setText(prepareText);
                    }}>
                    Текстовий редактор
                </Button>
            </div>
            {
                editorType === "visual" ? 
                    <div
                        id="editor"
                        className={styles.editor}>
                        <div ref={paragraph} className={styles.textField}>

                        </div>
                        <textarea name="body" value={text} readOnly style={{display:"none"}}>
                            
                        </textarea>
                        <div className={styles.addParagraph}>
                            <div className={styles.addParagraphLeft} onClick={() => createParagragh(paragraph)}>
                                <div className={styles.addParagraphPlus}>+</div>
                                <p>Додати параграф, або інше поле?</p>
                            </div>
                            <div className={styles.addParagraphRight}>
                                <div className="h1" onClick={() => createTitle(paragraph)}>Заг.</div>
                                <div className="mono" onClick={() => createMono(paragraph)}>Мон.</div>
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