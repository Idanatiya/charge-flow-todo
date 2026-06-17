import { useMemo } from "react";

import { useTodos } from "../../api/todos";
import styles from "./TodosPanel.module.css";
import { Checkbox } from "../ui/Checkbox/Checkbox";
import { List } from "../ui/List/List";
import { Todo } from "../Todo/Todo";
import { getTodoStats } from "./todo.utils";
import { useFilteredTodos } from "./useFilteredTodos";

type TodosPanelProps = {
  selectedUserId: number;
  username: string;
};

export function TodosPanel({ selectedUserId, username }: TodosPanelProps) {
  const { data: todos = [], isPending, isError } = useTodos(selectedUserId);
  const { filteredTodos, isHideCompleted, onToggleHideCompleted } =
    useFilteredTodos(todos);
  const todoStats = useMemo(() => getTodoStats(todos), [todos]);

  if (isPending) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className={styles.todosPanelContainer}>
      <div className={styles.panelHeader}>
        <span>Todos Of "{username}"</span>
        <span className={styles.completedCount}>
          {todoStats.completed} completed out of {todoStats.total}
        </span>
      </div>
      <div className={styles.panelContent}>
        <Checkbox
          label="Hide Completed"
          onChange={onToggleHideCompleted}
          checked={isHideCompleted}
        />
        <List className={styles.todosContainer}>
          {filteredTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </List>
      </div>
    </div>
  );
}
