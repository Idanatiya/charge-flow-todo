import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import * as TE from "fp-ts/TaskEither";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/function";

import { queryKeys } from "../lib/query-keys";
import { toQueryFn } from "../lib/query-client";
import type { ApiUser, User } from "../types/user";

const USERS_API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = (
  signal?: AbortSignal,
): TE.TaskEither<Error, ApiUser[]> =>
  pipe(
    TE.tryCatch(
      () =>
        fetch(USERS_API_ENDPOINT, {
          signal,
          headers: { Accept: "application/json" },
        }),
      (reason) => new Error(String(reason)),
    ),
    TE.chain((response) =>
      response.ok
        ? TE.right(response)
        : TE.left(new Error(`HTTP ${response.status}`)),
    ),
    TE.chain((response) =>
      TE.tryCatch<Error, ApiUser[]>(
        () => response.json(),
        (reason) => new Error(String(reason)),
      ),
    ),
  );

export function useUsers(): UseQueryResult<User[], Error> {
  return useQuery<ApiUser[], Error, User[]>({
    queryKey: queryKeys.users,
    queryFn: ({ signal }) => toQueryFn(fetchUsers(signal)),
    select: (users) =>
      pipe(
        users,
        A.map(({ id, username, name }) => ({ id, username, name })),
      ),
  });
}
