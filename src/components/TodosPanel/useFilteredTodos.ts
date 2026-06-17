import { useMemo } from "react";
import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";

import type { Todo } from "../../types/todo";
import { isIncompleteTodo } from "./todo.utils";
import { useHideCompletedFilter } from "./useHideCompletedFilter";

export function useFilteredTodos(todos: Todo[]) {
  const [isHideCompleted, onToggleHideCompleted] = useHideCompletedFilter();

  const filteredTodos = useMemo(
    () => (isHideCompleted ? pipe(todos, A.filter(isIncompleteTodo)) : todos),
    [isHideCompleted, todos],
  );

  return {
    filteredTodos,
    isHideCompleted,
    onToggleHideCompleted,
  };
}
