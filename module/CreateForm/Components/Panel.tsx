import styles from "../styles/form.module.sass";
import Image from "next/image";
import Heading from "../../../images/createPost/Heading.svg";
import Italic from "../../../images/createPost/Italic.svg";
import Linked from "../../../images/createPost/Link.svg";
import Bold from "../../../images/createPost/Bold.svg";
import Imagged from "../../../images/createPost/Image.svg";

interface ISelects {
    header?: boolean;
    italic?: boolean;
    link?: boolean;
    bold?: boolean;
}

export default function Panel({selects}: {selects:[ISelects, any]}) {
    return (
        <div className={styles.panel}>
            <button className={
                selects[0].header ? styles.selected : undefined
            }>
                <Image src={Heading} alt="Заголовок"/>
            </button>
            <button className={
                selects[0].italic ? styles.selected : undefined
            }>
                <Image src={Italic} alt="Курсивно"/>
            </button>
            <button className={
                selects[0].link ? styles.selected : undefined
            }>
                <Image src={Linked} alt="Посилання"/>
            </button>
            <button className={
                selects[0].bold ? styles.selected : undefined
            }>
                <Image src={Bold} alt="Товстий"/>
            </button>
            <button>
                <Image src={Imagged} alt="Малюнок"/>
            </button>
        </div>
    );
}