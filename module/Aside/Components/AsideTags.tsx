import { Tag } from "types/Tag";
import styles from "../styles/aside.module.sass";
import TagElement from "components/UI/Tag/TagElement";

interface ITags {
  tags: {tag: {name: Tag}}[];
}
export default function AsideTags({ tags }: ITags) {
  return (
    <div className={styles.elem}>
      <div className={styles.elemTitle}>Теги</div>
      {tags!.map((tag) => {
        return (
          <TagElement name={tag.tag.name as any} key={tag.tag.name as any} />
        );
      })}
    </div>
  );
}
