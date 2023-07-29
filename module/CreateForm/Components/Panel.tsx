import Image from "next/image";
import styles from "styles/create.module.sass";

import bold from "images/createPost/Bold.svg";
import heading from "images/createPost/Heading.svg";
import image from "images/createPost/Image.svg";
import italic from "images/createPost/Italic.svg";
import link from "images/createPost/Link.svg";
import { useState } from "react";
import Modal from "components/Modal/Modal";
import { Button, Input } from "components/UI";

interface IPanel {
    selected: {
        heading?: boolean;
        italic?: boolean;
        link?: boolean;
        bold?: boolean;
        image?: boolean;
    };
}

export default function Panel({ selected }: IPanel) {
    const [modal, setModal] = useState<{
        content: any;
        show: boolean;
    }>({content: "", show: false});

    function toSpecy(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> & {
            target: { id: string };
        }
    ) {
        if (e.target === null) return;
        const { target } = e;
        let node: Node;
        switch (target.id) {
        case "header":
            node = document.createElement("h2");
            break;
        case "italic":
            node = document.createElement("i");
            break;
        case "link":
            node = document.createElement("a");
            modal.show ? null : setModal(
                {
                    content: <>
                        <Input Name="Посилання"/>
                        <br />
                        <Button Style="purple">Зберегти</Button>
                    </>,
                    show: true
                }
            );
            break;
        case "bold":
            node = document.createElement("b");
            break;
        case "image":
            node = document.createElement("img");
            break;
        default:
            return;
        }

        if (node === undefined) return;

        const sel = window.getSelection()?.getRangeAt(0);

        if (!sel) return;
        const parent = sel?.commonAncestorContainer!.parentNode! as HTMLElement;
        if (parent.id === "txt") sel.surroundContents(node);
        return;
    }
    return (
        <div className={styles.panel}>
            {modal.show ? (
                <Modal setModal={setModal} type="message">
                    {
                        modal.content
                    }
                </Modal>
            ) : null}
            <button
                id="header"
                type="button"
                onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent> & {
                        target: { id: string };
                    }
                ) => toSpecy(e)}
                className={
                    selected.heading ? styles.selected : styles.unselected
                }
            >
                <Image
                    src={heading.src}
                    alt="Заголовок"
                    width={16}
                    height={16}
                />
            </button>
            <button
                id="italic"
                type="button"
                onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent> & {
                        target: { id: string };
                    }
                ) => toSpecy(e)}
                className={
                    selected.italic ? styles.selected : styles.unselected
                }
            >
                <Image src={italic.src} alt="Похилий" width={16} height={16} />
            </button>
            <button
                id="link"
                type="button"
                onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent> & {
                        target: { id: string };
                    }
                ) => toSpecy(e)}
                className={selected.link ? styles.selected : styles.unselected}
            >
                <Image src={link.src} alt="Посилання" width={16} height={16} />
            </button>
            <button
                id="bold"
                type="button"
                onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent> & {
                        target: { id: string };
                    }
                ) => toSpecy(e)}
                className={selected.bold ? styles.selected : styles.unselected}
            >
                <Image src={bold.src} alt="Товстий" width={16} height={16} />
            </button>
            <button
                id="img"
                type="button"
                onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent> & {
                        target: { id: string };
                    }
                ) => toSpecy(e)}
                className={selected.image ? styles.selected : styles.unselected}
            >
                <Image src={image.src} alt="Малюнок" width={16} height={16} />
            </button>
        </div>
    );
}
