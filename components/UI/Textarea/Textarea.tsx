import styles from "./styles/textarea.module.sass";
import { useState } from "react";

interface ITextarea {
    name: string;
    Name: string;
    maxCount: number;
    placeholder?: string;
}

export default function Textarea({name, Name, maxCount, placeholder}: ITextarea) {
    const [content, setContent] = useState<string>("");
    return (
        <>
            <div className={styles.textarea}>
                <div className={styles.textareaTop}>
                    <div className={styles.textareaLeft}>
                        {Name}
                    </div>
                    <div className={styles.textareaRight}>
                        {content.length} / {maxCount} символів
                    </div>
                </div>
                <div className={styles.textareaBottom}>
                    <textarea
                        name={name}
                        className={styles.textareaContent}
                        value={content}
                        maxLength={maxCount}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={placeholder}>

                    </textarea>
                </div>
            </div>
        </>
    );
}