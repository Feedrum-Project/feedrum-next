import styles from "./button.module.sass";

interface ButtonProps {
  Style: "standart" | "purple" | "Unborder";
  children: any;
  className?: string | undefined;
  style?: any;
  onClick?: undefined | (() => void);
  disabled?: boolean;
}

export default function Button({Style, children, className=undefined, style, onClick=undefined, disabled=false}:ButtonProps) {
    const Class = [styles[Style], styles.button].join(" ");
    return (
        <button
            className={Style !== "Unborder" ? Class : Class.split(" ")[0]}
            style={style}
            onClick={onClick}
            disabled={disabled}
            type="button"
        >
            {children}
        </button>
    );
}