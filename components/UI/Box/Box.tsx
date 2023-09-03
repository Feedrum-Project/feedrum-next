import { ReactNode } from "react";
import styles from "./styles/box.module.sass";

interface IBox {
  title: string;
  children: ReactNode;
}
/**
 * @example
 * // Usage:
 * <Box title="Hello, world!">
 *  <Button Style="secondary">
 *   Activate
 *  </Button>
 * </Box>
 */
export default function Box({ title, children }: IBox) {
  return (
    <div className={styles.box}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.middle}>{children}</div>
    </div>
  );
}
