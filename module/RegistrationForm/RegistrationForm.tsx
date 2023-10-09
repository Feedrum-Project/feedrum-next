import { Input, Button } from "components/UI/index";
import { FormEvent } from "react";
import registrate from "./fetch/registrate";

import styles from "./styles/registration.module.sass";
import { useDispatch } from "react-redux";
import { z } from "zod";

interface bodyObj {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

interface IFormExtneder {
  target: {
    name: { value: string };
    email: { value: string };
    password1: { value: string };
    password2: { value: string };
  };
}

export default function RegistrationForm() {
  const dispatch = useDispatch();

  async function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { target } = e as unknown as IFormExtneder;
    const body: bodyObj = {
      name: target.name.value,
      email: target.email.value,
      password1: target.password1.value,
      password2: target.password2.value
    };

    const isOk = z.object({
      name: z.string(),
      email: z.string(),
      password1: z.string().min(7),
      password2: z.string().min(7)
    }).safeParse(body).success;
    
    if(!isOk) return dispatch({type: "addNotification", payload: {
      type: "bad",
      title: "Невідома помилка!",
    }});

    const user = await registrate(body);

    if (user.status) {
      dispatch({
        type: "addNotification",
        payload: {
          type: "good",
          title: "Аккаунт створено!",
          text: "Ласкаво просимо :)"
        }
      });
    } else {
      dispatch({
        type: "addNotification",
        payload: {
          type: "bad",
          title: "Невідома помилка!",
          text: user.message
        }
      });
    }
  }

  return (
    <form method="post" onSubmit={(e: any) => prepare(e)}>
      <div className={styles.registrationMiddle}>
        <Input type="email" name="email" Name="Пошта" placeholder="Пошта" />
        <Input type="text" name="name" Name="Ім'я" placeholder="Ім'я" />
        <Input
          type="password"
          name="password1"
          Name="Пароль"
          placeholder="Пароль"
        />
        <Input
          type="password"
          name="password2"
          Name="Підтвердіть пароль"
          placeholder="Підтвердіть пароль"
        />
      </div>
      <div className={styles.registrationBottom}>
        <Button Style="purple" type="submit">
          Зареєструватися
        </Button>
      </div>
    </form>
  );
}
