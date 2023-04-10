import text from "../helpers/text";
import styles from "../styles/form.module.sass";
import { useState } from "react";
import Image from "next/image";
import PopUp from "components/UI/PopUp/PopUp";

export default function PanelButton({selects, img, info, specy}: any) {
    const [show, setShow] = useState<{show: boolean, coords: {x: number, y: number}}>({show: false, coords: {x: 0, y: 0}});

    return (
        <>
            <button className={
                selects[0].header ? styles.selected : undefined
            }
            onClick={() => text.specify(specy)}
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