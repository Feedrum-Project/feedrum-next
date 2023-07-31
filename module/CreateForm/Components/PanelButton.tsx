import Image from "next/image";
import styles from "styles/create.module.sass";
import { toSpecy } from "../functions/toSpecy";
import { Dispatch, SetStateAction } from "react";

interface IButton {
    selected: {
        heading?: boolean;
        italic?: boolean;
        link?: boolean;
        bold?: boolean;
        image?: boolean;
    };
    id: "heading" | "italic" | "link" | "bold" | "image";
    img: {src: string};
    enableArr: [ { id: string; content: any } | null, Dispatch<SetStateAction<{ id: string; content: any; } | null>> ];
    content?: any
}

export default function PanelButton({selected, id, img, enableArr, content}: IButton) {
    const [enabled, setEnable] = enableArr;

    return (
        <div
            className={
                enabled && content
                    ? enabled.id === id
                        ? styles.enabled
                        : styles.disabled
                    : styles.disabled
            }
        >
            {
                enabled !== null && content && enabled.id === id ? content : <button
                    id={id}
                    type="button"
                    onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent> & {
                            target: { id: string };
                        }
                    ) => {
                        if(!content) return toSpecy(e);
                        enabled !== null ? setEnable(null) : setEnable({id, content});
                    }}
                    className={
                        selected[id] ? styles.selected : styles.unselected
                    }
                >
                    <Image src={img.src} alt="Похилий" width={16} height={16} />
                </button>
            }
        </div>
    );
}