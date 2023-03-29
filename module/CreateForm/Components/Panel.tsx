import styles from "../styles/form.module.sass";
import Image from "next/image";
import Heading from "../../../images/createPost/Heading.svg";
import Italic from "../../../images/createPost/Italic.svg";
import Linked from "../../../images/createPost/Link.svg";
import Bold from "../../../images/createPost/Bold.svg";
import Imagged from "../../../images/createPost/Image.svg";

export default function Panel() {
    return (
        <div className={styles.panel}>
            <button>
                <Image src={Heading} alt="Заголовок"/>
            </button>
            <button>
                <Image src={Italic} alt="Курсивно"/>
            </button>
            <button>
                <Image src={Linked} alt="Посилання"/>
            </button>
            <button>
                <Image src={Bold} alt="Товстий"/>
            </button>
            <button>
                <Image src={Imagged} alt="Малюнок"/>
            </button>
        </div>
    );
}