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
                specy="h1"/>
            <PanelButton
                selects={selects}
                img={Italic}
                info="Похилий"
                specy="i"/>
            <PanelButton
                selects={selects}
                img={Linked}
                info="Посилання"
                specy="a"/>
            <PanelButton
                selects={selects}
                img={Bold}
                info="Товский"
                specy="b"/>
            <PanelButton
                selects={selects}
                img={Imagged}
                info="Малюнок"
                specy="img"/>
        </div>
    );
}