import Image from 'next/image'
import styles from './input.module.sass'
import eye from '../../images/eye.svg'

interface InputProps {
  Type?:string,
  Placeholder?:string,
  Name:string
}

export default function Input({Type="text", Name, Placeholder}:InputProps) {
  return (
    <div className={styles.inputSquare}>
      <div className={styles.inputSquareName}>{Name}
      {Type === 'password' ?
      <button><Image src={eye} alt="show password"/></button> : null}
      </div>
      <input type={Type} placeholder={Placeholder} className={styles.inputSquareInput}/>
    </div>
  )
}