import { useId, type ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.css";

interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
}

export function Checkbox({
  label,
  id: providedId,
  ...inputProps
}: CheckboxProps) {
  const generatedId = useId();
  const id = providedId || generatedId;

  return (
    <div className={styles.container}>
      <input id={id} type="checkbox" {...inputProps} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
