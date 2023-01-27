import styles from '../styles/button.module.sass'

export default function Button({Style, children}:any) {
  const Class = [styles[Style], styles['button']].join(" ")
  return (
    <button className={Class}>
      {children}
    </button>
  )
}