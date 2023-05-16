import styles from "./styles/button.module.sass";

interface ButtonProps {
  Style: "standart" | "purple" | "red";
  children: any;
  className?: string | undefined;
  style?: any;
  onClick?: undefined | (() => void);
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  to?: string | undefined;
}

export default function Button(
    {
        Style,
        children,
        className=undefined,
        style,
        onClick=undefined,
        disabled=false,
        type="button",
        to=undefined
    }:ButtonProps) {
    const Class = [styles[Style], styles.button, className].join(" ");
    
    if(to !== undefined)
        return (
            <a
                className={Class}
                style={style}
                onClick={onClick}
                type={type}
                href={disabled ? undefined : to}
            >
                {children}
            </a>
        );
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