import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import type { ApiUser } from "../types/user";

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
