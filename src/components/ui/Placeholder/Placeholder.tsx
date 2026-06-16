import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./styles.module.css";

type PlaceholderProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

export function Placeholder({
  children,
  className = "",
  ...props
}: PlaceholderProps) {
  return (
    <div className={`${styles.placeholder} ${className}`} {...props}>
      {children}
    </div>
  );
}
