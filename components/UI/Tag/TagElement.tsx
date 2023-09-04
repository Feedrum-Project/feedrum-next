import styles from "./style/tag.module.sass";

export default function TagElement({ name }: { name: string }) {
  return (
    <span className={styles.tag}>
      <span className="gray">#</span>
      <span>{name}</span>
    </span>
  );
}
