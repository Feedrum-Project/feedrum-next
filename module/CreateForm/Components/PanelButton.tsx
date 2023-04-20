import text from "../helpers/text";
import styles from "../styles/form.module.sass";
import { useState } from "react";
import Image from "next/image";
import PopUp from "components/UI/PopUp/PopUp";


const selectsText = {
    header: "h1",
    italic: "i",
    link:   "a",
    bold:   "strong",
    img:    "img"
};

export default function PanelButton(
    {img, info, specy, isActive}:
    {
        specy: "header" | "italic" | "link" | "bold" | "img", isActive: any, img: any, info: string
    }
) {
    const [show, setShow] = useState<{show: boolean, coords: {x: number, y: number}}>({show: false, coords: {x: 0, y: 0}});
    // objs.forEach(e => console.log(e[0] === specy ? true : false));

    return (
        <>
            <button type="button"
                className={isActive !== undefined ? styles.selected : styles.hovered}
                onClick={() => {
                    const parent = window.getSelection()?.anchorNode?.parentNode as HTMLElement;
                    if(parent.id !== "editor") {
                        const editor = document.getElementById("editor");
                        text.createElement(editor as HTMLDivElement, selectsText[specy]);
                    } else {
                        text.specify(selectsText[specy], window.getSelection());
                    }
                }}
                onMouseEnter={(e) => {
                    setShow({show: true, coords: {x: e.pageX, y: e.pageY+10}});
                }}
                onMouseLeave={() => {
                    setShow({show: false, coords: {x: 0, y: 0}});
                }}>
                <Image src={img} alt="Заголовок"/>
                {
                    show.show && info !== undefined ? <PopUp info={info} coords={show.coords} /> : null
                }
            </button>
        </>
    );
}