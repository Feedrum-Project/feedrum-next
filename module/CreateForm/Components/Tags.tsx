import { Dispatch, SetStateAction, useEffect, useReducer } from "react";
import { Tag } from "types/Tag";
import { handleClick, initialState, reducer } from "../functions/tagsReducer";
import styles from "styles/create.module.sass";

interface ITags {
  tagsSet: [Tag, Dispatch<SetStateAction<Tag>>];
}

function Plus({ fill }: { fill: string }) {
  // original files path images/add.svg
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5 9.50004V17.8995L9.50001 17.8995L9.50001 10.5L2.10051 10.5L2.10051 9.50004H10.5Z"
        fill={fill}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.50002 10.5L9.50002 2.10046L10.5 2.10046L10.5 9.49996L17.8995 9.49996L17.8995 10.5L9.50002 10.5Z"
        fill={fill}
      />
    </svg>
  );
}
function Cross() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 9.29289L17.3536 16.6464L16.6465 17.3536L10 10.7071L3.35359 17.3536L2.64648 16.6464L10 9.29289Z"
        fill={"#E28585"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.99996 10.7071L2.64641 3.35355L3.35352 2.64645L9.99996 9.29289L16.6464 2.64645L17.3535 3.35355L9.99996 10.7071Z"
        fill={"#E28585"}
      />
    </svg>
  );
}

export default function Tags({ tagsSet }: ITags) {
  const [content, dispatch] = useReducer(reducer, initialState);
  const [tags, setTags] = tagsSet;

  useEffect(() => {
    setTags(content.tags);
  }, [content.tags]);

  return (
    <div className={styles.tags}>
      {tags
        ? tags.map((tag) => {
            return (
              <div key={tag} className={styles.tag}>
                <span className={styles.tagName}>
                  <span className="gray">#</span>
                  {tag}
                </span>
                <button
                  className={styles.close}
                  onClick={() => {
                    dispatch({ type: "removeTag", payload: tag });
                  }}
                >
                  <Cross />
                </button>
              </div>
            );
          })
        : null}
      {content.isShow ? (
        <input
          type="text"
          placeholder="Додати тег, або теги через кому"
          value={content.inputsContent}
          onChange={(event) => {
            dispatch({ type: "changeInput", payload: event.target.value });
          }}
        />
      ) : null}
      <button
        className={styles.addTag}
        onClick={() => {
          handleClick({ content, setTags, dispatch });
        }}
      >
        <Plus fill="#81D264" />
      </button>
    </div>
  );
}
