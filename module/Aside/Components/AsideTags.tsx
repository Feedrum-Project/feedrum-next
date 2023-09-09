import { ITagName } from "types/Tag";
import styles from "../styles/aside.module.sass";
import TagElement from "components/UI/Tag/TagElement";

interface ITags {
  tags: { tag: ITagName }[];
}
export default function AsideTags({ tags }: ITags) {
  return (
    <div className={styles.elem}>
      <div className={styles.elemTitle}>Теги</div>
      <div className={styles.tags}>
        {tags!.map((tag) => {
          return tag.tag.name === null ? null : (
            <TagElement name={tag.tag.name} key={tag.tag.id} />
          );
        })}
      </div>
    </div>
  );
}
