import Image from "next/image";
import styles from "./input.module.sass";
import eye from "../../../images/eye.svg";
import { useState } from "react";

interface InputProps {
  type?:string;
  placeholder?:string;
  name:string;
  disabled?: boolean;
  value?: string;
}

export default function Input({type="text", name, placeholder, disabled=false, value=""}:InputProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [valueInp, setValue] = useState(value);

    return (
        <div className={styles.inputSquare}>
            <div className={styles.inputSquareName}>{name}
                {type === "password" ?
                    <button onClick={() => setShowPassword(!showPassword)}><Image src={eye} alt="show password"/></button> : null}
            </div>
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
        </div>
    );
}