import { useRef } from 'react'
import styles from './input.module.sass'
import search from 'images/search.svg'
import Image from 'next/image'

interface InputProps {
  Type?:string,
  Placeholder:string,
  className:string
}

export default function Search({Type, Placeholder, className}:InputProps) {

  const ref:any = useRef(null)
  function onFocus() {
    ref.current.focus()
  }
  
  return (
    <div onClick={onFocus} className={styles[className]}>
      <input ref={ref} type={Type} placeholder={Placeholder} className={styles.inputInside} />
      <button className={styles.inputButton}>
        <Image src={search} alt="Пошук" />
      </button>
    </div>
  )
}