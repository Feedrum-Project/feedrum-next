import styles from "styles/settings.module.sass";

import Box from "components/UI/Box/Box";
import { Input, Button, Select, Checkbox } from "components/UI";
import Image from "next/image";
import Textarea from "components/UI/Textarea/Textarea";

import avatar from "images/avatar.svg";

import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useState } from "react";

import { IStore } from "store/store";

export default function Settings() {
  const { user } = useSelector((state: IStore) => {
    return { user: state.user, notification: state.notification };
  });
  const dispatch = useDispatch();

  function save(e: FormEvent) {
    e.preventDefault();

    dispatch({
      type: "addNotification",
      payload: {
        type: "good",
        title: "Профіль збережено",
        text: "Налаштування збережно"
      }
    });
  }

  const [chapter, setChapter] = useState<"profile" | "dev" | "safe">("profile");

  if (user.user === null) return <div>Увійдіть в аккаунт.</div>;
  return (
    <div className={styles.settings}>
      <aside className={styles.chapters}>
        <h1>Розділи</h1>
        <div className={styles.chaptersBottom}>
          <div
            className={chapter === "profile" ? styles.choosed : ""}
            onClick={() => setChapter("profile")}
            tabIndex={0}
            style={
              chapter === "profile" ? { background: "#1B1B1B" } : undefined
            }
          >
            Профіль
          </div>
          <div
            className={chapter === "dev" ? styles.choosed : ""}
            onClick={() => setChapter("dev")}
            tabIndex={0}
            style={chapter === "dev" ? { background: "#1B1B1B" } : undefined}
          >
            Інформація для розробників
          </div>
          <div
            className={chapter === "safe" ? styles.choosed : ""}
            onClick={() => setChapter("safe")}
            tabIndex={0}
            style={chapter === "safe" ? { background: "#1B1B1B" } : undefined}
          >
            Безпека
          </div>
        </div>
      </aside>
      <div className={styles.boxs}>
        {chapter === "profile" ? (
          <>
            <Box title="Профіль">
              <form action="" onSubmit={save}>
                <div className={styles.centr}>
                  <label className={styles.avatar}>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/png, image/jpeg"
                      hidden
                    />
                    <Image src={avatar} alt="Ваш аватар" width="130" />
                  </label>
                  <div className={styles.right}>
                    <Input
                      value={user.user.name}
                      Name="Ім'я"
                      placeholder="Ім'я"
                      info="Ваше ім'я."
                    />
                    <Input
                      value={user.user.email}
                      Name="Пошта"
                      placeholder="E-mail"
                      info="Поштова скринька."
                    />
                  </div>
                </div>
                <div className={styles.admit}>
                  <Button Style="purple" type="submit">
                    Змінити
                  </Button>
                </div>
              </form>
            </Box>
            <Box title="Про себе">
              <form onSubmit={save} className={styles.inputDistantion}>
                <Textarea
                  name="description"
                  Name="О собі"
                  maxCount={100}
                  placeholder="Інформація стосовно себе"
                />
                <Input
                  placeholder="https://feedrum.com"
                  Name="Вебсайт"
                  info="Ваша сторінка."
                />
                <Input
                  placeholder="Feedrum"
                  Name="Організаці"
                  info="Де ви працюєте?"
                />
                <Select
                  name="Країна"
                  values={[
                    "Україна",
                    "Українська Імперія",
                    "Українська Січ",
                    "Українська Федерація",
                    "Українське Королівство"
                  ]}
                  info="Оберіть країну в якій ви наразі."
                />
                <Checkbox>Відображати пошту у публічному профілі</Checkbox>
                <div className={styles.admit}>
                  <Button Style="purple" type="submit">
                    Зберегти
                  </Button>
                </div>
              </form>
            </Box>
            <div>
              <Button Style="standart">Профіль</Button>
            </div>
          </>
        ) : chapter === "dev" ? (
          <>
            <Box title="Основні">
              <Checkbox>Режим розробника</Checkbox>
              <Checkbox>Надсилати аналітику для покращення якості</Checkbox>
              <div className={["centrFlex", styles.admit].join(" ")}>
                <Button Style="purple">Зберегти</Button>
                <Button Style="secondary">
                  Скопіювати&nbsp;дебаг&nbsp;інформацію
                </Button>
              </div>
            </Box>
            <Box title="API Ключі">
              <div className={styles.inline}>
                <Input Name="Назва" />
                <Button Style="purple">Додати</Button>
              </div>
            </Box>
          </>
        ) : (
          <>
            <Box title="Зміна паролю">
              <Input type="password" Name="Старий пароль" />
              <Input type="password" Name="Новий пароль" />
              <Input type="password" Name="Підтвердити новий пароль" />
            </Box>
            <Box title="Видалення аккаунту">
              <div>
                <div className={styles.stratcher}>
                  <Button Style="more_danger">Видалити&nbsp;аккаунт</Button>
                  <Button Style="danger" className={styles.mg10}>
                    Вимкнути&nbsp;аккаунт
                  </Button>
                </div>
              </div>
            </Box>
          </>
        )}
      </div>
    </div>
  );
}
