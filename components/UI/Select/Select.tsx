import styles from "./styles/select.module.sass";
import Image from "next/image";
import question from "images/Question.svg";
import { useState } from "react";
import PopUp from "../PopUp/PopUp";

interface ISelect {
    name: string;
    values: string[];
    info?: string;
}

export default function Select({name, values, info="Інформація відсутня"}: ISelect) {
    const [show, setShow] = useState<{show: boolean, coords: {x: number, y: number}}>({show: false, coords: {x: 0, y: 0}});
    return (
        <div className={styles.select}>
            <div className={styles.top}>
                <h1 className={styles.name}>{name}</h1>
                <div
                    className="info"
                    onMouseEnter={(e) => {
                        console.log(e);
                        setShow({show: true, coords: {x: e.pageX, y: e.pageY+10}});
                    }}
                    onMouseLeave={() => {
                        setShow({show: false, coords: {x: 0, y: 0}});
                    }}>
                    <Image src={question} alt="запитання"/>
                </div>
            </div>
            <div className={styles.field}>
                <select className={styles.list}>
                    {
                        values.map(e => {
                            return <option key={e} value={e}>{e}</option>;
                        })
                    }
                </select>
            </div>
            {
                show.show ? <PopUp info={info} coords={show.coords} /> : null
            }
        </div>
    );
}