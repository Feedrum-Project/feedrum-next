import { useRef } from 'react'
import styles from 'styles/input.module.sass'
import search from 'images/search.svg'
import Image from 'next/image'

export default function Input({Type, Placeholder, className}:any) {

  const ref = useRef(null)
  function onFocus() {
    ref.current.focus()
  }
  
  return (
    <div onClick={onFocus} className={styles[className]}>
      <input ref={ref} type={Type} placeholder={Placeholder} className={styles['inputInside']} />
      <button className={styles['inputButton']}>
        <Image src={search} alt="Пошук" />
      </button>
    </div>
  )
}