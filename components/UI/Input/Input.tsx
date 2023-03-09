import Image from "next/image";
import styles from "./input.module.sass";
import eye from "../../../images/eye.svg";
import { useState } from "react";

interface InputProps {
  type?:string,
  placeholder?:string,
  name:string
}

export default function Input({type="text", name, placeholder}:InputProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className={styles.inputSquare}>
            <div className={styles.inputSquareName}>{name}
                {type === "password" ?
                    <button onClick={() => setShowPassword(!showPassword)}><Image src={eye} alt="show password"/></button> : null}
            </div>
            <input type={showPassword === true ? type : "text"} placeholder={placeholder} name={name} className={styles.inputSquareInput}/>
        </div>
    );
}