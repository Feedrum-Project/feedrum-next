import styles from "./styles/pop.module.sass";

interface IPop {
    info: string;
    coords: {
        x: number;
        y: number;
    };
}
export default function PopUp({info, coords}: IPop) {
    return (
        <div
            className={styles.pop}
            style={{left: coords.x + "px", top: coords.y + "px"}}>
            {info}
        </div>
    );
}