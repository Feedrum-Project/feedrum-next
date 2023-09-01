import { useState } from "react";
import styles from "styles/create.module.sass";

export default function Tags() {
  const [tags, setTags] = useState<string[] | null>(null);
  const [textarea, setTextarea] = useState<{
    isOpen: boolean;
    content: string;
  }>({
    isOpen: false,
    content: ""
  });

  function parseTags(content: string) {
    let parsed =
      tags == null
        ? Array.from(new Set(content.split(", ")))
        : Array.from(new Set(tags.concat(content.split(", "))));
    return parsed;
  }

  return (
    <div className="block">
      <input type="text" hidden readOnly value={tags?.join(" ")} name="tags"/>
      <h4>Теги</h4>
      <div className={styles.tagsField}>
        {tags
          ? tags.map((tag) => {
              return (
                <button type="button" key={tag} onClick={() => {
                  setTags((pr) => {
                    if(pr === null) return pr;
                    return pr?.filter(e => e !== tag);
                  });
                }}>
                  {tag}
                </button>
              );
            })
          : null}
        <input
          style={{ display: textarea.isOpen ? "block" : "none" }}
          placeholder="Введіть теги, через кому."
          onChange={(e) =>
            setTextarea((pr) => {
              return { ...pr, content: e.target.value };
            })
          }
        />
        <button
          className="add"
          onClick={() => {
            textarea.content && textarea.isOpen
              ? setTags(parseTags(textarea.content))
              : null;
            setTextarea((pr) => {
              return { ...pr, isOpen: !pr.isOpen };
            });
          }}
          type="button"
        >
          Додати
        </button>
      </div>
    </div>
  );
}
