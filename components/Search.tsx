import { useRef } from 'react'
import styles from '../styles/input.module.sass'
const search = require('../images/search.svg')

export default function Input({Type, Placeholder, className}:any) {

  const ref = useRef(null)

  function onFocus() {
    ref.current.focus()
  }
  return (
    <div onClick={onFocus} className={styles[className]}>
      <input ref={ref} type={Type} placeholder={Placeholder} className={styles['input__inside']} />
      <button className={styles['input__button']}>
        <img src={search.default.src} alt="search" />
      </button>
    </div>
  )
}