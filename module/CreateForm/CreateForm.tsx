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
        window.addEventListener("keydown", () => {
            setTimeout(() => {
                function check(parent: HTMLDivElement, count: number) {
                    if(count > 3 || count < 0) return;
                    if(parent.localName === "div") return;
                    if(!parent || !parent.parentNode) return;
                    const tagName = parent.parentNode as HTMLElement;
                    const tag = tagName.tagName.toLowerCase();
                    check(parent.parentNode as HTMLDivElement, count-1);

                    console.log(parent);

                    switch(tag) {
                    case "p":
                        return selects[1]((pr) => pr = {
                            header: false,
                            bold: false,
                            italic: false,
                            link: false
                        });
                    case "h1":
                        return selects[1]((pr) => pr = {
                            ...pr,
                            header: true
                        });
                    case "b":
                    case "strong":
                        return selects[1]((pr) => pr = {...pr, bold: true});
                    case "em":
                    case "i":
                        return selects[1]((pr) => pr = {
                            ...pr,
                            italic: true
                        });
                    case "a":
                        return selects[1]((pr) => pr = {
                            ...pr,
                            link: true
                        });
                    default:
                        return selects[1]((pr) => pr = {
                            header: false,
                            bold: false,
                            italic: false,
                            link: false
                        });
                    }
                }
                
                const parent = window.getSelection()?.focusNode as HTMLDivElement;
                check(parent, 3);
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