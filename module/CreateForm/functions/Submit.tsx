import { HTMLtoMD, MDtoHTML } from "helpers/parsers.helper";
import { FormEvent } from "react";
import { z } from "zod";

interface IDispatch {
  type: "addNotification";
  payload: {
    type: "bad" | "good";
    title: string;
    text: string;
  };
}

interface ISubmit {
  event: FormEvent<HTMLFormElement>;
  dispatch: (arg: IDispatch) => IDispatch;
  router: any;
}

export default function submit({ event, dispatch, router }: ISubmit) {
  event.preventDefault();
  if (!event || !event.target) return;
  const { target } = event as unknown as {
    target: {
      title: HTMLInputElement;
      tags: HTMLInputElement;
    };
  };

  const { value: title } = target.title;
  const text: HTMLElement | null = document.getElementById("txt");
  if (!text) throw new Error("Couldn't be found field");
  const content = HTMLtoMD(MDtoHTML(text.innerHTML));

  const body = {
    body: { title, body: content },
    tags: target.tags.value.split(" ").map((tag) => {
      return { name: tag };
    })
  };

  const schema = z.object({
    body: z.object({
      title: z.string().min(8),
      body: z.string().min(100)
    }),
    tags: z
      .object({
        name: z.string()
      })
      .array()
  });
  const isSucces = schema.safeParse(body).success;
  if (!isSucces)
    dispatch({
      type: "addNotification",
      payload: {
        type: "bad",
        title: "Пост не створено",
        text: "Мінімум 8 літер в назві, і 100 в контенті."
      }
    });

  fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "applaction/json"
    }
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: "addNotification",
          payload: {
            type: "good",
            title: "Пост створено",
            text: "Відбулося перенаправлення."
          }
        });
        router.replace("/posts/" + res.data.id);
      } else {
        dispatch({
          type: "addNotification",
          payload: {
            type: "bad",
            title: "Пост не створено",
            text: "Вкажіть теги. Якщо не допомогло, проблема на сервері ;("
          }
        });
      }
    })
    .catch(console.error);

  // if(files !== undefined && files.length > 1) {
  //     const form = new FormData();
  //     files?.forEach((e, i) => {
  //         form.append("image-"+i, e);
  //     });

  //     fetch("/api/images/", {
  //         method: "POST",
  //         body: form
  //     })
  //         .then(res => res.json());
  // }
}
