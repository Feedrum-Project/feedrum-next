import styles from "../styles/create.module.sass";

import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HTMLtoMD, MDtoHTML } from "helpers/parsers.helper";
import { z } from "zod";

import Script from "next/script";
import { Button } from "components/UI";
import Images from "module/CreateForm/Components/Images";
import Editor from "module/CreateForm/Components/Editor";
import View from "module/CreateForm/Components/View";
import { useRouter } from "next/router";
import { IStore } from "store/store";

export default function CreatePost() {
  const [chapter, setChapter] = useState<"editor" | "view">("view");
  const [article, setArticle] = useState<{ title: string; content: string }>({
    title: "",
    content: ""
  });
  const [files, setFiles] = useState<File[]>();
  const { user } = useSelector((state: IStore) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const content = localStorage.getItem("article");
    if (content === null) return;

    setArticle((pr) => {
      return { ...pr, content };
    });
  }, []);

  function saveToLocale() {
    const txt = document.getElementById("txt");
    if (!txt) return;

    const content = HTMLtoMD(txt.innerHTML);
    localStorage.setItem("article", content);

    setArticle((pr) => {
      return { ...pr, content };
    });
  }

  function sub(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e || !e.target) return;
    const { target } = e as unknown as {
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

  if (user === null || user.id === 0) {
    return <Script id="0">location.href = &#34;/login&#34;</Script>;
  }

  return (
    <>
      <div className={styles.editor}>
        <article>
          <form method="post" onSubmit={sub as any}>
            {chapter === "editor" ? (
              <>
                <Images files={files} setFiles={setFiles} showAdd />
                <Editor articleSet={[article, setArticle]} />
              </>
            ) : (
              <>
                <Images files={files} setFiles={setFiles} />
                <View articleSet={[article, setArticle]} />
              </>
            )}

            <div className={styles.editorButtons}>
              <Button Style="purple" type="submit">
                Опублікувати
              </Button>
              <Button Style="standart" onClick={saveToLocale}>
                Зберегти як чорнетка
              </Button>
              <Button Style="danger">Видалити</Button>
            </div>
          </form>
        </article>
        <aside className={styles.aside}>
          <div className={styles.chapters}>
            <button
              className={[
                styles.button,
                chapter === "editor"
                  ? styles.chaptersSelected
                  : styles.chaptersUnselected
              ].join(" ")}
              onClick={() => setChapter("editor")}
            >
              Редагування
            </button>
            <button
              className={[
                styles.button,
                chapter === "view"
                  ? styles.chaptersSelected
                  : styles.chaptersUnselected
              ].join(" ")}
              onClick={() => setChapter("view")}
            >
              Перегляд
            </button>
          </div>
          <div className="tips">
            <h1>Поради</h1>
            <p>
              Тут будуть з’являтися динамічні поради щодо редактору, бо не всі
              знають маркдаун
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
