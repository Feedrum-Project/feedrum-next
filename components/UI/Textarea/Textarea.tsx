import styles from "./styles/textarea.module.sass";
import Button from "../Button/Button";
import { useState } from "react";

interface ITextarea {
    name: string;
    maxCount: number;
}

export default function Textarea({name, maxCount}: ITextarea) {
    const [content, setContent] = useState<string>("");
    return (
        <>
            <div className={styles.textarea}>
                <div className={styles.textareaTop}>
                    <div className={styles.textareaLeft}>
                        {name}
                    </div>
                    <div className={styles.textareaRight}>
                        {content.length} / {maxCount} символів
                    </div>
                </div>
                <div className={styles.textareaBottom}>
                    <textarea
                        className={styles.textareaContent}
                        value={content}
                        maxLength={maxCount}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Місце для вашого коментаря.">

                    </textarea>
                </div>
            </div>
            <div className={styles.button}>
                <Button
                    Style="purple"
                    type="submit"
                >
                    Підтвердити
                </Button>
            </div>
        </>
    );
}