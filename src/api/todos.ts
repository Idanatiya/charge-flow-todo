import { useQuery } from "@tanstack/react-query";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { queryKeys } from "../lib/query-keys";
import { toQueryFn } from "../lib/query-client";
import type { Todo } from "../types/todo";

const buildUserTodosEndpoint = (id: number) =>
  `https://jsonplaceholder.typicode.com/users/${id}/todos`;

export const fetchTodosByUserId = (
  id: number,
  signal?: AbortSignal,
): TE.TaskEither<Error, Todo[]> =>
  pipe(
    TE.tryCatch(
      () =>
        fetch(buildUserTodosEndpoint(id), {
          signal,
        }),
      (reason) => new Error(String(reason)),
    ),
    TE.chain((response) =>
      response.ok
        ? TE.right(response)
        : TE.left(new Error(`HTTP ${response.status}`)),
    ),
    TE.chain((response) =>
      TE.tryCatch<Error, Todo[]>(
        () => response.json(),
        (reason) => new Error(String(reason)),
      ),
    ),
  );

export function useTodos(userId: number) {
  return useQuery({
    queryKey: queryKeys.todos(userId),
    queryFn: ({ signal }) => {
      return toQueryFn(fetchTodosByUserId(userId, signal));
    },
  });
}
