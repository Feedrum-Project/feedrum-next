import styles from "../styles/rank.module.sass";
import Image from "next/image";
import arrowTop from "images/arrow-top.svg";
import arrowBottom from "images/arrow-bottom.svg";
import { useSelector } from "react-redux";

interface RankProps {
    info: {
        rank: number;
        id: number;
        title?: string;
        type?: "posts" | "users";
    };
    disabled?: boolean;
}

export default function Rank({ info, disabled = false }: RankProps) {
    const user = useSelector((state: any) => state.user);
    let isUser = user.id !== -1;
    if (disabled) isUser = false;

    info.type = "users";
    if (info.title) info.type = "posts";

    function Vote(vote: "UPVOTE" | "DOWNVOTE") {
        const body = {
            ...info,
            score: vote,
        };

        fetch("/api/" + info.type + "/" + info.id + "/vote", {
            method: "POST",
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then(console.log);
    }

    return (
        <div className={styles.rank}>
            <button
                className={styles.growReputation}
                disabled={!isUser}
                onClick={() => Vote("UPVOTE")}
            >
                <Image src={arrowTop} alt="Підняти репутацію" />
            </button>
            <div
                className={styles.rankCount}
                style={{
                    color:
                        info.rank > 0
                            ? "#6AEA3D"
                            : info.rank < 0
                            ? "#F36A6A"
                            : "#BEBEBE",
                }}
            >
                {info && info.rank > 0 ? "+" : null}
                {info.rank}
            </div>
            <button
                className={styles.reduceReputation}
                disabled={!isUser}
                onClick={() => Vote("DOWNVOTE")}
            >
                <Image src={arrowBottom} alt="Знизити репутацію" />
            </button>
        </div>
    );
}
