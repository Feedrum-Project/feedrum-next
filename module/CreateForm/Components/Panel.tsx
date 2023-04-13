import styles from "../styles/form.module.sass";
import PanelButton from "./PanelButton";
import Heading from "images/createPost/Heading.svg";
import Italic from "images/createPost/Italic.svg";
import Linked from "images/createPost/Link.svg";
import Bold from "images/createPost/Bold.svg";
import Imagged from "images/createPost/Image.svg";

interface ISelects {
    header?: boolean;
    italic?: boolean;
    link?: boolean;
    bold?: boolean;
}

export default function Panel({selects}: {selects:[ISelects, any]}) {
    return (
        <div className={styles.panel}>
            <PanelButton
                selects={selects}
                img={Heading}
                info="Заголовок"
                specy="header"/>
            <PanelButton
                selects={selects}
                img={Italic}
                info="Похилий"
                specy="italic"/>
            <PanelButton
                selects={selects}
                img={Linked}
                info="Посилання"
                specy="link"/>
            <PanelButton
                selects={selects}
                img={Bold}
                info="Товский"
                specy="bold"/>
            <PanelButton
                selects={selects}
                img={Imagged}
                info="Малюнок"
                specy="img"/>
        </div>
    );
}