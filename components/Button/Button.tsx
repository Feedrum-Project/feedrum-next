import styles from './button.module.sass'

interface ButtonProps {
  Style: 'standart' | 'purple',
  children: string
}

export default function Button({Style, children}:ButtonProps) {
  const Class = [styles[Style], styles.button].join(" ")
  return (
    <button className={Class}>
      {children}
    </button>
  )
}