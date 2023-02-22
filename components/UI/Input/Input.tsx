import Image from "next/image"
import styles from "./input.module.sass"
import eye from "../../../images/eye.svg"

interface InputProps {
  type?:string,
  placeholder?:string,
  name:string
}

export default function Input({type="text", name, placeholder}:InputProps) {
    return (
        <div className={styles.inputSquare}>
            <div className={styles.inputSquareName}>{name}
                {type === "password" ?
                    <button><Image src={eye} alt="show password"/></button> : null}
            </div>
            <input type={type} placeholder={placeholder} className={styles.inputSquareInput}/>
        </div>
    )
}