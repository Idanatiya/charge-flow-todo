import type { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.css";

type ListProps = ComponentPropsWithoutRef<"ul">;

export function List({ className = "", children, ...props }: ListProps) {
  return (
    <ul className={`${styles.list} ${className}`} {...props}>
      {children}
    </ul>
  );
}
