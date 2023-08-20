import styles from "styles/create.module.sass";

import bold from "images/createPost/Bold.svg";
import heading from "images/createPost/Heading.svg";
import image from "images/createPost/Image.svg";
import italic from "images/createPost/Italic.svg";
import link from "images/createPost/Link.svg";
import code from "images/createPost/Code.svg";

import { ReactNode, useState } from "react";
import { Button, Input } from "components/UI";
import PanelButton from "./PanelButton";
import { toSpecy } from "../functions/toSpecy";

interface IPanel {
    selected: {
        heading?: boolean;
        italic?: boolean;
        link?: boolean;
        bold?: boolean;
        image?: boolean;
        code?: boolean;
    };
}

export default function Panel({ selected }: IPanel) {
    const [enabled, setEnabled] = useState<{
        id: string;
        content: ReactNode;
    } | null>(null);

    return (
        <div className={styles.panel}>
            <PanelButton
                selected={selected}
                id="heading"
                img={heading}
                enableArr={[enabled, setEnabled]}
                content={
                    <>
                        <div className={styles.board}>
                            <Button
                                id="h1"
                                Style="standart"
                                onClick={(e) => {
                                    toSpecy(e);
                                    setEnabled(null);
                                }}
                            >
                                Заголовок 1
                            </Button>
                            <Button
                                id="h4"
                                Style="standart"
                                onClick={(e) => {
                                    toSpecy(e);
                                    setEnabled(null);
                                }}
                            >
                                Заголовок 4
                            </Button>
                        </div>
                        <div className={styles.board}>
                            <Button
                                id="h2"
                                Style="standart"
                                onClick={(e) => {
                                    toSpecy(e);
                                    setEnabled(null);
                                }}
                            >
                                Заголовок 2
                            </Button>
                            <Button
                                id="h5"
                                Style="standart"
                                onClick={(e) => {
                                    toSpecy(e);
                                    setEnabled(null);
                                }}
                            >
                                Заголовок 5
                            </Button>
                        </div>
                        <div className={styles.board}>
                            <Button
                                id="h3"
                                Style="standart"
                                onClick={(e) => {
                                    toSpecy(e);
                                    setEnabled(null);
                                }}
                            >
                                Заголовок 3
                            </Button>
                            <Button
                                Style="danger"
                                onClick={() => setEnabled(null)}
                            >
                                Скасувати
                            </Button>
                        </div>
                    </>
                }
            />
            <PanelButton
                selected={selected}
                id="italic"
                img={italic}
                enableArr={[enabled, setEnabled]}
                onClick={(e) => toSpecy(e)}
            />
            <PanelButton
                selected={selected}
                id="link"
                img={link}
                enableArr={[enabled, setEnabled]}
                content={
                    <>
                        <Input
                            Name="Посилання"
                            id="link_value"
                        />
                        <div className={styles.board}>
                            <Button
                                Style="danger"
                                onClick={() => setEnabled(null)}
                            >
                                Скасувати
                            </Button>
                            <Button
                                Style="purple"
                                id="link"
                                onClick={(e) => {
                                    const elem = document.getElementById(
                                        "link_value"
                                    ) as HTMLInputElement;
                                    if (!elem) return;
                                    const { value } = elem;
                                    toSpecy(e, value);
                                }}
                            >
                                Прикріпити
                            </Button>
                        </div>
                    </>
                }
            />
            <PanelButton
                selected={selected}
                id="bold"
                img={bold}
                enableArr={[enabled, setEnabled]}
                onClick={(e) => toSpecy(e)}
            />
            <PanelButton
                selected={selected}
                id="image"
                img={image}
                enableArr={[enabled, setEnabled]}
                content={
                    <>

                        <Input
                            name="link"
                            Name="Посилання"
                        />
                        <div className={styles.board}>
                            <Button
                                Style="danger"
                                onClick={() => setEnabled(null)}
                            >
                                Скасувати
                            </Button>
                            <Button Style="purple" onClick={() => {
                                const txt = document.getElementById("txt");
                                const link = document.getElementsByName("link")[0] as HTMLInputElement | null;
                                if(!link) return;
                                const img = document.createElement("img");
                                img.src = link.value;
                                txt?.append(img);
                                setEnabled(null);
                                
                            }}>Прикріпити</Button>
                        </div>
                    </>
                }
            />
            <PanelButton
                selected={selected}
                id="code"
                img={code}
                enableArr={[enabled, setEnabled]}
                onClick={() => {
                    const el = document.getElementById("txt");
                    if (!el) return;
                    const text = document.createElement("p");
                    const codeElement = document.createElement("code");
                    codeElement.textContent = "Ваш код";
                    text.appendChild(codeElement);
                    const br = document.createElement("br");

                    el.appendChild(br);
                    el.appendChild(codeElement);
                    el.appendChild(br);
                }}
            />
        </div>
    );
}
