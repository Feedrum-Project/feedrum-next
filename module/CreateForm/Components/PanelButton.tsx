import Image from "next/image";
import styles from "styles/create.module.sass";
import { toSpecy } from "../functions/toSpecy";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface IButton {
    selected: {
        heading?: boolean;
        italic?: boolean;
        link?: boolean;
        bold?: boolean;
        image?: boolean;
        code?: boolean;
    };
    id: "heading" | "italic" | "link" | "bold" | "image" | "code";
    img: { src: string };
    enableArr: [
        { id: string; content: ReactNode } | null,
        Dispatch<SetStateAction<{ id: string; content: any } | null>>,
    ];
    content?: any;
    onClick?: (e: any) => void;
}

export default function PanelButton({
    selected,
    id,
    img,
    enableArr,
    content,
    onClick,
}: IButton) {
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
            {enabled !== null && content && enabled.id === id ? (
                content
            ) : (
                <button
                    id={id}
                    type="button"
                    onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent> & {
                            target: { id: string };
                        },
                    ) => {
                        if (!content && id !== "code") return toSpecy(e);
                        enabled !== null
                            ? setEnable(null)
                            : setEnable({ id, content });

                        onClick && onClick(e); // if onClick exist, do
                    }}
                    className={
                        selected[id] ? styles.selected : styles.unselected
                    }
                >
                    <Image src={img.src} alt="Похилий" width={16} height={16} />
                </button>
            )}
        </div>
    );
}
