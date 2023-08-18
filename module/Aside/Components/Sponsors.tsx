import styles from "../styles/aside.module.sass";
import avatar from "images/avatar.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IUser } from "types/User";

interface ISponsor extends IUser {
    moneys: string;
}

function List(sponsors: { sponsors: ISponsor[] | null }) {
    if (sponsors.sponsors === null) return <div>Нема грошей ;(</div>;
    return (
        <>
            {sponsors.sponsors.map((e, i) => (
                <div key={e.id} className={styles.sponsor}>
                    <div className={styles.sponsorTop}>
                        <span className={styles.sponsorNumber}>{i + 1}</span>
                        <span className={styles.sponsorName}>
                            <Image
                                src={avatar}
                                alt="Аватар"
                                style={{ margin: "0 .375rem 0 .875rem" }}
                            />
                            <Link
                                className={styles.link}
                                href={"/users/" + e.id}
                            >
                                <span>{e.name}</span>
                                <span
                                    className={[
                                        e.rank == 0
                                            ? undefined
                                            : e.rank > 0
                                            ? "green"
                                            : "red",
                                        styles.rank,
                                    ].join(" ")}
                                >
                                    (
                                    {e.rank == 0
                                        ? null
                                        : e.rank > 0
                                        ? "+"
                                        : "-"}
                                    {e.rank})
                                </span>
                            </Link>
                        </span>
                    </div>
                    <div className={styles.moneys}>
                        {e.moneys}
                        <span className={styles.currency}>$</span>
                    </div>
                </div>
            ))}
        </>
    );
}

export default function Sponsors() {
    const [sponsors, setSponsors] = useState<null | ISponsor[]>(null);

    useEffect(() => {
        fetch("/api/sponsors")
            .then((res) => res.json())
            .then((res) => setSponsors(res.result));
    }, [sponsors]);

    return (
        <div className={styles.elem}>
            <div className={styles.elemTitle}>Наші спонсори</div>
            <div className={styles.elemBody}>
                <List sponsors={sponsors} />
            </div>
        </div>
    );
}
