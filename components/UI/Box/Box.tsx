import { ReactNode } from "react";
import styles from "./styles/box.module.sass";

interface IBox {
  title: string;
  children: ReactNode;
}
/**
 * @description
 * Uses for elements what needing in one title and small components.
 * Can be also used for hard structures.
 * @example
 * // Usage:
 * <Box title="Hello, world!">
 *  <p>Sell your soul to the devil. :flushed:</p>
 *  <Button Style="secondary">
 *   Sell
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
