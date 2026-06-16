import { useQuery } from "@tanstack/react-query";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { toQueryFn } from "../lib/query-client";
import { useCallback, useState } from "react";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

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
    queryKey: ["todos", userId],
    queryFn: ({ signal }) => {
      return toQueryFn(fetchTodosByUserId(userId, signal));
    },
  });
}
