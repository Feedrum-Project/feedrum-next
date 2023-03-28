import styles from "../styles/aside.module.sass";
import avatar from "images/avatar.svg";
import Image from "next/image";
import Link from "next/link";
import { IUser } from "types/User";

interface ISponsor extends IUser{
    moneys: string;
}

const sponsors: ISponsor[] = [
    {
        id:6,
        email:"123",
        rank:200,
        createdAt:"123",
        name:"admini",
        moneys:"254$",
        isVerified: true,
    },
    {
        id:26,
        email:"4",
        rank:10,
        createdAt:"123",
        name:"Hellod",
        moneys:"22$",
        isVerified: true,
    },
    {
        id:24,
        email:"1",
        rank:100,
        createdAt:"123",
        name:"dcolflwas",
        moneys:"22$",
        isVerified: true,
    },
];

const list = sponsors.map((e,i) => (
    <div key={e.id} className={styles.sponsor}>
        <div className={styles.sponsorTop}>
            <span className={styles.sponsorNumber}>
                {i+1}
            </span>.
            <span className={styles.sponsorName}>
                <Image
                    src={avatar} alt="Аватар"
                    style={{margin:"0 .375rem 0 .875rem"}}
                />
                <Link
                    className={styles.link}
                    href={"/users/"+e.id}>
                    {e.name}
                </Link>
            </span>
        </div>
        <div className={styles.moneys}>{e.moneys}</div>
    </div>
));

export default function Sponsors() {
    return (
        <div className={styles.elem}>
            <div className={styles.elemTitle}>Наші спонсори</div>
            <div className={styles.elemBody}>
                {list}
            </div>
        </div>
    );
}