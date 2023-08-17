import styles from "styles/create.module.sass";
import { Input } from "components/UI";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { HTMLtoMD, MDtoHTML } from "helpers/parsers.helper";
import Panel from "./Panel";
import useSelected from "../hooks/useSelected";

interface IEditor {
    articleSet: [
        {
            title: string;
            content: string;
        },
        Dispatch<
            SetStateAction<{
                title: string;
                content: string;
            }>
        >
    ];
}

export default function Editor({ articleSet }: IEditor) {
    const [article, setArticle] = articleSet;
    const [tempContent, setTempContent] = useState<string>("");
    const [selected, setSelect] = useSelected();
    const editor = useRef<any>(null);

    useEffect(() => {
        setTempContent(article.content);

        const sel = window.getSelection();

        document.addEventListener("keyup", (_) => {
            const panelFields = sel?.anchorNode?.parentElement?.tagName;

            if(panelFields === undefined) return;
            setSelect(panelFields);

            if (editor.current === null) return;
            if (sel === null) return;

            const content = HTMLtoMD(editor.current.innerHTML);
            if (content === article.content) return;
            setTempContent(content);
        });
    }, [article.content]);

    return (
        <>
            <Input
                name="title"
                Name="Назва"
                info="Назва вашої статті, мінімум 4 символи"
                minLength={4}
                value={article.title}
                size={36}
                onChange={(e) =>
                    setArticle((pr) => {
                        return { ...pr, title: e.target.value };
                    })
                }
            />
            <Panel selected={selected} />
            <div className={styles.textarea}>
                <div className={styles.textareaTop}>
                    <div className="name">Контент</div>
                    <div
                        className={[
                            "symbols",
                            tempContent.length < 100
                                ? "red"
                                : tempContent.length < 500
                                    ? "orange"
                                    : tempContent.length > 2000 ? "red" : "green",
                        ].join(" ")}
                    >
                        {tempContent.length} / 100
                    </div>
                </div>
                <div
                    className={styles.textareaBottom}
                    contentEditable={true}
                    dangerouslySetInnerHTML={{
                        __html:
                            article.content.length === 0
                                ? '<p contentEditable="true"></p>'
                                : MDtoHTML(article.content),
                    }}
                    ref={editor}
                    id="txt"
                ></div>
            </div>
        </>
    );
}
