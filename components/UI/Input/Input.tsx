import Image from "next/image";
import PopUp from "../PopUp/PopUp";
import styles from "./input.module.sass";
import eye from "../../../images/eye.svg";
import question from "../../../images/Question.svg";
import { useState } from "react";

interface InputProps {
  type?:string;
  placeholder?:string;
  name:string;
  disabled?: boolean;
  value?: string;
  info?: string;
}

export default function Input(
    {
        type="text",
        name,
        placeholder,
        disabled=false,
        value="",
        info
    }:InputProps) {

    const [show, setShow] = useState<{show: boolean, coords: {x: number, y: number}}>({show: false, coords: {x: 0, y: 0}});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [valueInp, setValue] = useState(value);

    return (
        <div className={styles.inputSquare}>
            <div className={styles.inputSquareName}>
                <span>
                    {name}
                </span>
                <div
                    className={styles.info}
                    onMouseEnter={(e) => {
                        setShow({show: true, coords: {x: e.pageX, y: e.pageY+10}});
                    }}
                    onMouseLeave={() => {
                        setShow({show: false, coords: {x: 0, y: 0}});
                    }}>
                    {
                        info ? <Image src={question} alt="Запитання."/> : null
                    }
                </div>
            </div>
            <div className={styles.inputSquareBottom}>
                <input
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    value={valueInp}
                    disabled={disabled}
                    type={showPassword !== true ? type : "text"}
                    placeholder={placeholder}
                    name={name}
                    className={styles.inputSquareInput}
                />
                {
                    type === "password" ?
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            <Image src={eye} alt="show password"/></button>
                        : null
                }
            </div>
            {
                show.show && info !== undefined ? <PopUp info={info} coords={show.coords} /> : null
            }
        </div>
    );
}