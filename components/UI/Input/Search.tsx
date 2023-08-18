import { useRef } from "react";
import styles from "./styles/input.module.sass";
import search from "images/search.svg";
import Image from "next/image";

interface InputProps {
    Type?: string;
    Placeholder: string;
}

export default function Search({ Type, Placeholder }: InputProps) {
    const ref: any = useRef(null);
    function onFocus() {
        ref.current.focus();
    }

    return (
        <div onClick={onFocus} className={styles.search}>
            <form action="/search" method="get">
                <input
                    name="q"
                    ref={ref}
                    type={Type}
                    placeholder={Placeholder}
                    className={styles.searchInside}
                    minLength={2}
                    maxLength={24}
                />
                <button className={styles.searchButton}>
                    <Image src={search} alt="Пошук" />
                </button>
            </form>
        </div>
    );
}
