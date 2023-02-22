import styles from "../styles/aside.module.sass"
import avatar from "images/avatar.svg"
import Image from "next/image"

const sponsors = [
    {id:1, name:"Oleža", moneys:"254$"},
    {id:2, name:"Autist", moneys:"60$"},
    {id:3, name:"Bebra", moneys:"10$"}
]

const list = sponsors.map(e => (
    <div key={e.id} className={styles.sponsor}>
        <div className={styles.sponsorTop}>
            <span className={styles.sponsorNumber}>
                {e.id}
            </span>.
            <span className={styles.sponsorName}>
                <Image src={avatar} alt="Аватар" style={{margin:"0 .375rem 0 .875rem"}} />
                {e.name}
            </span>
        </div>
        <div className={styles.moneys}>{e.moneys}</div>
    </div>
))

export default function Sponsors() {
    return (
        <div className={styles.elem}>
            <div className={styles.elemTitle}>Наші спонсори</div>
            <div className={styles.elemBody}>
                {list}
            </div>
        </div>
    )
}