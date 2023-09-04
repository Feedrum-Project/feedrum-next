import styles from "styles/create.module.sass";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HTMLtoMD } from "helpers/parsers.helper";
import submit from "module/CreateForm/functions/Submit";

import { Button } from "components/UI";
import Images from "module/CreateForm/Components/Images";
import Editor from "module/CreateForm/Components/Editor";
import View from "module/CreateForm/Components/View";
import { useRouter } from "next/router";
import { IStore } from "store/store";
import Link from "next/link";
import Tags from "module/CreateForm/Components/Tags";
import { Tag } from "types/Tag";

export default function CreatePost() {
  const [chapter, setChapter] = useState<"editor" | "view">("view");
  const [article, setArticle] = useState<{ title: string; content: string }>({
    title: "",
    content: ""
  });
  const [tags, setTags] = useState<Tag>(null);

  const [files, setFiles] = useState<File[]>();
  const { user } = useSelector((state: IStore) => state.user);
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

  if (user === null || user.id === 0) {
    return (
      <h1>
        Ви маєте увійти в <Link href="/login">обліковий запис</Link>
      </h1>
    );
  }

  return (
    <>
      <div className={styles.editor}>
        <article>
          <form
            method="post"
            onSubmit={(event) => submit({ event, dispatch, router })}
          >
            <input type="text" name="tags" value={tags?.join(", ")} readOnly hidden/>
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
          <div className={styles.asideTags}>
            <h1>Теги</h1>
            <Tags tagsSet={[tags, setTags]}/>
          </div>
        </aside>
      </div>
    </>
  );
}
