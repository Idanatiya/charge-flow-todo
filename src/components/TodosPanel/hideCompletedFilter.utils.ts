import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";

export const HIDE_COMPLETED_PARAM = "hideCompleted";
export const TRUE = "true";

export const getIsHideCompleted = (params: URLSearchParams): boolean =>
  pipe(
    O.fromNullable(params.get(HIDE_COMPLETED_PARAM)),
    O.match(
      () => false,
      (value) => value === TRUE,
    ),
  );

export const toggleHideCompletedParam = (
  params: URLSearchParams,
): URLSearchParams => {
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
