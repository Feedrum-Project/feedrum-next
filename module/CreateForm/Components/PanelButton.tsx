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
    {selects, img, info, specy}:
    {specy: "header" | "italic" | "link" | "bold" | "img", selects: any, img: any, info: any}) {
    const [show, setShow] = useState<{show: boolean, coords: {x: number, y: number}}>({show: false, coords: {x: 0, y: 0}});
    let objs = Object.entries(selects[0]).filter((e: any) => {
        if(e[1] === true) {
            return e[0];
        }
        return;
    });

    return (
        <>
            <button type="button" className={
                objs.length < 1 ? styles.hovered : objs[0][0] === specy ? styles.selected : styles.hovered
            }
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