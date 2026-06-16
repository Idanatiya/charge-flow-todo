import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import type { User } from "../../types/user";

export const USER_ID_PARAM = "userId";

const parseUserId = (value: string): O.Option<number> =>
  pipe(
    Number(value),
    O.fromPredicate((value) => Number.isInteger(value)),
  );

const getSelectedUserIdOption = (params: URLSearchParams): O.Option<number> =>
  pipe(O.fromNullable(params.get(USER_ID_PARAM)), O.chain(parseUserId));

const findUserById =
  (users: User[]) =>
  (userId: number): O.Option<User> =>
    pipe(
      users,
      A.findFirst((user) => user.id === userId),
    );

export function useUserSelection(users: User[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedUser = useMemo(
    () =>
      pipe(
        getSelectedUserIdOption(searchParams),
        O.chain(findUserById(users)),
        O.toNullable,
      ),
    [searchParams, users],
  );

  const selectUser = useCallback(
    (userId: number) => {
      setSearchParams((prevParams) => {
        const nextParams = new URLSearchParams(prevParams);
        nextParams.set(USER_ID_PARAM, String(userId));
        return nextParams;
      });
    },
    [setSearchParams],
  );

  return [selectedUser, selectUser] as const;
}

export default useUserSelection;
