import avatar from "images/avatar.svg";
import Image from "next/image";
import Link from "next/link";
import styles from "./style/user.module.sass";
import { role } from "types/Post";

interface IUser {
  user: {
    name: string;
    id: number;
    rank: number;
    role: role;
  };
  isBig?: boolean;
}

enum roles {
  ADMIN = "Адмін",
  BANNED = "Заблоковано",
  USER = "Користувач"
}

function Role({ role, border }: { role: role; border: boolean }) {
  return role !== "USER" ? (
    <div
      className={[
        role === "ADMIN" ? "pink" : "red",
        border && styles.border
      ].join(" ")}
    >
      <span>{roles[role]}</span>
    </div>
  ) : null;
}

export default function UserComponent({ user, isBig = false }: IUser) {
  return (
    <div className={[styles.user, isBig && styles.big].join(" ")}>
      <Image src={avatar} alt="Аватар" height={isBig ? 40 : 25} />

      <div className={[styles.name, isBig && styles.bigName].join(" ")}>
        <span>
          <Link
            href={`/users/${user.id}`}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <span className="name">{user.name}</span>
            {!isBig && (
              <span
                className={[
                  styles.rank,
                  user.rank > 0 ? "green" : user.rank < 0 ? "red" : "gray"
                ].join(" ")}
              >
                ({user.rank > 0 ? "+" : ""}
                {user.rank})
              </span>
            )}
          </Link>
        </span>
        <Role role={user.role} border={isBig} />
      </div>
    </div>
  );
}
