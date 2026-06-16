import { useQuery } from "@tanstack/react-query";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";

export type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type User = Pick<ApiUser, "id" | "username" | "name">;

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
