import type { Todo as TodoType } from "../../types/todo";
import { Checkbox } from "../ui/Checkbox/Checkbox";
import styles from "./Todo.module.css";

type TodoProps = {
  todo: TodoType;
};

export function Todo({ todo }: TodoProps) {
  return (
    <li className={styles.todoItem}>
      <Checkbox label={todo.title} checked={todo.completed} disabled />
    </li>
  );
}
