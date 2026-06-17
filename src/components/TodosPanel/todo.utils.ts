import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";

import type { Todo } from "../../types/todo";

export type TodoStats = {
  completed: number;
  incomplete: number;
  total: number;
};

export const isCompletedTodo = (todo: Todo): boolean => todo.completed;

export const isIncompleteTodo = (todo: Todo): boolean => !todo.completed;

export function getTodoStats(todos: Todo[]): TodoStats {
  const { left: incomplete, right: completed } = pipe(
    todos,
    A.partition(isCompletedTodo),
  );

  return {
    incomplete: A.size(incomplete),
    completed: A.size(completed),
    total: A.size(todos),
  };
}
