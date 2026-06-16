import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchUsers } from "../../api/users";
import { toQueryFn } from "../../lib/query-client";
import type { ApiUser, User } from "../../types/user";

export function useUsers(): UseQueryResult<User[], Error> {
  return useQuery<ApiUser[], Error, User[]>({
    queryKey: ["users"],
    queryFn: ({ signal }) => toQueryFn(fetchUsers(signal)),
    select: (users) =>
      users.map(({ id, username, name }) => ({ id, username, name })),
  });
}
