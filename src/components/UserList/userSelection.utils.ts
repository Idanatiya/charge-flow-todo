import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import { routes } from "../../config/routes";
import type { User } from "../../types/user";

export const parseUserId = (value: string): O.Option<number> =>
  pipe(
    value,
    O.fromPredicate((value) => value.trim() !== ""),
    O.map(Number),
    O.filter((value) => Number.isInteger(value) && value > 0),
  );

export const getSelectedUserIdOption = (
  params: URLSearchParams,
): O.Option<number> =>
  pipe(
    O.fromNullable(params.get(routes.searchParams.userId)),
    O.chain(parseUserId),
  );

export const findUserById =
  (users: User[]) =>
  (userId: number): O.Option<User> =>
    pipe(
      users,
      A.findFirst((user) => user.id === userId),
    );

export const setUserIdParam = (
  params: URLSearchParams,
  userId: number,
): URLSearchParams => {
  const nextParams = new URLSearchParams(params);
  nextParams.set(routes.searchParams.userId, String(userId));
  nextParams.delete(routes.searchParams.hideCompleted);
  return nextParams;
};
