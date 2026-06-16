import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

const HIDE_COMPLETED_PARAM = "hideCompleted";
const TRUE = "true";

const getIsHideCompleted = (params: URLSearchParams): boolean =>
  pipe(
    O.fromNullable(params.get(HIDE_COMPLETED_PARAM)),
    O.match(
      () => false,
      (value) => value === TRUE,
    ),
  );

const toggleHideCompletedParam = (params: URLSearchParams): URLSearchParams => {
  const nextParams = new URLSearchParams(params);

  pipe(getIsHideCompleted(nextParams), (isHidden) => {
    if (isHidden) {
      nextParams.delete(HIDE_COMPLETED_PARAM);
    } else {
      nextParams.set(HIDE_COMPLETED_PARAM, TRUE);
    }
  });

  return nextParams;
};

export function useHideCompletedFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const hideCompleted = getIsHideCompleted(searchParams);

  const toggleHideCompleted = useCallback(() => {
    setSearchParams((prevParams) => toggleHideCompletedParam(prevParams));
  }, [setSearchParams]);

  return [hideCompleted, toggleHideCompleted] as const;
}
