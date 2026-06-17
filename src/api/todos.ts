import { useQuery } from "@tanstack/react-query";
import * as TE from "fp-ts/TaskEither";

import { fetchJson } from "../lib/fetch-json";
import { queryKeys } from "../lib/query-keys";
import { toQueryFn } from "../lib/query-client";
import type { Todo } from "../types/todo";

const buildUserTodosEndpoint = (id: number) =>
  `https://jsonplaceholder.typicode.com/users/${id}/todos`;

export const fetchTodosByUserId = (
  id: number,
  signal?: AbortSignal,
): TE.TaskEither<Error, Todo[]> =>
  fetchJson<Todo[]>(buildUserTodosEndpoint(id), signal);

export function useTodos(userId: number) {
  return useQuery({
    queryKey: queryKeys.todos(userId),
    queryFn: ({ signal }) => toQueryFn(fetchTodosByUserId(userId, signal)),
  });
}
