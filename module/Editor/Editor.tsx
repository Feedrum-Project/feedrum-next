import { useRef, useState, useEffect } from "react";
import { Button } from "components/UI";
import styles from "./styles/editor.module.sass";

export default function VisualEditor() {
    let editor = useRef<HTMLDivElement | null>(null);
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
                        console.log(editorEvent);
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
                    Visual Editor
                </Button>
                <Button
                    Style="purple"
                    disabled={editorType === "source" ? true : false}
                    onClick={() => {
                        setEditorType("source");
                    }}>
                    Source Editor
                </Button>
            </div>
            {
                editorType === "visual" ? 
                    <div
                        id="editor"
                        className={styles.editor} ref={editor}>
                        Try edit
                    </div>
                    :
                    <>
                        <br />
                        <textarea
                            className={styles.textarea}
                            placeholder="Очікуємо на ваш текст, панове!"
                        >

                        </textarea>
                    </>
            }
        </>
    );
}