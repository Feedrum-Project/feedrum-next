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
    let objs = Object.entries(selects[0]).filter((e: any) => {
        if(e[1] === true) {
            return e[0];
        }
        return;
    });

    return (
        <div className={styles.panel}>
            <PanelButton
                isActive={
                    objs.find(e => e[0] === "header")
                }
                img={Heading}
                info="Заголовок"
                specy="header"/>
            <PanelButton
                isActive={
                    objs.find(e => e[0] === "italic")
                }
                img={Italic}
                info="Похилий"
                specy="italic"/>
            <PanelButton
                isActive={
                    objs.find(e => e[0] === "link")
                }
                img={Linked}
                info="Посилання"
                specy="link"/>
            <PanelButton
                isActive={
                    objs.find(e => e[0] === "bold")
                }
                img={Bold}
                info="Товский"
                specy="bold"/>
            <PanelButton
                isActive={
                    objs.find(e => e[0] === "img")
                }
                img={Imagged}
                info="Малюнок"
                specy="img"/>
        </div>
    );
}