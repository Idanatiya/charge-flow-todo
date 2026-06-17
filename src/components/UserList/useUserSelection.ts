import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import type { User } from "../../types/user";
import { routes } from "../../config/routes";
import { findUserById, getSelectedUserIdOption } from "./userSelection.utils";

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
        nextParams.set(routes.searchParams.userId, String(userId));
        return nextParams;
      });
    },
    [setSearchParams],
  );

  return [selectedUser, selectUser] as const;
}
