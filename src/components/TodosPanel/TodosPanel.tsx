import { useCallback, useMemo, useId } from "react";
import { useTodos, type Todo } from "../../api/todos";
import styles from "./styles.module.css";
import { useSearchParams } from "react-router";
import { pipe } from "fp-ts/lib/function";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";

type TodosPanelProps = {
  selectedUserId: number;
};

const HIDE_COMPLETED_PARAM = "hideCompleted";
const TRUE = "true";

const getIsHideCompleted = (params: URLSearchParams): boolean =>
  pipe(
    O.fromNullable(params.get(HIDE_COMPLETED_PARAM)),
    O.match(
      () => false,
      (value) => value === TRUE,
    ),
  );

const toggleHideCompletedParam = (params: URLSearchParams): URLSearchParams => {
  const nextParams = new URLSearchParams(params);

  pipe(getIsHideCompleted(nextParams), (isHidden) => {
    if (isHidden) {
      nextParams.delete(HIDE_COMPLETED_PARAM);
    } else {
      nextParams.set(HIDE_COMPLETED_PARAM, TRUE);
    }
  });

  return nextParams;
};

function useToggleCompleted(todos: Todo[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isHideCompleted = getIsHideCompleted(searchParams);

  const toggleHideCompleted = useCallback(() => {
    setSearchParams((prevParams) => toggleHideCompletedParam(prevParams));
  }, [setSearchParams]);

  const visibleTodos = useMemo(
    () =>
      isHideCompleted
        ? pipe(
            todos,
            A.filter((todo) => !todo.completed),
          )
        : todos,
    [isHideCompleted, todos],
  );

  return {
    visibleTodos,
    isHideCompleted,
    toggleHideCompleted,
  };
}

export function TodosPanel({ selectedUserId }: TodosPanelProps) {
  const { data: todos = [], isPending, isError } = useTodos(selectedUserId);
  const { visibleTodos, isHideCompleted, toggleHideCompleted } =
    useToggleCompleted(todos);

  if (isPending) {
    return <h1>Loading..</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }
  console.log({ visibleTodos });
  return (
    <>
      <label>Hide Completed</label>
      <input
        type="checkbox"
        onChange={toggleHideCompleted}
        checked={isHideCompleted}
      />
      <ul className={styles.todosContainer}>
        {visibleTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}

type TodoProps = {
  todo: Todo;
};

function Todo({ todo }: TodoProps) {
  const id = useId();
  return (
    <li className={styles.todoItem}>
      <input id={id} type="checkbox" checked={todo.completed} readOnly />
      <label htmlFor={id}>{todo.title}</label>
    </li>
  );
}
