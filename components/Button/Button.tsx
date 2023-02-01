import styles from './button.module.sass'

interface ButtonProps {
  Style: 'standart' | 'purple',
  children: string,
  className?: string | null
}

export default function Button({Style, children, className=null}:ButtonProps) {
  const Class = [styles[Style], styles.button].join(" ")
  return (
    <button className={Class}>
      {children}
    </button>
  )
}