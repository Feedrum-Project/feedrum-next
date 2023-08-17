import { ReactNode } from "react";
import styles from "./styles/button.module.sass";

interface ButtonProps {
  Style: "standart" | "secondary" | "purple" | "danger" | "more_danger";
  children: ReactNode;
  className?: string | undefined;
  style?: any;
  id?: string;
  onClick?: undefined | ((e: React.MouseEvent<HTMLAnchorElement> | any) => void);
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
        id=undefined,
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
            id={id}
        >
            {children}
        </button>
    );
}