import styles from "./button.module.sass";

interface ButtonProps {
  Style: "standart" | "purple" | "Unborder",
  children: any,
  className?: string | null,
  style?: any
}

export default function Button({Style, children, className=null, style}:ButtonProps) {
    const Class = [styles[Style], styles.button].join(" ");
    return (
        <button className={Style !== "Unborder" ? Class : Class.split(" ")[0]} style={style}>
            {children}
        </button>
    );
}