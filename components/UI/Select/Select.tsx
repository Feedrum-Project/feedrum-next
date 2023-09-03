import styles from "./styles/select.module.sass";
import Image from "next/image";
import question from "images/Question.svg";
import arrowTop from "images/arrow-top.svg";
import arrowBottom from "images/arrow-bottom.svg";
import { useState } from "react";
import PopUp from "../PopUp/PopUp";

interface ISelect {
  name: string;
  values: string[];
  info?: string;
}

export default function Select({
  name,
  values,
  info = "Інформація відсутня"
}: ISelect) {
  const [search, setSearch] = useState("");

  const [show, setShow] = useState<{
    show: boolean;
    coords: { x: number; y: number };
  }>({ show: false, coords: { x: 0, y: 0 } });
  const [opened, setOpened] = useState<boolean>(false);
  const [choosed, setChoosed] = useState(values[0]);

  function getList(list: string[], value: string) {
    return list.filter((e) => {
      return e.includes(value) ? e : undefined;
    });
  }
  return (
    <div className={styles.select}>
      <div className={styles.top}>
        <h1 className={styles.name}>{name}</h1>
        <div
          className={styles.info}
          onMouseEnter={(e) => {
            setShow({
              show: true,
              coords: { x: e.pageX, y: e.pageY + 10 }
            });
          }}
          onMouseLeave={() => {
            setShow({ show: false, coords: { x: 0, y: 0 } });
          }}
        >
          <Image src={question} alt="запитання" />
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.value}>
          <input
            type="text"
            value={search}
            className={styles.search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setOpened(true)}
            maxLength={32}
          />
          <button
            className="symbol"
            onClick={() => setOpened((pr) => !pr)}
            type="button"
          >
            {opened ? (
              <Image src={arrowTop} alt="Відкрити список" />
            ) : (
              <Image src={arrowBottom} alt="Зачинити список" />
            )}
          </button>
        </div>
        <div
          style={{ display: opened ? "block" : "none" }}
          className={styles.list}
        >
          {getList(values, search).map((e) => {
            return (
              <button
                key={e}
                style={e === choosed ? { color: "#fff" } : undefined}
                onClick={() => {
                  setChoosed(e);
                  setSearch(e);
                }}
                type="button"
              >
                {e}
              </button>
            );
          })}
        </div>
      </div>
      {show.show ? <PopUp info={info} coords={show.coords} /> : null}
    </div>
  );
}
