import styles from "./styles/form.module.sass";
import Panel from "./Components/Panel";
import Editor from "./Components/Editor";
import { Button } from "components/UI";
import { useEffect, useState } from "react";

interface ISelects {
    header?: boolean;
    italic?: boolean;
    link?: boolean;
    bold?: boolean;
}

export default function CreateForm({texts: [texts, setText]}: any) {
    const selects = useState<ISelects>({header: false});

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            setTimeout(() => {
                const parent = window.getSelection()?.focusNode as HTMLElement;
                if(!parent || !parent.parentNode) return;
                const tagName = parent.parentNode as HTMLElement;
                const tag = tagName.tagName.toLowerCase();
                if(!tag) return;
                switch(tag) {
                case "p":
                    return selects[1]({
                        header: false,
                        bold: false,
                        italic: false,
                        link: false
                    });
                case "h1":
                    return selects[1]({
                        header: true,
                        bold: false,
                        italic: false,
                        link: false
                    });
                case "b":
                case "strong":
                    return selects[1]({
                        header: false,
                        bold: true,
                        italic: false,
                        link: false
                    });
                case "em":
                case "i":
                    return selects[1]({
                        header: false,
                        bold: false,
                        italic: true,
                        link: false
                    });
                case "a":
                    return selects[1]({
                        header: false,
                        bold: false,
                        italic: false,
                        link: true
                    });
                default:
                    return selects[1]({
                        header: false,
                        bold: false,
                        italic: false,
                        link: false
                    });
                }
            }, 25);

        });
    });

    return (
        <>
            <Panel selects={selects}/>
            <Editor selects={selects} text={[texts, setText]}/>
            <div className={styles.buttons}>
                <Button type="submit" Style="purple">Оприлюднити</Button>
                <Button Style="standart">Зберегти як чорнетка</Button>
            </div>
        </>
    );
}