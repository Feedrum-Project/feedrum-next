import styles from "./styles/select.module.sass";
import Image from "next/image";
import question from "images/Question.svg";
import arrowTop from "images/arrow-top.svg";
import arrowBottom from "images/arrow-bottom.svg";
import { useState } from "react";
import PopUp from "../PopUp/PopUp";

interface ISelect {
    name: string;
    values: string[];
    info?: string;
}

export default function Select({name, values, info="Інформація відсутня"}: ISelect) {
    const [show, setShow] = useState<{show: boolean, coords: {x: number, y: number}}>({show: false, coords: {x: 0, y: 0}});
    const [opened, setOpened] = useState<boolean>(false);
    const [choosed, setChoosed] = useState(values[0]);

    return (
        <div className={styles.select}>
            <div className={styles.top}>
                <h1 className={styles.name}>{name}</h1>
                <div
                    className={styles.info}
                    onMouseEnter={(e) => {
                        setShow({show: true, coords: {x: e.pageX, y: e.pageY+10}});
                    }}
                    onMouseLeave={() => {
                        setShow({show: false, coords: {x: 0, y: 0}});
                    }}>
                    <Image src={question} alt="запитання"/>
                </div>
            </div>
            <div
                className={styles.field}>
                <div className={styles.value}
                    onClick={() => setOpened(pr => !pr)}>
                    <span>{choosed}</span>
                    <div className="symbol">
                        {
                            opened ? <Image src={arrowTop} alt="Відкрити список"/> : <Image src={arrowBottom} alt="Зачинити список"/>
                        }
                    </div>
                </div>
                <div
                    style={{display: opened ? "block" : "none"}}
                    className={styles.list}>
                    {
                        values.map(e => {
                            return <div
                                key={e}
                                style={e === choosed ? { fontWeight: "600", color: "#fff"} : undefined}
                                onClick={() => {
                                    setChoosed(e);
                                }}>
                                {e}
                            </div>;
                        })
                    }
                </div>
            </div>
            {
                show.show ? <PopUp info={info} coords={show.coords} /> : null
            }
        </div>
    );
}