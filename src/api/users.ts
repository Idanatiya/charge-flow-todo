import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import * as TE from "fp-ts/TaskEither";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/function";

import { fetchJson } from "../lib/fetch-json";
import { queryKeys } from "../lib/query-keys";
import { toQueryFn } from "../lib/query-client";
import type { ApiUser, User } from "../types/user";

const USERS_API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = (
  signal?: AbortSignal,
): TE.TaskEither<Error, ApiUser[]> =>
  fetchJson<ApiUser[]>(USERS_API_ENDPOINT, signal);

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
