import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import type { User } from "../../types/user";
import { findUserById, getSelectedUserIdOption, setUserIdParam } from "./userSelection.utils";

export function useUserSelection(users: User[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedUser = useMemo(
    () =>
      pipe(
        getSelectedUserIdOption(searchParams),
        O.chain(findUserById(users)),
      ),
    [searchParams, users],
  );

  const selectUser = useCallback(
    (userId: number) => {
      setSearchParams((prevParams) => setUserIdParam(prevParams, userId));
    },
    [setSearchParams],
  );

  return [selectedUser, selectUser] as const;
}
