import Image from "next/image";
import styles from "styles/create.module.sass";

import bold from "images/createPost/Bold.svg";
import heading from "images/createPost/Heading.svg";
import image from "images/createPost/Image.svg";
import italic from "images/createPost/Italic.svg";
import link from "images/createPost/Link.svg";

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
    return (
        <div className={styles.panel}>
            <button
                className={selected.heading ? styles.selected : styles.unselected}
            >
                <Image
                    src={heading.src}
                    alt="Заголовок"
                    width={16}
                    height={16}
                />
            </button>
            <button
                className={selected.italic ? styles.selected : styles.unselected}
            >
                <Image
                    src={italic.src}
                    alt="Похилий"
                    width={16}
                    height={16}
                />
            </button>
            <button
                className={selected.link ? styles.selected : styles.unselected}
            >
                <Image
                    src={link.src}
                    alt="Посилання"
                    width={16}
                    height={16}
                />
            </button>
            <button
                className={selected.bold ? styles.selected : styles.unselected}
            >
                <Image src={bold.src} alt="Товстий" width={16} height={16} />
            </button>
            <button
                className={selected.image ? styles.selected : styles.unselected}
            >
                <Image src={image.src} alt="Малюнок" width={16} height={16} />
            </button>
        </div>
    );
}
