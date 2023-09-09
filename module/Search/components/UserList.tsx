import { IUserExtended } from "types/User";
import styles from "../styles/search.module.sass";
import User from "components/User/User";
import { useState } from "react";

type localUser = IUserExtended[] | undefined;

interface IList {
  users: localUser;
}
export default function UserList({ users }: IList) {
  const [sorted, setSorting] = useState<{
    users: localUser;
    sort: "rating" | "alfabet";
  }>({ users, sort: "rating" });

  function sortRating(array: localUser) {
    return setSorting({
      users: array
        ? array.sort((a, b) => (a.rank > b.rank ? -1 : 1))
        : undefined,
      sort: "rating"
    });
  }

  function sortAlfabet(array: localUser) {
    return setSorting({
      users: array
        ? array.sort((a, b) => (a.name > b.name ? -1 : 1))
        : undefined,
      sort: "alfabet"
    });
  }

  return (
    <>
      <div className={styles.sort}>
        <button
          className={sorted.sort === "rating" ? styles.selected : undefined}
          onClick={() => sorted.users && sortRating(sorted.users)}
        >
          За рейтингом
        </button>
        <button
          className={sorted.sort === "alfabet" ? styles.selected : undefined}
          onClick={() => sorted.users && sortAlfabet(sorted.users)}
        >
          За алфавітом
        </button>
      </div>
      {users && users.length !== 0 ? (
        users.map((e) => {
          return <User user={e} key={e.id} />;
        })
      ) : (
        <h1 className="gray">Ми не знайшли користувачів :(</h1>
      )}
    </>
  );
}
