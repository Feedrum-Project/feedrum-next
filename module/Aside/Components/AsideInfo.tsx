import styles from "../styles/aside.module.sass";

interface IAsideInfo {
    organisation?: string;
    createdAt?: string;
    country?: string;
    description?: string;
}

export default function AsideInfo({
    organisation,
    createdAt,
    country,
    description,
}: IAsideInfo) {
    return (
        <div className={[styles.elem, styles.asideInfo].join(" ")}>
            <h1 className={styles.elemTop}>Інформація</h1>
            <div className={styles.asideInfo}>
                <div className="organisation">
                    <p>Організація</p>
                    <span>{organisation}</span>
                </div>
                <div className="createdAt">
                    <p>Аккаунт створено</p>
                    <span>{createdAt}</span>
                </div>
                <div className="country">
                    <p>Країна</p>
                    <span>{country}</span>
                </div>
                <div className="descrption">
                    <p>О собі</p>
                    <span>{description}</span>
                </div>
            </div>
        </div>
    );
}
