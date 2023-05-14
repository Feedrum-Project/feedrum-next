import styles from "./styles/button.module.sass";

interface ButtonProps {
  Style: "standart" | "purple" | "red";
  children: any;
  className?: string | undefined;
  style?: any;
  onClick?: undefined | (() => void);
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
}

export default function Button({Style, children, className=undefined, style, onClick=undefined, disabled=false, type="button"}:ButtonProps) {
    const Class = [styles[Style], styles.button, className].join(" ");
    return (
        <button
            className={Class}
            style={style}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}