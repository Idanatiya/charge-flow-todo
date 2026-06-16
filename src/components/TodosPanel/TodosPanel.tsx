import { useTodos } from "../../api/todos";
import styles from "./styles.module.css";
import type { Todo, Todo as TodoItem } from "../../types/todo";
import { Checkbox } from "../ui/Checkbox";
import { useFilteredTodos } from "./useFilteredTodos";

type TodosPanelProps = {
  selectedUserId: number;
  username: string;
};

export function TodosPanel({ selectedUserId, username }: TodosPanelProps) {
  const { data: todos = [], isPending, isError } = useTodos(selectedUserId);
  const { filteredTodos, isHideCompleted, onToggleHideCompleted } =
    useFilteredTodos(todos);

  if (isPending) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className={styles.todosPanelContainer}>
      <span>Todos Of "{username}"</span>
      <Checkbox
        label="Hide Completed"
        onChange={onToggleHideCompleted}
        checked={isHideCompleted}
      />
      <ul className={styles.todosContainer}>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

type TodoItemProps = {
  todo: Todo;
};

function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className={styles.todoItem}>
      <Checkbox label={todo.title} checked={todo.completed} disabled />
    </li>
  );
}
