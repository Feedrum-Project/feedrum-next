import styles from "./styles/box.module.sass";

interface IBox {
    title: string;
    children:any;
}
export default function Box({title, children}:IBox) {
    return (
        <div className={styles.box}>
            <div className={styles.boxTop}>
                <h1>{title}</h1>
            </div>
            <div className="middle">
                {children}
            </div>
        </div>
    );
}